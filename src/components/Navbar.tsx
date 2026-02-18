"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-6 py-3 rounded-2xl border-white/10 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl font-black tracking-tighter text-white">
            Meet<span className="text-indigo-400">Mind</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6 ml-4 min-w-0">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors hidden sm:block ${pathname === "/" ? "text-white" : "text-gray-400 hover:text-white"}`}
          >
            Home
          </Link>
          {session && (
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium transition-colors ${pathname === "/dashboard" ? "text-white" : "text-gray-400 hover:text-white"}`}
            >
              Dashboard
            </Link>
          )}
          
          <div className="h-4 w-[1px] bg-white/10 mx-1 shrink-0" />

          {session ? (
            <div className="flex items-center gap-4 shrink-0 min-w-0">
              <div className="flex flex-col items-end min-w-0">
                <span className="text-sm font-bold text-white truncate max-w-[150px]">{session.user?.name}</span>
                <button 
                  onClick={() => signOut()} 
                  className="text-[10px] text-gray-400 hover:text-red-400 transition-colors uppercase tracking-wider font-bold"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95 shrink-0"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
