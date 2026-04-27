const PRODUCTS = [
  { id: "1", name: "Indomie Goreng", stock: 50, minStock: 20, category: "Makanan", image: "🍜" },
  { id: "2", name: "Aqua 600ml", stock: 8, minStock: 15, category: "Minuman", image: "💧" },
  { id: "3", name: "Teh Pucuk", stock: 25, minStock: 10, category: "Minuman", image: "🍵" },
  { id: "4", name: "Kopi Kapal Api", stock: 5, minStock: 10, category: "Minuman", image: "☕" },
  { id: "5", name: "Mie Sedaap", stock: 45, minStock: 20, category: "Makanan", image: "🍜" },
]

export default function StokPage() {
  return (
    <div className="min-h-screen bg-[#f4fbf4]">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">Stok & Inventori</h1>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-gray-900">{PRODUCTS.length}</p>
            <p className="text-xs text-gray-600">Total Produk</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl shadow-sm text-center border border-red-100">
            <p className="text-2xl font-bold text-red-600">
              {PRODUCTS.filter(p => p.stock < p.minStock).length}
            </p>
            <p className="text-xs text-red-700">Stok Menipis</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl shadow-sm text-center border border-emerald-100">
            <p className="text-2xl font-bold text-emerald-600">
              {PRODUCTS.filter(p => p.stock >= p.minStock).length}
            </p>
            <p className="text-xs text-emerald-700">Stok Aman</p>
          </div>
        </div>

        {/* Products List */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Daftar Produk</h2>
            <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
              + Tambah
            </button>
          </div>

          <div className="space-y-2">
            {PRODUCTS.map(product => {
              const isLowStock = product.stock < product.minStock
              return (
                <div
                  key={product.id}
                  className={`bg-white p-4 rounded-xl shadow-sm border ${
                    isLowStock ? "border-red-200" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{product.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-sm font-bold ${isLowStock ? "text-red-600" : "text-emerald-600"}`}>
                          Stok: {product.stock}
                        </span>
                        {isLowStock && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                            ⚠️ Menipis
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      ⋮
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}
