"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import UploadText from "@/components/UploadText"
import Link from "next/link"

export default function Home() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center">
        <button
          onClick={() => signIn("google")}
          className="px-6 py-3 bg-black text-white rounded-lg"
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1>Welcome {session.user?.name}</h1>
      <Link href="/dashboard">Go to Dashboard</Link>
      <UploadText />
      <button
        onClick={() => signOut()}
        className="px-6 py-3 bg-red-500 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  )
}
