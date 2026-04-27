const TRANSACTIONS = [
  { id: "1", date: "2026-04-27 10:30", total: 15000, items: 3, status: "completed" },
  { id: "2", date: "2026-04-27 09:15", total: 25000, items: 5, status: "completed" },
  { id: "3", date: "2026-04-27 08:45", total: 8000, items: 2, status: "completed" },
  { id: "4", date: "2026-04-26 16:20", total: 35000, items: 7, status: "completed" },
  { id: "5", date: "2026-04-26 14:10", total: 12000, items: 4, status: "completed" },
]

export default function RiwayatPage() {
  return (
    <div className="min-h-screen bg-[#f4fbf4]">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">Riwayat Transaksi</h1>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-xs text-gray-600 mb-1">Total Transaksi</p>
            <p className="text-2xl font-bold text-gray-900">{TRANSACTIONS.length}</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl shadow-sm border border-emerald-100">
            <p className="text-xs text-emerald-700 mb-1">Total Pendapatan</p>
            <p className="text-2xl font-bold text-emerald-600">
              Rp {TRANSACTIONS.reduce((sum, t) => sum + t.total, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Transactions List */}
        <section>
          <h2 className="text-lg font-bold mb-3">Hari Ini</h2>
          <div className="space-y-2">
            {TRANSACTIONS.filter(t => t.date.startsWith("2026-04-27")).map(transaction => (
              <div key={transaction.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">Transaksi #{transaction.id}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-semibold">
                    ✓ Selesai
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">{transaction.items} item</p>
                  <p className="text-lg font-bold text-emerald-600">
                    Rp {transaction.total.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3">Kemarin</h2>
          <div className="space-y-2">
            {TRANSACTIONS.filter(t => t.date.startsWith("2026-04-26")).map(transaction => (
              <div key={transaction.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">Transaksi #{transaction.id}</p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-semibold">
                    ✓ Selesai
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">{transaction.items} item</p>
                  <p className="text-lg font-bold text-emerald-600">
                    Rp {transaction.total.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
