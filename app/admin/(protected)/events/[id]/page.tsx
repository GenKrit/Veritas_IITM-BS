// // veritas-website\app\admin\(protected)\events\[id]\page.tsx

// import { getCurrentAdmin } from "@/lib/auth/admin";
// import { getEventById } from "@/lib/events/admin";
// import {
//   canEditEvent,
//   canDeleteEvent,
// } from "@/lib/auth/permissions";
// import { redirect } from "next/navigation";

// export default async function EditEventPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const admin = await getCurrentAdmin();
//   const event = await getEventById(params.id);

//   if (!admin || !event || !canEditEvent(admin)) {
//     redirect("/admin/events");
//   }

//   return (
//     <form
//       action={`/api/admin/events/${event.id}`}
//       method="post"
//       className="max-w-xl space-y-4"
//     >
//       <input type="hidden" name="_method" value="PATCH" />

//       <h1 className="text-2xl font-bold">Edit Event</h1>

//       <input  aria-label="name" name="name" defaultValue={event.name} className="input" />
//       <textarea
//       aria-label="description"
//         name="description"
//         defaultValue={event.description}
//         className="input"
//       />

//       <input
//         type="date"
//         name="date"
//         aria-label="date"
//         defaultValue={event.date.toISOString().slice(0, 10)}
//       />

//       <input  aria-label="time" name="time"  defaultValue={event.time} />

//       <button type='submit'className="bg-white text-black px-4 py-2 rounded">
//         Save Changes
//       </button>

//       {canDeleteEvent(admin) && (
//         <button
//           type="submit"
//           formAction={`/api/admin/events/${event.id}`}
//           formMethod="post"
//           name="_method"
//           value="DELETE"
//           className="text-red-500"
//         >
//           Delete Event
//         </button>
//       )}
//     </form>
//   );
// }

// veritas-website\app\admin\(protected)\events\[id]\page.tsx
// profile and event details page with history linked to event page using "view" button
// app/admin/(protected)/events/[id]/page.tsx
import { getCurrentAdmin } from "@/lib/auth/admin";
import { getEventById } from "@/lib/events/admin";
import { redirect } from "next/navigation";
import { Calendar, Clock, MapPin, Users, Link as LinkIcon, FileText, Image as ImageIcon, Edit } from "lucide-react";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const admin = await getCurrentAdmin();
  if (!admin) {
    redirect("/admin/login");
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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{event.name}</h1>
              <p className="text-neutral-300">Event details and information</p>
            </div>

            <a
              href={`/admin/events/${event.id}/edit`}
              className="px-5 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-200 flex items-center gap-2"
            >
              <Edit className="w-5 h-5" />
              Edit Event
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Status & Meta */}
          <div className="bg-white border-2 border-neutral-400 rounded-xl p-6 shadow-md">
            <div className="flex flex-wrap gap-3 mb-4">
              {renderStatusBadge(event.status)}
              <Badge color="blue">{event.type.replaceAll("_", " ")}</Badge>
              <Badge color="green">{event.access}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoItem icon={<Calendar className="w-5 h-5" />} label="Date" value={new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} />
              <InfoItem icon={<Clock className="w-5 h-5" />} label="Time" value={event.time} />
              <InfoItem icon={<MapPin className="w-5 h-5" />} label="Venue" value={event.venue} />
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border-2 border-neutral-400 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Description
            </h2>
            <p className="text-neutral-700 whitespace-pre-wrap leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Links */}
          {(event.meetLink || event.registrationLink || event.eventDocLink || event.coverImageLink) && (
            <div className="bg-white border-2 border-neutral-400 rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <LinkIcon className="w-5 h-5" />
                Resources & Links
              </h2>
              <div className="space-y-3">
                {event.meetLink && (
                  <LinkItem label="Meet Link" href={event.meetLink} />
                )}
                {event.registrationLink && (
                  <LinkItem label="Registration Link" href={event.registrationLink} />
                )}
                {event.eventDocLink && (
                  <LinkItem label="Event Document" href={event.eventDocLink} />
                )}
                {event.coverImageLink && (
                  <LinkItem label="Cover Image" href={event.coverImageLink} icon={<ImageIcon className="w-4 h-4" />} />
                )}
              </div>
            </div>
          )}

          {/* Creator Info */}
          <div className="bg-neutral-50 border-2 border-neutral-300 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600 mb-1">Created by</p>
                <p className="font-semibold text-neutral-900">{event.createdBy.name}</p>
                <p className="text-sm text-neutral-600">{event.createdBy.email}</p>
                <p className="text-xs text-neutral-500 mt-2">
                  {new Date(event.createdAt).toLocaleString('en-US', { 
                    dateStyle: 'medium', 
                    timeStyle: 'short' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderStatusBadge(status: string) {
  const styles = {
    LIVE: "bg-red-100 text-red-700 border-red-300",
    CURRENT: "bg-blue-100 text-blue-700 border-blue-300",
    UPCOMING: "bg-orange-100 text-orange-700 border-orange-300",
    COMPLETED: "bg-green-100 text-green-700 border-green-300",
  };

  const style = styles[status as keyof typeof styles] || "bg-neutral-100 text-neutral-700 border-neutral-300";

  return (
    <span className={`${style} border-2 px-3 py-1.5 rounded-full text-sm font-bold uppercase`}>
      {status}
    </span>
  );
}

function Badge({ children, color = "neutral" }: { children: React.ReactNode; color?: "blue" | "green" | "neutral" }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    neutral: "bg-neutral-200 text-neutral-700"
  };

  return (
    <span className={`${colors[color]} px-3 py-1.5 rounded-lg text-sm font-semibold uppercase`}>
      {children}
    </span>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-blue-600 mt-1">{icon}</div>
      <div>
        <p className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-1">{label}</p>
        <p className="text-sm font-medium text-neutral-900">{value}</p>
      </div>
    </div>
  );
}

function LinkItem({ label, href, icon }: { label: string; href: string; icon?: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 bg-neutral-50 border-2 border-neutral-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group"
    >
      <div className="text-blue-600">
        {icon || <LinkIcon className="w-4 h-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-neutral-900">{label}</p>
        <p className="text-xs text-neutral-600 truncate group-hover:text-blue-600">{href}</p>
      </div>
      <span className="text-blue-600 text-xl">→</span>
    </a>
  );
}
