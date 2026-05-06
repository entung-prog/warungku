"use client"

import { useState, useEffect, useCallback } from "react"
import BottomNav from "../components/BottomNav"

interface Product {
  id: string; name: string; stock: number; minStock: number; category: string; image: string | null; price: number; sku: string
}

const FALLBACK: Product[] = [
  { id: "1", name: "Indomie Goreng", stock: 50, minStock: 20, category: "Makanan", image: null, price: 3500, sku: "MKN001" },
  { id: "2", name: "Aqua 600ml", stock: 8, minStock: 15, category: "Minuman", image: null, price: 3000, sku: "MNM001" },
  { id: "3", name: "Teh Pucuk", stock: 25, minStock: 10, category: "Minuman", image: null, price: 4000, sku: "MNM002" },
  { id: "4", name: "Kopi Kapal Api", stock: 5, minStock: 10, category: "Minuman", image: null, price: 2000, sku: "MNM003" },
  { id: "5", name: "Mie Sedaap", stock: 45, minStock: 20, category: "Makanan", image: null, price: 3500, sku: "MKN002" },
]

const EMOJI: Record<string, string> = { Makanan: "🍜", Minuman: "💧", Snack: "🍿" }
function getEmoji(cat: string, name: string) {
  if (name.toLowerCase().includes("kopi")) return "☕"
  if (name.toLowerCase().includes("teh")) return "🍵"
  if (name.toLowerCase().includes("aqua")) return "💧"
  return EMOJI[cat] || "📦"
}

export default function StokPage() {
  const [products, setProducts] = useState<Product[]>(FALLBACK)
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: "", sku: "", price: "", stock: "", category: "Makanan", minStock: "5" })
  const [saving, setSaving] = useState(false)

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products")
      if (res.ok) { const d = await res.json(); if (d.length > 0) setProducts(d) }
    } catch { /* fallback */ } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const handleAdd = async () => {
    if (!form.name || !form.sku || !form.price || !form.stock) return
    setSaving(true)
    try {
      const res = await fetch("/api/products", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price), stock: Number(form.stock), minStock: Number(form.minStock) })
      })
      if (res.ok) { setShowAdd(false); setForm({ name: "", sku: "", price: "", stock: "", category: "Makanan", minStock: "5" }); fetchProducts() }
    } catch { /* offline */ } finally { setSaving(false) }
  }

  const lowStock = products.filter(p => p.stock < p.minStock)
  const safeStock = products.filter(p => p.stock >= p.minStock)

  return (
    <div className="min-h-screen bg-[#f4fbf4] pb-24">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">📦 Stok & Inventori</h1>
      </header>
      <main className={`max-w-md mx-auto p-4 space-y-4 ${loading ? "animate-pulse" : ""}`}>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-4 rounded-xl shadow-sm text-center">
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            <p className="text-xs text-gray-600">Total Produk</p>
          </div>
          <div className="bg-red-50 p-4 rounded-xl shadow-sm text-center border border-red-100">
            <p className="text-2xl font-bold text-red-600">{lowStock.length}</p>
            <p className="text-xs text-red-700">Stok Menipis</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl shadow-sm text-center border border-emerald-100">
            <p className="text-2xl font-bold text-emerald-600">{safeStock.length}</p>
            <p className="text-xs text-emerald-700">Stok Aman</p>
          </div>
        </div>
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Daftar Produk</h2>
            <button onClick={() => setShowAdd(!showAdd)} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold active:scale-95 transition-transform">
              {showAdd ? "✕ Batal" : "+ Tambah"}
            </button>
          </div>
          {showAdd && (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-200 mb-4 space-y-3">
              <h3 className="font-bold text-sm text-emerald-700">Tambah Produk Baru</h3>
              <input placeholder="Nama Produk" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm" />
              <input placeholder="SKU (contoh: MKN001)" value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm" />
              <div className="grid grid-cols-2 gap-2">
                <input placeholder="Harga" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="px-3 py-2 bg-gray-100 rounded-lg text-sm" />
                <input placeholder="Stok" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} className="px-3 py-2 bg-gray-100 rounded-lg text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="px-3 py-2 bg-gray-100 rounded-lg text-sm">
                  <option>Makanan</option><option>Minuman</option><option>Snack</option><option>Lainnya</option>
                </select>
                <input placeholder="Min Stok" type="number" value={form.minStock} onChange={e => setForm({ ...form, minStock: e.target.value })} className="px-3 py-2 bg-gray-100 rounded-lg text-sm" />
              </div>
              <button onClick={handleAdd} disabled={saving} className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-bold active:scale-95 disabled:opacity-50">
                {saving ? "Menyimpan..." : "💾 Simpan Produk"}
              </button>
            </div>
          )}
          <div className="space-y-2">
            {products.map(product => {
              const isLow = product.stock < product.minStock
              return (
                <div key={product.id} className={`bg-white p-4 rounded-xl shadow-sm border ${isLow ? "border-red-200" : "border-gray-100"}`}>
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{getEmoji(product.category, product.name)}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.category} • Rp {Number(product.price).toLocaleString("id-ID")}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-sm font-bold ${isLow ? "text-red-600" : "text-emerald-600"}`}>Stok: {product.stock}</span>
                        {isLow && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">⚠️ Menipis</span>}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}
