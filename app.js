const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Konfigurasi Database
const dbConfig = {
    host: 'localhost',
    user: 'root', // Biasanya 'root' untuk XAMPP default
    password: '', // Kosongkan jika tidak ada password di XAMPP default
    database: 'toko_db'
};

// Middleware
app.use(express.urlencoded({ extended: true })); // Untuk parsing body dari form HTML
app.use(express.json()); // Untuk parsing body JSON
app.use(express.static(path.join(__dirname, 'public'))); // Menyajikan file statis dari folder public

// Set EJS sebagai view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Koneksi ke Database
async function getConnection() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch (err) {
        console.error('Koneksi database gagal:', err.stack);
        process.exit(1); // Keluar dari aplikasi jika koneksi database gagal
    }
}

// --- Rute Halaman Admin ---

// Halaman Utama Admin
app.get('/', async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const [products] = await connection.execute('SELECT id, name FROM products');
        const [purchases] = await connection.execute(`
            SELECT p.id, pr.name AS product_name, p.quantity, p.total_price, p.purchase_date, p.status
            FROM purchases p
            JOIN products pr ON p.product_id = pr.id
            ORDER BY p.purchase_date DESC
        `);
        res.render('index', { products, purchases });
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Terjadi kesalahan saat mengambil data.');
    } finally {
        if (connection) connection.end();
    }
});

// --- API untuk Input Pembelian ---
app.post('/purchase', async (req, res) => {
    let connection;
    try {
        const { product_id, quantity } = req.body;

        if (!product_id || !quantity || quantity <= 0) {
            return res.status(400).send('Data pembelian tidak valid.');
        }

        connection = await getConnection();

        // 1. Dapatkan harga produk dan cek stok
        const [productRows] = await connection.execute('SELECT price FROM products WHERE id = ?', [product_id]);
        if (productRows.length === 0) {
            return res.status(404).send('Produk tidak ditemukan.');
        }
        const productPrice = productRows[0].price;
        const totalPrice = productPrice * quantity;

        const [stockRows] = await connection.execute('SELECT quantity FROM product_stock WHERE product_id = ?', [product_id]);
        if (stockRows.length === 0 || stockRows[0].quantity < quantity) {
            return res.status(400).send('Stok tidak cukup untuk produk ini.');
        }

        // Mulai transaksi
        await connection.beginTransaction();

        // 2. Kurangi stok produk
        await connection.execute('UPDATE product_stock SET quantity = quantity - ? WHERE product_id = ?', [quantity, product_id]);

        // 3. Masukkan data pembelian
        await connection.execute(
            'INSERT INTO purchases (product_id, quantity, total_price) VALUES (?, ?, ?)',
            [product_id, quantity, totalPrice]
        );

        await connection.commit();
        res.redirect('/'); // Redirect kembali ke halaman utama admin
    } catch (err) {
        await connection.rollback(); // Rollback jika ada error
        console.error('Error creating purchase:', err);
        res.status(500).send('Terjadi kesalahan saat melakukan pembelian.');
    } finally {
        if (connection) connection.end();
    }
});

// --- API untuk Pembatalan Pembelian ---
app.post('/cancel-purchase/:id', async (req, res) => {
    let connection;
    try {
        const purchaseId = req.params.id;

        connection = await getConnection();

        // Dapatkan detail pembelian yang akan dibatalkan
        const [purchaseRows] = await connection.execute('SELECT product_id, quantity, status FROM purchases WHERE id = ?', [purchaseId]);

        if (purchaseRows.length === 0) {
            return res.status(404).send('Pembelian tidak ditemukan.');
        }

        const purchase = purchaseRows[0];

        if (purchase.status === 'cancelled') {
            return res.status(400).send('Pembelian ini sudah dibatalkan.');
        }

        // Mulai transaksi
        await connection.beginTransaction();

        // 1. Perbarui status pembelian menjadi 'cancelled'
        await connection.execute('UPDATE purchases SET status = ? WHERE id = ?', ['cancelled', purchaseId]);

        // 2. Kembalikan stok produk
        await connection.execute('UPDATE product_stock SET quantity = quantity + ? WHERE product_id = ?', [purchase.quantity, purchase.product_id]);

        await connection.commit();
        res.redirect('/'); // Redirect kembali ke halaman utama admin
    } catch (err) {
        await connection.rollback(); // Rollback jika ada error
        console.error('Error canceling purchase:', err);
        res.status(500).send('Terjadi kesalahan saat membatalkan pembelian.');
    } finally {
        if (connection) connection.end();
    }
});


// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});