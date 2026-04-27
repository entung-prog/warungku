# WarungKu Digital POS

Sistem Point of Sale (POS) modern untuk warung dan toko kecil di Indonesia. Didesain dengan fokus pada kemudahan penggunaan, tampilan mobile-first, dan bahasa Indonesia.

## 🎨 Desain

Proyek ini dibuat menggunakan **Stitch.io** - platform AI-powered design tool dari Google. Desain mengikuti prinsip Material Design 3 dengan palet warna emerald green yang melambangkan pertumbuhan dan kemakmuran.

### Design System

- **Primary Color**: Emerald Green (#10B981) - untuk aksi utama
- **Typography**: Plus Jakarta Sans (body) & Inter (labels)
- **Roundness**: 16px untuk tampilan modern dan ramah
- **Spacing**: Grid 4px untuk konsistensi
- **Mobile-First**: Dioptimalkan untuk layar smartphone

## 📱 Fitur

### 1. Dashboard
- Ringkasan penjualan hari ini
- Total transaksi
- Peringatan stok menipis
- Target omzet bulanan
- Aksi cepat (Quick Actions)

### 2. Kasir (Keranjang)
- Tambah produk ke keranjang
- Hitung total otomatis
- Proses pembayaran
- Cetak struk

### 3. Stok & Inventori
- Daftar produk
- Status stok (tersedia/menipis/habis)
- Tambah/edit produk
- Kategori produk

### 4. Riwayat Transaksi
- Daftar semua transaksi
- Filter berdasarkan tanggal
- Detail transaksi
- Status pembayaran

### 5. Laporan & Analitik
- Grafik penjualan
- Produk terlaris
- Analisis pendapatan
- Laporan periode

## 🚀 Cara Menggunakan

### Lokal (Tanpa Server)

1. Buka folder `warungku-pos`
2. Buka file `index.html` di browser
3. Klik menu yang ingin dilihat

### Dengan Server Lokal

```bash
# Menggunakan Python
cd warungku-pos
python3 -m http.server 8000

# Atau menggunakan Node.js
npx serve

# Buka browser ke http://localhost:8000
```

## 📂 Struktur File

```
warungku-pos/
├── index.html          # Halaman utama dengan navigasi
├── dashboard.html      # Dashboard ringkasan
├── kasir.html         # Halaman kasir/keranjang
├── stok.html          # Manajemen stok & inventori
├── riwayat.html       # Riwayat transaksi
└── laporan.html       # Laporan & analitik
```

## 🎯 Target Pengguna

- Pemilik warung kecil
- Toko kelontong
- Minimarket
- UMKM retail

## 💡 Teknologi

- **HTML5** - Struktur halaman
- **Tailwind CSS** - Styling (via CDN)
- **Google Fonts** - Plus Jakarta Sans & Inter
- **Material Symbols** - Icon set
- **Stitch.io** - Design tool

## 🌟 Keunggulan

1. **Mobile-First**: Dioptimalkan untuk smartphone
2. **Bahasa Indonesia**: Semua teks dalam bahasa Indonesia
3. **Mudah Digunakan**: Interface intuitif untuk pengguna non-teknis
4. **Modern**: Desain mengikuti tren UI/UX terkini
5. **Ringan**: Tidak memerlukan instalasi, buka langsung di browser

## 📝 Catatan Pengembangan

Ini adalah prototype UI/UX yang dibuat dengan Stitch.io. Untuk implementasi penuh, diperlukan:

- Backend API (Node.js, PHP, atau Python)
- Database (MySQL, PostgreSQL, atau MongoDB)
- Autentikasi pengguna
- Integrasi printer thermal untuk struk
- Sistem pembayaran (cash, QRIS, dll)

## 🔗 Sumber Desain

Desain asli dibuat di Stitch.io dengan project ID: `16805496696936432734`

## 📄 Lisensi

Prototype ini dibuat untuk tujuan demonstrasi dan pembelajaran.

---

**Dibuat dengan ❤️ menggunakan Stitch.io**
