-- Buat Database
CREATE DATABASE IF NOT EXISTS toko_db;
USE toko_db;

-- Tabel Produk
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Tabel Stock Produk
CREATE TABLE IF NOT EXISTS product_stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Tabel Pembelian
CREATE TABLE IF NOT EXISTS purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('completed', 'cancelled') DEFAULT 'completed',
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Masukkan 10 Produk Contoh
INSERT INTO products (name, price) VALUES
('Laptop Gaming', 15000000.00),
('Smartphone Terbaru', 8000000.00),
('Monitor Ultra-wide', 4500000.00),
('Keyboard Mekanikal', 1200000.00),
('Mouse Gaming RGB', 750000.00),
('Webcam Full HD', 500000.00),
('Headset Nirkabel', 900000.00),
('SSD 1TB', 1800000.00),
('RAM 16GB DDR4', 1000000.00),
('Speaker Bluetooth', 600000.00);

-- Masukkan Stock Awal untuk Produk
INSERT INTO product_stock (product_id, quantity) VALUES
(1, 15),
(2, 25),
(3, 10),
(4, 30),
(5, 40),
(6, 20),
(7, 18),
(8, 22),
(9, 35),
(10, 28);