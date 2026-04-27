"use client"

import { useState } from "react"

const PRODUCTS = [
  { id: "1", name: "Indomie Goreng", price: 3500, stock: 50, image: "🍜" },
  { id: "2", name: "Aqua 600ml", price: 3000, stock: 30, image: "💧" },
  { id: "3", name: "Teh Pucuk", price: 4000, stock: 25, image: "🍵" },
  { id: "4", name: "Kopi Kapal Api", price: 2000, stock: 40, image: "☕" },
]

export default function KasirPage() {
  const [cart, setCart] = useState<Array<{ id: string; qty: number }>>([])

  const addToCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id)
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item)
      }
      return [...prev, { id, qty: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id)
      return
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty } : item))
  }

  const total = cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id)
    return sum + (product?.price || 0) * item.qty
  }, 0)

  return (
    <div className="min-h-screen bg-[#f4fbf4] pb-32">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">Kasir</h1>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* Products */}
        <section>
          <h2 className="text-lg font-bold mb-3">Produk</h2>
          <div className="grid grid-cols-2 gap-3">
            {PRODUCTS.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product.id)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
              >
                <div className="text-4xl mb-2">{product.image}</div>
                <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                <p className="text-emerald-600 font-bold">Rp {product.price.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Stok: {product.stock}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Cart */}
        <section>
          <h2 className="text-lg font-bold mb-3">Keranjang ({cart.length})</h2>
          {cart.length === 0 ? (
            <div className="bg-white p-8 rounded-xl text-center text-gray-400">
              Keranjang kosong
            </div>
          ) : (
            <div className="space-y-2">
              {cart.map(item => {
                const product = PRODUCTS.find(p => p.id === item.id)
                if (!product) return null
                return (
                  <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
                    <div className="text-3xl">{product.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{product.name}</h3>
                      <p className="text-emerald-600 font-bold text-sm">Rp {product.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-8 h-8 bg-gray-100 rounded-lg font-bold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-bold">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-8 h-8 bg-emerald-600 text-white rounded-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>

      {/* Checkout Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">Rp {total.toLocaleString()}</p>
            </div>
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold active:scale-95 transition-transform">
              Bayar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
