// veritas-website\app\admin\(protected)\events\new\page.tsx
// converted this file to cient side form later

// import { getCurrentAdmin } from "@/lib/auth/admin";
// import { redirect } from "next/navigation";
// import { canCreateEvent } from "@/lib/auth/permissions";

// export default async function NewEventPage() {
//   const admin = await getCurrentAdmin();

//   if (!admin || !canCreateEvent(admin)) {
//     redirect("/admin/events");
//   }

//   return (
//     <form
//       // action="/api/admin/events"
//       // method="post"
//       className="max-w-xl space-y-4"
//     >

//       <h1 className="text-2xl font-bold">Create Event</h1>

//       <input name="name" placeholder="Event name" required />
//       <textarea name="description" placeholder="Description" required />

//       <input aria-label="date" type="date" name="date" required />
//       <input name="time" placeholder="Time (e.g. 6:30 PM)" required />
//       <input name="venue" placeholder="Venue" required />

//       {/* TYPE */}
//       <select aria-label="Event type" name="type" required>
//         <option value="DISCUSSION">Discussion</option>
//         <option value="DEBATE">Debate</option>
//         <option value="OFF_THE_BEAT">Off The Beat</option>
//         <option value="GROUP_DISCUSSION">Group Discussion</option>
//         <option value="STORYTELLING">Storytelling</option>
//         <option value="WORKSHOP">Workshop</option>
//         <option value="OTHER">Other</option>
//       </select>

//       {/* STATUS */}
//       <select aria-label="Event status" name="status" required>
//         <option value="UPCOMING">Upcoming</option>
//         <option value="CURRENT">Current</option>
//         <option value="LIVE">Live</option>
//         <option value="COMPLETED">Completed</option>
//       </select>

//       {/* ACCESS */}
//       <select aria-label="Event access" name="access" required>
//         <option value="OPEN">Open</option>
//         <option value="REGISTRATION">Registration</option>
//         <option value="TBD">TBD</option>
//       </select>

//       <input name="meetLink" placeholder="Meet link (optional)" />
//       <input name="registrationLink" placeholder="Registration link (optional)" />
//       <input name="eventDocLink" placeholder="Event doc link (optional)" />
//       <input name="coverImageLink" placeholder="Cover image URL (optional)" />
    
//       <button type="submit" className="bg-white text-black px-4 py-2 rounded">
//         Create
//       </button>
//     </form>

//   );
// }
// app/admin/(protected)/events/new/page.tsx
import { getCurrentAdmin } from "@/lib/auth/admin";
import { canCreateEvent } from "@/lib/auth/permissions";
import { redirect } from "next/navigation";
import NewEventForm from "./NewEventForm";

export default async function NewEventPage() {
  const admin = await getCurrentAdmin();

  if (!admin || !canCreateEvent(admin)) {
    redirect("/admin/events");
  }

  return (
    <div className="min-h-screen bg-neutral-200">
      <div className="px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-linear-to-br from-neutral-700 to-neutral-900 rounded-xl p-8 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold text-neutral-100 mb-2">Create New Event</h1>
          <p className="text-neutral-300">Fill in the details to create a new event</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <NewEventForm />
        </div>
      </div>
    </div>
  );
}
