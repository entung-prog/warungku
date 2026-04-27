export default function DashboardPage() {
  return (
    <main className="max-w-md mx-auto px-4 pb-32 pt-4 space-y-6 bg-[#f4fbf4] min-h-screen">
      {/* Welcome Section */}
      <section className="space-y-1">
        <p className="text-sm text-gray-600">Selamat pagi, Ahmad!</p>
        <h2 className="text-2xl font-bold text-gray-900">Ringkasan Warung</h2>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-2 gap-4">
        {/* Total Penjualan */}
        <div className="col-span-2 p-5 rounded-2xl bg-emerald-600 shadow-sm text-white">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold opacity-80">TOTAL PENJUALAN HARI INI</span>
            <span className="text-2xl">💰</span>
          </div>
          <div className="text-3xl font-bold">Rp 1.250.000</div>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold bg-white/10 w-fit px-2 py-1 rounded-full">
            <span>📈</span>
            <span>+12.5% dari kemarin</span>
          </div>
        </div>

        {/* Total Transaksi */}
        <div className="p-4 rounded-2xl bg-white shadow-sm flex flex-col justify-between h-32 border border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-sm">🧾</span>
            <span className="text-xs font-semibold">TRANSAKSI</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">45</div>
          <div className="text-xs text-emerald-600 font-bold">TARGET TERCAPAI</div>
        </div>

        {/* Stok Menipis */}
        <div className="p-4 rounded-2xl bg-red-50 text-red-900 flex flex-col justify-between h-32 border border-red-100">
          <div className="flex items-center gap-2">
            <span className="text-sm">⚠️</span>
            <span className="text-xs font-semibold">STOK MENIPIS</span>
          </div>
          <div className="text-2xl font-bold">8</div>
          <div className="text-xs font-bold text-red-700">PERLU RE-STOK</div>
        </div>

        {/* Omzet Bulan Ini */}
        <div className="col-span-2 p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-gray-600">OMZET BULAN INI</span>
            <span className="text-xl">📊</span>
          </div>
          <div className="text-xl font-bold text-gray-900">Rp 28.400.000</div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-emerald-600 h-full w-[75%] rounded-full"></div>
          </div>
          <div className="flex justify-between mt-2 text-xs font-bold text-gray-600">
            <span>Target: 40jt</span>
            <span>75%</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900">Aksi Cepat</h3>
        <div className="grid grid-cols-4 gap-3">
          <button className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md text-2xl">
              🛒
            </div>
            <span className="text-xs font-bold text-center text-gray-700 leading-tight">Transaksi Baru</span>
          </button>
          <button className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-gray-200 text-2xl">
              📦
            </div>
            <span className="text-xs font-bold text-center text-gray-700 leading-tight">Tambah Produk</span>
          </button>
          <button className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-gray-200 text-2xl">
              📈
            </div>
            <span className="text-xs font-bold text-center text-gray-700 leading-tight">Laporan</span>
          </button>
          <button className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-gray-200 text-2xl">
              📋
            </div>
            <span className="text-xs font-bold text-center text-gray-700 leading-tight">Kelola Stok</span>
          </button>
        </div>
      </section>
    </main>
  )
}
