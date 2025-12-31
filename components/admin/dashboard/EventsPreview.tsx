// components/admin/dashboard/EventsPreview.tsx
import { Event, AdminUser } from "@prisma/client";
import Link from "next/link";

type EventWithCreator = Event & { createdBy: AdminUser };

export default function EventsPreview({ events }: { events: EventWithCreator[] }) {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-neutral-200">
        <h2 className="text-lg font-bold text-neutral-900">Recent Events</h2>
        <Link
          href="/admin/events"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          View All →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left py-3 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Event Name
              </th>
              <th className="text-left py-3 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="text-left py-3 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-3 px-6 text-xs font-semibold text-neutral-600 uppercase tracking-wider w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-4 px-6 font-medium text-neutral-900">{event.name}</td>
                <td className="py-4 px-6 text-neutral-600 text-sm whitespace-nowrap">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}{" "}
                  • {event.time}
                </td>
                <td className="py-4 px-6">
                  <StatusBadge status={event.status} />
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Edit
                    </Link>
                    <span className="text-neutral-300">|</span>
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    UPCOMING: "bg-orange-100 text-orange-700 border-orange-200",
    LIVE: "bg-red-100 text-red-700 border-red-200",
    CURRENT: "bg-blue-100 text-blue-700 border-blue-200",
    COMPLETED: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border whitespace-nowrap ${
        styles[status as keyof typeof styles] || "bg-neutral-100 text-neutral-700 border-neutral-200"
      }`}
    >
      {status}
    </span>
  );
}
