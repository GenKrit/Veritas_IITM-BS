"use client";

export function DeleteButton({ eventId }: { eventId: string }) {
  async function handleDelete() {
    const ok = confirm("Are you sure you want to delete this event?");
    if (!ok) return;

    const res = await fetch(`/api/admin/events/${eventId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete event");
      return;
    }

    // Refresh events list
    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="text-red-500 hover:underline"
    >
      Delete
    </button>
  );
}
