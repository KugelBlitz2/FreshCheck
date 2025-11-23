"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Scan, FileClock, Settings, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/search", icon: Search, label: "Search" },
    { href: "/scan", icon: Scan, label: "Scan", primary: true },
    { href: "/history", icon: FileClock, label: "History" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ]

  return (
    <nav className="bg-white border-t border-gray-100 pb-safe px-4 py-2 shadow-[0_-5px_10px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          if (item.primary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform active:scale-95"
              >
                <Icon size={28} />
                <span className="sr-only">{item.label}</span>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
                isActive ? "text-green-600" : "text-gray-400 hover:text-gray-600",
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
