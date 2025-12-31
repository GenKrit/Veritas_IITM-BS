// // app/admin/(protected)/events/page.tsx

// import { DeleteButton } from "@/components/admin/DeleteButton";
// import { getCurrentAdmin } from "@/lib/auth/admin";
// import { listEvents } from "@/lib/events/admin";
// import { redirect } from "next/navigation";
// import { canEditEvent, canDeleteEvent } from "@/lib/auth/permissions";

// export default async function AdminEventsPage() {
//   const admin = await getCurrentAdmin();
//   if (!admin) redirect("/admin/login");

//   const events = await listEvents();

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Events</h1>

//         {canEditEvent(admin) && (
//           <a
//             href="/admin/events/new"
//             className="bg-white text-black px-4 py-2 rounded"
//           >
//             + New Event
//           </a>
//         )}
//       </div>

//       {/* Table */}
//       <table className="w-full border-collapse text-sm">
//         <thead>
//           <tr className="border-b border-gray-700 text-left text-gray-400">
//             <th className="py-2">Name</th>
//             <th>Type</th>
//             <th>Date</th>
//             <th>Status</th>
//             <th>Access</th>
//             <th>Venue</th>
//             <th className="text-right">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {events.map((event) => (
//             <tr
//               key={event.id}
//               className="border-b border-gray-800 hover:bg-gray-900"
//             >
//               <td className="py-2 font-medium">{event.name}</td>

//               <td className="uppercase text-xs text-gray-400">
//                 {event.type.replaceAll("_", " ")}
//               </td>

//               <td>{new Date(event.date).toLocaleDateString()}</td>

//               <td>{renderStatus(event.status)}</td>

//               <td className="uppercase text-xs">{event.access}</td>

//               <td>{event.venue}</td>

//               <td className="text-right space-x-3">
//                 <a
//                   href={`/admin/events/${event.id}`}
//                   className="text-gray-300 hover:text-white"
//                 >
//                   View
//                 </a>

//                 {canEditEvent(admin) && (
//                   <a
//                     href={`/admin/events/${event.id}/edit`}
//                     className="text-blue-400"
//                   >
//                     Edit
//                   </a>
//                 )}

//                 {canDeleteEvent(admin) && (
//                   <DeleteButton eventId={event.id} />
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// /* ---------------- helpers ---------------- */

// function renderStatus(status: string) {
//   const color =
//     status === "LIVE"
//       ? "bg-green-600"
//       : status === "UPCOMING"
//       ? "bg-yellow-600"
//       : status === "CURRENT"
//       ? "bg-blue-600"
//       : "bg-slate-600";

//   return (
//     <span className={`${color} text-black px-2 py-1 rounded text-xs`}>
//       {status}
//     </span>
//   );
// }


// app/admin/(protected)/events/page.tsx
import { getCurrentAdmin } from "@/lib/auth/admin";
import { listEvents } from "@/lib/events/admin";
import { redirect } from "next/navigation";
import { canEditEvent, canDeleteEvent } from "@/lib/auth/permissions";
import { Calendar, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { DeleteEventButton } from "./DeleteEventButton";

export default async function AdminEventsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const events = await listEvents();

  // Calculate stats
  const upcomingCount = events.filter(e => e.status === "UPCOMING").length;
  const liveCount = events.filter(e => e.status === "LIVE" || e.status === "CURRENT").length;
  const completedCount = events.filter(e => e.status === "COMPLETED").length;

  return (
    <div className="min-h-screen bg-neutral-200">
      <div className="px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-linear-to-br from-neutral-800 to-neutral-900 rounded-xl p-8 mb-8 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Events Management</h1>
              <p className="text-neutral-300">Create and manage society events</p>
            </div>

            {canEditEvent(admin) && (
              <a
                href="/admin/events/new"
                className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                New Event
              </a>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Events" value={events.length} icon="📅" />
          <StatCard label="Upcoming" value={upcomingCount} icon="🔜" color="orange" />
          <StatCard label="Live/Current" value={liveCount} icon="🔴" color="green" />
          <StatCard label="Completed" value={completedCount} icon="✅" color="blue" />
        </div>

        {/* Events List */}
        {events.length === 0 ? (
          <div className="bg-white border-2 border-neutral-400 rounded-xl p-12 text-center shadow-md">
            <div className="h-20 w-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-neutral-500" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">No Events Yet</h3>
            <p className="text-neutral-600 mb-6">Create your first event to get started</p>
            {canEditEvent(admin) && (
              <a
                href="/admin/events/new"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Event
              </a>
            )}
          </div>
        ) : (
          <div className="bg-white border-2 border-neutral-400 rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-100 border-b-2 border-neutral-300">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-bold text-neutral-700 uppercase tracking-wide">Event Name</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-neutral-700 uppercase tracking-wide">Type</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-neutral-700 uppercase tracking-wide">Date</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-neutral-700 uppercase tracking-wide">Status</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-neutral-700 uppercase tracking-wide">Access</th>
                    <th className="text-left py-4 px-4 text-sm font-bold text-neutral-700 uppercase tracking-wide">Venue</th>
                    <th className="text-right py-4 px-30 text-sm font-bold text-neutral-700 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {events.map((event, index) => (
                    <tr
                      key={event.id}
                      className={`
                        border-b border-neutral-200 
                        hover:bg-neutral-50 
                        transition-colors duration-150
                        ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}
                      `}
                    >
                      <td className="py-4 px-6">
                        <p className="font-semibold text-neutral-900">{event.name}</p>
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-xs font-medium text-neutral-600 bg-neutral-200 px-2 py-1 rounded-md uppercase">
                          {event.type.replaceAll("_", " ")}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-sm text-neutral-700">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </td>

                      <td className="py-4 px-4">
                        {renderStatus(event.status)}
                      </td>

                      <td className="py-4 px-4">
                        <span className="text-xs font-medium text-neutral-700 uppercase">
                          {event.access}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-sm text-neutral-600">
                        {event.venue}
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`/admin/events/${event.id}`}
                            className="flex items-center gap-2 p-2 text-neutral-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="View Details"
                          >
                            View<Eye className="w-4 h-4" />
                          </a>

                          {canEditEvent(admin) && (
                            <a
                              href={`/admin/events/${event.id}/edit`}
                              className="flex items-center gap-2 p-2 text-neutral-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                              title="Edit Event"
                            >
                              Edit<Edit className="w-4 h-4" />
                            </a>
                          )}

                          {canDeleteEvent(admin) && (
                            <DeleteEventButton eventId={event.id} />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Helpers ---------------- */

function renderStatus(status: string) {
  const styles = {
    LIVE: "bg-red-100 text-red-700 border-red-300",
    CURRENT: "bg-blue-100 text-blue-700 border-blue-300",
    UPCOMING: "bg-orange-100 text-orange-700 border-orange-300",
    COMPLETED: "bg-green-100 text-green-700 border-green-300",
  };

  const style = styles[status as keyof typeof styles] || "bg-neutral-100 text-neutral-700 border-neutral-300";

  return (
    <span className={`${style} border-2 px-2.5 py-1 rounded-full text-xs font-bold uppercase`}>
      {status}
    </span>
  );
}

function StatCard({ 
  label, 
  value, 
  icon,
  color = "neutral"
}: { 
  label: string; 
  value: number; 
  icon: string;
  color?: "blue" | "green" | "orange" | "neutral";
}) {
  const colorClasses = {
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      hover: "hover:border-blue-300 hover:shadow-blue-100"
    },
    green: {
      text: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      hover: "hover:border-green-300 hover:shadow-green-100"
    },
    orange: {
      text: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      hover: "hover:border-orange-300 hover:shadow-orange-100"
    },
    neutral: {
      text: "text-neutral-900",
      bg: "bg-neutral-50",
      border: "border-neutral-400",
      hover: "hover:border-neutral-500 hover:shadow-neutral-200"
    },
  };

  const styles = colorClasses[color];

  return (
    <div className={`${styles.bg} border-2 ${styles.border} rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${styles.hover} hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className={`text-4xl font-bold ${styles.text}`}>
        {value}
      </p>
    </div>
  );
}
