"use client"
import { useRouter } from "next/navigation"

export default function DeleteMeetingButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    const confirmDelete = confirm("Delete this meeting?")
    if (!confirmDelete) return

    await fetch(`/api/meeting/${id}`, {
      method: "DELETE",
    })

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="mb-6 px-4 py-2 bg-red-500 text-white rounded"
    >
      Delete Meeting
    </button>
  )
}
