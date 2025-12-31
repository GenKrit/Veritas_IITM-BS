// // veritas-website\app\admin\(protected)\events\[id]\edit\page.tsx

// import { getCurrentAdmin } from "@/lib/auth/admin";
// import { getEventById } from "@/lib/events/admin";
// import { canEditEvent } from "@/lib/auth/permissions";
// import { redirect } from "next/navigation";
// import EditEventForm from "./EditEventForm";

// export default async function EditEventPage(
//   ctx: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await ctx.params;

//   const admin = await getCurrentAdmin();
//   if (!admin || !canEditEvent(admin)) {
//     redirect("/admin/events");
//   }

//   const event = await getEventById(id);
//   if (!event) {
//     redirect("/admin/events");
//   }

//   return (
//     <div className="max-w-2xl space-y-6">
//       <h1 className="text-2xl font-bold">Edit Event</h1>
//       <EditEventForm event={event} />
//     </div>
//   );
// }

// app/admin/(protected)/events/[id]/edit/page.tsx
import { getCurrentAdmin } from "@/lib/auth/admin";
import { getEventById } from "@/lib/events/admin";
import { canEditEvent } from "@/lib/auth/permissions";
import { redirect } from "next/navigation";
import EditEventForm from "./EditEventForm";

export default async function EditEventPage(
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const admin = await getCurrentAdmin();
  if (!admin || !canEditEvent(admin)) {
    redirect("/admin/events");
  }

  const event = await getEventById(id);
  if (!event) {
    redirect("/admin/events");
  }

  return (
    <div className="min-h-screen bg-neutral-200">
      <div className="px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-linear-to-br from-neutral-800 to-neutral-900 rounded-xl p-8 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-2">Edit Event</h1>
          <p className="text-neutral-300">Update event information and details</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <EditEventForm event={event} />
        </div>
      </div>
    </div>
  );
}
