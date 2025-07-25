Panduan Penggunaan Sistem Admin Pembelian Toko
Panduan ini akan memandu Anda dalam menggunakan sistem admin pembelian toko sederhana yang telah dibuat.
1. Persiapan Awal
Sebelum memulai, pastikan semua komponen yang diperlukan sudah siap dan berjalan:
  1.	XAMPP Berjalan: Pastikan Apache dan MySQL di XAMPP Anda sudah berstatus "Running". Anda bisa membukanya melalui XAMPP Control Panel.
  2.	Database Terbuat: Pastikan Anda telah menjalankan skrip database.sql di PHPMyAdmin (akses via XAMPP Control Panel) atau tool MySQL lainnya. Ini akan membuat database toko_db beserta tabel products, product_stock, dan purchases, serta mengisi data produk dan stok awal.
  3.	Dependensi Node.js Terinstal: Di folder proyek Anda (nama-proyek-toko), buka terminal dan pastikan Anda sudah menjalankan perintah npm install. Ini akan mengunduh semua library Node.js yang diperlukan.
2. Menjalankan Aplikasi
Setelah semua persiapan awal selesai, Anda bisa menjalankan aplikasi backend Node.js:
  1.	Buka terminal (Command Prompt/PowerShell di Windows, Terminal di macOS/Linux) dan navigasikan ke folder proyek Anda (cd nama-proyek-toko).
  2.	Jalankan perintah berikut untuk memulai server Node.js:
  Bash
  node app.js
  3.	Jika berhasil, Anda akan melihat pesan di terminal seperti: Server berjalan di http://localhost:3001.
3. Mengakses Halaman Admin
  1.	Buka browser web Anda (Chrome, Firefox, Edge, dll.).
  2.	Ketik alamat berikut di bilah alamat browser Anda:
  http://localhost:3001
  3.	Anda akan diarahkan ke halaman Dashboard Admin Toko.
4. Fitur-fitur Sistem
4.1. Input Pembelian Baru
Bagian ini memungkinkan Anda mencatat transaksi pembelian produk.
  1.	Pada halaman dashboard, Anda akan melihat bagian "Input Pembelian Baru".
  2.	Pilih Produk: Klik dropdown "Pilih Produk". Anda akan melihat daftar 10 produk yang sudah diisi di database. Pilih produk yang ingin dibeli.
  3.	Jumlah: Masukkan jumlah kuantitas produk yang dibeli pada kolom "Jumlah". Pastikan jumlah yang dimasukkan adalah angka positif.
  4.	Catat Pembelian: Klik tombol "Catat Pembelian".
  5.	Hasil:
    •	Jika pembelian berhasil, Anda akan diarahkan kembali ke halaman dashboard, dan pembelian baru akan muncul di bagian "Daftar Pembelian".
    •	Stok produk yang relevan di database akan otomatis berkurang sesuai jumlah pembelian.
    •	Jika stok tidak mencukupi, sistem akan menampilkan pesan error.
4.2. Daftar Pembelian
Bagian ini menampilkan riwayat semua transaksi pembelian yang telah dicatat.
  1.	Gulir ke bawah pada halaman dashboard untuk melihat bagian "Daftar Pembelian".
  2.	Tabel ini akan menampilkan informasi detail setiap pembelian, termasuk:
    •	ID Pembelian: Nomor identifikasi unik untuk setiap transaksi.
    •	Produk: Nama produk yang dibeli.
    •	Jumlah: Kuantitas produk yang dibeli.
    •	Total Harga: Harga total dari pembelian (jumlah * harga produk).
    •	Tanggal: Tanggal dan waktu pembelian dicatat.
    •	Status: Status pembelian, bisa "Completed" (selesai) atau "Cancelled" (dibatalkan).
4.3. Membatalkan Pembelian
Fitur ini memungkinkan Anda membatalkan transaksi pembelian yang sudah dicatat.
  1.	Pada bagian "Daftar Pembelian", cari baris transaksi yang ingin Anda batalkan.
  2.	Perhatikan kolom "Aksi" di akhir setiap baris.
  3.	Jika status pembelian adalah "Completed", Anda akan melihat tombol "Batalkan".
  4.	Klik tombol "Batalkan".
  5.	Sistem akan menampilkan konfirmasi "Yakin ingin membatalkan pembelian ini?". Klik "OK" untuk melanjutkan atau "Cancel" untuk membatalkan aksi.
  6.	Hasil:
    •	Jika pembatalan berhasil, Anda akan diarahkan kembali ke halaman dashboard.
    •	Status pembelian yang dibatalkan akan berubah menjadi "Cancelled".
    •	Stok produk yang relevan di database akan otomatis dikembalikan (bertambah) sesuai dengan jumlah produk yang dibatalkan.
    •	Pembelian yang sudah berstatus "Cancelled" tidak bisa dibatalkan lagi (tombol "Batalkan" tidak akan muncul).
5. Penutupan Aplikasi
Untuk menghentikan server Node.js:
  1.	Kembali ke terminal tempat Anda menjalankan node app.js.
  2.	Tekan Ctrl + C (di Windows/Linux) atau Cmd + C (di macOS).
Ini akan menghentikan aplikasi backend.
