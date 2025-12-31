// // veritas-website\app\admin\(protected)\events\[id]\edit\EditEventForm.tsx

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function EditEventForm({ event }: { event: any }) {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: event.name,
//     description: event.description,
//     venue: event.venue,
//     // date: event.date.slice(0, 10),
//     date: event.date ? new Date(event.date).toISOString().slice(0, 10) : "",
//     time: event.time,
//     status: event.status,
//     type: event.type,
//     access: event.access,
//     meetLink: event.meetLink ?? "",
//     registrationLink: event.registrationLink ?? "",
//     eventDocLink: event.eventDocLink ?? "",
//     coverImageLink: event.coverImageLink ?? "",
//   });

//   function update(key: string, value: string) {
//     setForm((f) => ({ ...f, [key]: value }));
//   }

//   async function onSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     const res = await fetch(`/api/admin/events/${event.id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     if (!res.ok) {
//       alert("Failed to update event");
//       return;
//     }

//     router.push("/admin/events");
//     router.refresh();
//   }

//   return (
//     <form onSubmit={onSubmit} className="space-y-4">
//       <input
//         value={form.name}
//         onChange={(e) => update("name", e.target.value)}
//         className="input"
//         placeholder="Event name"
//         required
//       />

//       <textarea
//         value={form.description}
//         onChange={(e) => update("description", e.target.value)}
//         className="input"
//         placeholder="Description"
//       />

//       <input
//         aria-label="date"
//         type="date"
//         value={form.date}
//         onChange={(e) => update("date", e.target.value)}
//         required
//       />

//       <input
//         value={form.time}
//         onChange={(e) => update("time", e.target.value)}
//         placeholder="Time"
//         required
//       />

//       <input
//         value={form.venue}
//         onChange={(e) => update("venue", e.target.value)}
//         placeholder="Venue"
//         required
//       />

//       {/* STATUS */}
//       <select
//        aria-label="Event status"
//         value={form.status}
//         onChange={(e) => update("status", e.target.value)}
//       >
//         <option value="UPCOMING">Upcoming</option>
//         <option value="CURRENT">Current</option>
//         <option value="LIVE">Live</option>
//         <option value="COMPLETED">Completed</option>
//       </select>

//       {/* TYPE */}
//       <select
//        aria-label="Type of event"
//         value={form.type}
//         onChange={(e) => update("type", e.target.value)}
//       >
//         <option value="DISCUSSION">DISCUSSION</option>
//         <option value="DEBATE">DEBATE</option>
//         <option value="OFF_THE_BEAT">OFF THE BEAT</option>
//         <option value="GROUP_DISCUSSION">GROUP DISCUSSION</option>
//         <option value="STORYTELLING">STORY TELLING</option>
//         <option value="WORKSHOP">WORKSHOP</option>
//         <option value="OTHER">OTHER</option>
//         {/* <option value="NULL"> </option> */}
//       </select>

//       {/* ACCESS */}
//       <select
//        aria-label="Event access"
//         value={form.access}
//         onChange={(e) => update("access", e.target.value)}
//       >
//         <option value="OPEN">Open</option>
//         <option value="REGISTRATION">Registration</option>
//         <option value="TBD">TBD</option>
//       </select>

//       <input
//         value={form.meetLink}
//         onChange={(e) => update("meetLink", e.target.value)}
//         placeholder="Meet link (optional)"
//       />

//       <input
//         value={form.registrationLink}
//         onChange={(e) => update("registrationLink", e.target.value)}
//         placeholder="Registration link (optional)"
//       />

//       <input
//         value={form.eventDocLink}
//         onChange={(e) => update("eventDocLink", e.target.value)}
//         placeholder="Event document link (optional)"
//       />

//       <input
//         value={form.coverImageLink}
//         onChange={(e) => update("coverImageLink", e.target.value)}
//         placeholder="Cover image URL (optional)"
//       />


//       <button type="submit" className="bg-white text-black px-4 py-2 rounded">
//         Save Changes
//       </button>
      
//       <button
//       type="button"
//       onClick={() => router.push("/admin/events")}
//       className="border border-gray-600 px-4 py-2 rounded text-gray-300">
//       Cancel
//       </button>
//     </form>
//   );
// }

// app/admin/(protected)/events/[id]/edit/EditEventForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X } from "lucide-react";

export default function EditEventForm({ event }: { event: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: event.name,
    description: event.description,
    venue: event.venue,
    date: event.date ? new Date(event.date).toISOString().slice(0, 10) : "",
    time: event.time,
    status: event.status,
    type: event.type,
    access: event.access,
    meetLink: event.meetLink ?? "",
    registrationLink: event.registrationLink ?? "",
    eventDocLink: event.eventDocLink ?? "",
    coverImageLink: event.coverImageLink ?? "",
  });

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/admin/events/${event.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Failed to update event");
      setLoading(false);
      return;
    }

    router.push("/admin/events");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border-2 border-neutral-400 rounded-xl p-8 shadow-md">
      <div className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 pb-2 border-b-2 border-neutral-300">Basic Information</h2>
          
          <FormField label="Event Name" required>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
              placeholder="Event name"
              required
            />
          </FormField>

          <FormField label="Description" required>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="form-input min-h-30 resize-y w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
              placeholder="Description"
              required
            />
          </FormField>
        </div>

        {/* Date & Time */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 pb-2 border-b-2 border-neutral-300">Date & Time</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Date" required>
              <input
                aria-label="date"
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                required
              />
            </FormField>

            <FormField label="Time" required>
              <input
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
                placeholder="Time"
                className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                required
              />
            </FormField>
          </div>

          <FormField label="Venue" required>
            <input
              value={form.venue}
              onChange={(e) => update("venue", e.target.value)}
              placeholder="Venue"
              className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
              required
            />
          </FormField>
        </div>

        {/* Configuration */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 pb-2 border-b-2 border-neutral-300">Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Event Type" required>
              <select
                aria-label="Type of event"
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
                className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
              >
                <option value="DISCUSSION">DISCUSSION</option>
                <option value="DEBATE">DEBATE</option>
                <option value="OFF_THE_BEAT">OFF THE BEAT</option>
                <option value="GROUP_DISCUSSION">GROUP DISCUSSION</option>
                <option value="STORYTELLING">STORY TELLING</option>
                <option value="WORKSHOP">WORKSHOP</option>
                <option value="OTHER">OTHER</option>
              </select>
            </FormField>

            <FormField label="Status" required>
              <select
                aria-label="Event status"
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="CURRENT">Current</option>
                <option value="LIVE">Live</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </FormField>

            <FormField label="Access" required>
              <select
                aria-label="Event access"
                value={form.access}
                onChange={(e) => update("access", e.target.value)}
                className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
              >
                <option value="OPEN">Open</option>
                <option value="REGISTRATION">Registration</option>
                <option value="TBD">TBD</option>
              </select>
            </FormField>
          </div>
        </div>

        {/* Optional Links */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 pb-2 border-b-2 border-neutral-300">Optional Links</h2>
          
          <FormField label="Meet Link">
            <input
              value={form.meetLink}
              onChange={(e) => update("meetLink", e.target.value)}
              placeholder="Meet link (optional)"
              className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
            />
          </FormField>

          <FormField label="Registration Link">
            <input
              value={form.registrationLink}
              onChange={(e) => update("registrationLink", e.target.value)}
              placeholder="Registration link (optional)"
              className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
            />
          </FormField>

          <FormField label="Event Document Link">
            <input
              value={form.eventDocLink}
              onChange={(e) => update("eventDocLink", e.target.value)}
              placeholder="Event document link (optional)"
              className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
            />
          </FormField>

          <FormField label="Cover Image URL">
            <input
              value={form.coverImageLink}
              onChange={(e) => update("coverImageLink", e.target.value)}
              placeholder="Cover image URL (optional)"
              className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
            />
          </FormField>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t-2 border-neutral-300">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/events")}
            disabled={loading}
            className="px-6 py-3 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 font-semibold transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

function FormField({ 
  label, 
  required = false, 
  children 
}: { 
  label: string; 
  required?: boolean; 
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-neutral-700 mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
