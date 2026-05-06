"use client"

import { useState, useEffect, useCallback } from "react"
import BottomNav from "../components/BottomNav"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  image: string | null
  category: string
}

interface CartItem { id: string; qty: number }

const FALLBACK: Product[] = [
  { id: "1", name: "Indomie Goreng", price: 3500, stock: 50, image: null, category: "Makanan" },
  { id: "2", name: "Aqua 600ml", price: 3000, stock: 30, image: null, category: "Minuman" },
  { id: "3", name: "Teh Pucuk", price: 4000, stock: 25, image: null, category: "Minuman" },
  { id: "4", name: "Kopi Kapal Api", price: 2000, stock: 40, image: null, category: "Minuman" },
  { id: "5", name: "Mie Sedaap", price: 3500, stock: 45, image: null, category: "Makanan" },
  { id: "6", name: "Chitato 68g", price: 10000, stock: 20, image: null, category: "Snack" },
]

const EMOJI: Record<string, string> = { Makanan: "🍜", Minuman: "💧", Snack: "🍿" }

function getEmoji(cat: string, name: string): string {
  if (name.toLowerCase().includes("kopi")) return "☕"
  if (name.toLowerCase().includes("teh")) return "🍵"
  if (name.toLowerCase().includes("aqua")) return "💧"
  return EMOJI[cat] || "📦"
}

export default function KasirPage() {
  const [products, setProducts] = useState<Product[]>(FALLBACK)
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [checking, setChecking] = useState(false)
  const [success, setSuccess] = useState(false)
  const [search, setSearch] = useState("")

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products")
      if (res.ok) { const d = await res.json(); if (d.length > 0) setProducts(d) }
    } catch { /* fallback */ } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const addToCart = (id: string) => {
    const p = products.find(x => x.id === id)
    const c = cart.find(x => x.id === id)
    if (p && c && c.qty >= p.stock) return
    setCart(prev => {
      const e = prev.find(x => x.id === id)
      return e ? prev.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x) : [...prev, { id, qty: 1 }]
    })
  }

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) { setCart(prev => prev.filter(x => x.id !== id)); return }
    const p = products.find(x => x.id === id)
    if (p && qty > p.stock) return
    setCart(prev => prev.map(x => x.id === id ? { ...x, qty } : x))
  }

  const total = cart.reduce((s, i) => s + (products.find(p => p.id === i.id)?.price || 0) * i.qty, 0)

  const checkout = async () => {
    if (!cart.length) return
    setChecking(true)
    try {
      const items = cart.map(i => ({ productId: i.id, quantity: i.qty, price: products.find(p => p.id === i.id)?.price || 0 }))
      await fetch("/api/transactions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items, paymentType: "CASH" }) })
    } catch { /* offline */ }
    setCart([]); setSuccess(true); setChecking(false)
    setTimeout(() => setSuccess(false), 3000)
    fetchProducts()
  }

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#f4fbf4] pb-32">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">🛒 Kasir</h1>
        <input type="text" placeholder="Cari produk..." value={search} onChange={e => setSearch(e.target.value)}
          className="mt-3 w-full px-4 py-2.5 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all" />
      </header>
      {success && <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce font-bold">✅ Transaksi berhasil!</div>}
      <main className="max-w-md mx-auto p-4 space-y-4">
        <section>
          <h2 className="text-lg font-bold mb-3">Produk ({filtered.length})</h2>
          <div className={`grid grid-cols-2 gap-3 ${loading ? "animate-pulse" : ""}`}>
            {filtered.map(product => {
              const inCart = cart.find(x => x.id === product.id)
              return (
                <button key={product.id} onClick={() => addToCart(product.id)}
                  className={`bg-white p-4 rounded-xl shadow-sm border transition-all active:scale-95 relative ${inCart ? "border-emerald-400 ring-2 ring-emerald-100" : "border-gray-100"} ${product.stock <= 0 ? "opacity-50 pointer-events-none" : ""}`}>
                  {inCart && <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-600 text-white rounded-full text-xs font-bold flex items-center justify-center">{inCart.qty}</span>}
                  <div className="text-4xl mb-2">{getEmoji(product.category, product.name)}</div>
                  <h3 className="font-semibold text-sm mb-1 text-left">{product.name}</h3>
                  <p className="text-emerald-600 font-bold text-left">Rp {product.price.toLocaleString("id-ID")}</p>
                  <p className={`text-xs text-left ${product.stock <= 5 ? "text-red-500 font-bold" : "text-gray-500"}`}>Stok: {product.stock}</p>
                </button>
              )
            })}
          </div>
        </section>
        <section>
          <h2 className="text-lg font-bold mb-3">Keranjang ({cart.length})</h2>
          {!cart.length ? (
            <div className="bg-white p-8 rounded-xl text-center text-gray-400"><div className="text-4xl mb-2">🛒</div>Keranjang kosong</div>
          ) : (
            <div className="space-y-2">
              {cart.map(item => {
                const p = products.find(x => x.id === item.id)
                if (!p) return null
                return (
                  <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
                    <div className="text-3xl">{getEmoji(p.category, p.name)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{p.name}</h3>
                      <p className="text-emerald-600 font-bold text-sm">Rp {(p.price * item.qty).toLocaleString("id-ID")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 bg-gray-100 rounded-lg font-bold active:scale-95">-</button>
                      <span className="w-8 text-center font-bold">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 bg-emerald-600 text-white rounded-lg font-bold active:scale-95">+</button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>
      {cart.length > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Total ({cart.reduce((s, i) => s + i.qty, 0)} item)</p>
              <p className="text-2xl font-bold text-gray-900">Rp {total.toLocaleString("id-ID")}</p>
            </div>
            <button onClick={checkout} disabled={checking} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold active:scale-95 transition-transform disabled:opacity-50">
              {checking ? "Memproses..." : "💳 Bayar"}
            </button>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  )
}
