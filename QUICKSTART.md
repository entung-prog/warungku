# 🚀 Quick Start Guide - WarungKu Digital POS

## Cara Tercepat Memulai

### Opsi 1: Buka Langsung (Paling Mudah)
```bash
# Buka file index.html di browser
xdg-open warungku-pos/index.html
```

### Opsi 2: Menggunakan Script
```bash
cd warungku-pos
./start.sh
```

### Opsi 3: Menggunakan Python
```bash
cd warungku-pos
python3 -m http.server 8000
# Buka http://localhost:8000
```

### Opsi 4: Menggunakan npm
```bash
cd warungku-pos
npm start
# Buka http://localhost:8000
```

## 📱 Halaman yang Tersedia

1. **index.html** - Halaman utama dengan navigasi
2. **dashboard.html** - Dashboard ringkasan penjualan
3. **kasir.html** - Halaman kasir/keranjang belanja
4. **stok.html** - Manajemen stok & inventori
5. **riwayat.html** - Riwayat transaksi
6. **laporan.html** - Laporan & analitik lengkap

## 🎨 Fitur Desain

- ✅ Mobile-first responsive design
- ✅ Material Design 3 principles
- ✅ Emerald green color scheme
- ✅ Plus Jakarta Sans typography
- ✅ Smooth animations & transitions
- ✅ Touch-friendly UI elements

## 📊 Komponen Utama

### Dashboard
- Total penjualan hari ini
- Jumlah transaksi
- Peringatan stok menipis
- Progress target omzet
- Quick action buttons

### Kasir
- Daftar produk
- Keranjang belanja
- Kalkulasi total otomatis
- Tombol checkout

### Stok
- Daftar produk dengan gambar
- Status stok (tersedia/menipis/habis)
- Filter kategori
- Tombol tambah produk

### Riwayat
- List transaksi dengan tanggal
- Status pembayaran
- Detail per transaksi
- Filter periode

### Laporan
- Grafik penjualan
- Produk terlaris
- Statistik pendapatan
- Export laporan

## 🔧 Kustomisasi

### Mengubah Warna
Edit bagian `colors` di Tailwind config di setiap file HTML:
```javascript
"primary": "#006c49",  // Ubah ke warna pilihan Anda
"primary-container": "#10b981",
```

### Mengubah Font
Edit bagian `fontFamily` di Tailwind config:
```javascript
"body-md": ["Plus Jakarta Sans"],  // Ganti dengan font pilihan
```

## 📝 Catatan Penting

- Ini adalah **prototype UI/UX** - tidak ada backend
- Data yang ditampilkan adalah **dummy/contoh**
- Untuk produksi, perlu tambahan:
  - Backend API
  - Database
  - Autentikasi
  - Integrasi printer
  - Payment gateway

## 🆘 Troubleshooting

### Browser tidak membuka?
```bash
# Coba buka manual
firefox warungku-pos/index.html
# atau
google-chrome warungku-pos/index.html
```

### Port 8000 sudah digunakan?
```bash
# Gunakan port lain
python3 -m http.server 8080
```

### Gambar tidak muncul?
Pastikan koneksi internet aktif (gambar di-host di Google)

## 📞 Support

Untuk pertanyaan atau masalah, silakan buka issue di repository atau hubungi tim pengembang.

---

**Happy Coding! 🎉**
