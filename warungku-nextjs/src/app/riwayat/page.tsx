"use client"

import { useState, useEffect, useCallback } from "react"
import BottomNav from "../components/BottomNav"

interface TransactionItem { id: string; quantity: number; price: number; product: { name: string; category: string } }
interface Transaction { id: string; total: number; paymentType: string; status: string; createdAt: string; items: TransactionItem[] }

const FALLBACK: Transaction[] = [
  { id: "1", total: 15000, paymentType: "CASH", status: "COMPLETED", createdAt: new Date().toISOString(), items: [{ id: "i1", quantity: 3, price: 5000, product: { name: "Indomie", category: "Makanan" } }] },
  { id: "2", total: 25000, paymentType: "CASH", status: "COMPLETED", createdAt: new Date().toISOString(), items: [{ id: "i2", quantity: 5, price: 5000, product: { name: "Aqua", category: "Minuman" } }] },
  { id: "3", total: 8000, paymentType: "CASH", status: "COMPLETED", createdAt: new Date(Date.now() - 86400000).toISOString(), items: [{ id: "i3", quantity: 2, price: 4000, product: { name: "Teh Pucuk", category: "Minuman" } }] },
]

function formatDate(d: string) {
  const date = new Date(d)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const txDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diff = (today.getTime() - txDate.getTime()) / 86400000
  if (diff === 0) return "Hari Ini"
  if (diff === 1) return "Kemarin"
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
}

function formatTime(d: string) {
  return new Date(d).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
}

export default function RiwayatPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(FALLBACK)
  const [loading, setLoading] = useState(true)

  const fetchTx = useCallback(async () => {
    try {
      const res = await fetch("/api/transactions")
      if (res.ok) { const d = await res.json(); if (d.transactions?.length > 0) setTransactions(d.transactions) }
    } catch { /* fallback */ } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchTx() }, [fetchTx])

  const totalRevenue = transactions.reduce((s, t) => s + Number(t.total), 0)

  // Group by date
  const grouped: Record<string, Transaction[]> = {}
  transactions.forEach(t => {
    const key = formatDate(t.createdAt)
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(t)
  })

  const statusBadge = (s: string) => {
    if (s === "COMPLETED") return { label: "✓ Selesai", cls: "bg-emerald-100 text-emerald-700" }
    if (s === "CANCELLED") return { label: "✕ Batal", cls: "bg-red-100 text-red-700" }
    return { label: "⏳ Pending", cls: "bg-yellow-100 text-yellow-700" }
  }

  return (
    <div className="min-h-screen bg-[#f4fbf4] pb-24">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-gray-900">📝 Riwayat Transaksi</h1>
      </header>
      <main className={`max-w-md mx-auto p-4 space-y-4 ${loading ? "animate-pulse" : ""}`}>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <p className="text-xs text-gray-600 mb-1">Total Transaksi</p>
            <p className="text-2xl font-bold text-gray-900">{transactions.length}</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl shadow-sm border border-emerald-100">
            <p className="text-xs text-emerald-700 mb-1">Total Pendapatan</p>
            <p className="text-xl font-bold text-emerald-600">Rp {totalRevenue.toLocaleString("id-ID")}</p>
          </div>
        </div>
        {Object.entries(grouped).map(([date, txs]) => (
          <section key={date}>
            <h2 className="text-lg font-bold mb-3">{date}</h2>
            <div className="space-y-2">
              {txs.map(tx => {
                const badge = statusBadge(tx.status)
                return (
                  <div key={tx.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">Transaksi #{tx.id.slice(-6)}</p>
                        <p className="text-xs text-gray-500">{formatTime(tx.createdAt)} • {tx.paymentType}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${badge.cls}`}>{badge.label}</span>
                    </div>
                    {tx.items.length > 0 && (
                      <div className="text-xs text-gray-500 mb-2">
                        {tx.items.map(i => `${i.product.name} x${i.quantity}`).join(", ")}
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">{tx.items.reduce((s, i) => s + i.quantity, 0)} item</p>
                      <p className="text-lg font-bold text-emerald-600">Rp {Number(tx.total).toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))}
        {transactions.length === 0 && !loading && (
          <div className="bg-white p-8 rounded-xl text-center text-gray-400">
            <div className="text-4xl mb-2">📋</div>Belum ada transaksi
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
