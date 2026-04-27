import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-emerald-700 mb-4">WarungKu Digital POS</h1>
          <p className="text-xl text-gray-600">Sistem Point of Sale Modern untuk Warung Indonesia</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/dashboard" className="group block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-3xl">
                📊
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            </div>
            <p className="text-gray-600">Ringkasan penjualan, transaksi, dan stok hari ini</p>
          </Link>

          <Link href="/kasir" className="group block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-3xl">
                🛒
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Kasir</h2>
            </div>
            <p className="text-gray-600">Proses transaksi penjualan dengan keranjang belanja</p>
          </Link>

          <Link href="/stok" className="group block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-3xl">
                📦
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Stok & Inventori</h2>
            </div>
            <p className="text-gray-600">Kelola stok produk dan inventori warung</p>
          </Link>

          <Link href="/riwayat" className="group block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-3xl">
                📝
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Riwayat Transaksi</h2>
            </div>
            <p className="text-gray-600">Lihat semua transaksi yang telah dilakukan</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
