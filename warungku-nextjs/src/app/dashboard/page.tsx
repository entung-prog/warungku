"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import BottomNav from "../components/BottomNav"

interface DashboardData {
  todaySales: number
  todayCount: number
  monthSales: number
  monthTarget: number
  lowStockCount: number
  salesGrowth: number
}

// Data fallback saat belum ada koneksi DB
const FALLBACK_DATA: DashboardData = {
  todaySales: 1250000,
  todayCount: 45,
  monthSales: 28400000,
  monthTarget: 40000000,
  lowStockCount: 8,
  salesGrowth: 12.5,
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>(FALLBACK_DATA)
  const [loading, setLoading] = useState(true)
  const [isOffline, setIsOffline] = useState(false)

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard")
      if (res.ok) {
        const json = await res.json()
        setData(json)
        setIsOffline(false)
      } else {
        setIsOffline(true)
      }
    } catch {
      setIsOffline(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const monthProgress = Math.min(
    Math.round((data.monthSales / data.monthTarget) * 100),
    100
  )

  return (
    <main className="max-w-md mx-auto px-4 pb-24 pt-4 space-y-6 bg-[#f4fbf4] min-h-screen">
      {/* Welcome Section */}
      <section className="space-y-1">
        <p className="text-sm text-gray-600">Selamat datang! 👋</p>
        <h1 className="text-2xl font-bold text-gray-900">Ringkasan Warung</h1>
        {isOffline && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3 py-2 rounded-lg">
            ⚠️ Mode offline — menampilkan data contoh
          </div>
        )}
      </section>

      {/* Summary Cards */}
      <section className={`grid grid-cols-2 gap-4 ${loading ? "animate-pulse" : ""}`}>
        {/* Total Penjualan */}
        <div className="col-span-2 p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-lg text-white">
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-semibold opacity-80">TOTAL PENJUALAN HARI INI</span>
            <span className="text-2xl">💰</span>
          </div>
          <div className="text-3xl font-bold">Rp {data.todaySales.toLocaleString("id-ID")}</div>
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold bg-white/10 w-fit px-2 py-1 rounded-full">
            <span>{data.salesGrowth >= 0 ? "📈" : "📉"}</span>
            <span>{data.salesGrowth >= 0 ? "+" : ""}{data.salesGrowth}% dari kemarin</span>
          </div>
        </div>

        {/* Total Transaksi */}
        <div className="p-4 rounded-2xl bg-white shadow-sm flex flex-col justify-between h-32 border border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-sm">🧾</span>
            <span className="text-xs font-semibold">TRANSAKSI</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{data.todayCount}</div>
          <div className="text-xs text-emerald-600 font-bold">
            {data.todayCount > 30 ? "TARGET TERCAPAI" : "TERUS SEMANGAT!"}
          </div>
        </div>

        {/* Stok Menipis */}
        <div className="p-4 rounded-2xl bg-red-50 text-red-900 flex flex-col justify-between h-32 border border-red-100">
          <div className="flex items-center gap-2">
            <span className="text-sm">⚠️</span>
            <span className="text-xs font-semibold">STOK MENIPIS</span>
          </div>
          <div className="text-2xl font-bold">{data.lowStockCount}</div>
          <div className="text-xs font-bold text-red-700">PERLU RE-STOK</div>
        </div>

        {/* Omzet Bulan Ini */}
        <div className="col-span-2 p-5 rounded-2xl bg-white border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-gray-600">OMZET BULAN INI</span>
            <span className="text-xl">📊</span>
          </div>
          <div className="text-xl font-bold text-gray-900">Rp {data.monthSales.toLocaleString("id-ID")}</div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${monthProgress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs font-bold text-gray-600">
            <span>Target: {(data.monthTarget / 1000000).toFixed(0)}jt</span>
            <span>{monthProgress}%</span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Aksi Cepat</h2>
        <div className="grid grid-cols-4 gap-3">
          <Link href="/kasir" className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md text-2xl">
              🛒
            </div>
            <span className="text-xs font-bold text-center text-gray-700 leading-tight">Transaksi Baru</span>
          </Link>
          <Link href="/stok" className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-gray-200 text-2xl">
              📦
            </div>
            <span className="text-xs font-bold text-center text-gray-700 leading-tight">Tambah Produk</span>
          </Link>
          <Link href="/riwayat" className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-gray-200 text-2xl">
              📈
            </div>
            <span className="text-xs font-bold text-center text-gray-700 leading-tight">Laporan</span>
          </Link>
          <Link href="/stok" className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <div className="w-14 h-14 rounded-2xl bg-white text-emerald-600 flex items-center justify-center shadow-sm border border-gray-200 text-2xl">
              📋
            </div>
            <span className="text-xs font-bold text-center text-gray-700 leading-tight">Kelola Stok</span>
          </Link>
        </div>
      </section>

      <BottomNav />
    </main>
  )
}
