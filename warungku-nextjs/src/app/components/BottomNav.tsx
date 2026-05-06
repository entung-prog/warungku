"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/kasir", label: "Kasir", icon: "🛒" },
  { href: "/stok", label: "Stok", icon: "📦" },
  { href: "/riwayat", label: "Riwayat", icon: "📝" },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                isActive
                  ? "text-emerald-600 scale-105"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className={`text-xl ${isActive ? "scale-110" : ""} transition-transform`}>
                {item.icon}
              </span>
              <span className={`text-[10px] font-bold ${isActive ? "text-emerald-600" : "text-gray-400"}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 bg-emerald-600 rounded-full mt-0.5" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
