// app/admin/(protected)/events/new/NewEventForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Save, X } from "lucide-react";

export default function NewEventForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    type: "OTHER",
    status: "UPCOMING",
    access: "OPEN",
    meetLink: "",
    registrationLink: "",
    eventDocLink: "",
    coverImageLink: "",
  });

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await fetch("/api/admin/events", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("Failed to create event");
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
              required
              placeholder="Enter event name"
              className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </FormField>

          <FormField label="Description" required>
            <textarea
              required
              placeholder="Describe your event"
              className="form-input min-h-30 resize-y w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
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
                required
                className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
              />
            </FormField>

            <FormField label="Time" required>
              <input
                required
                placeholder="e.g. 6:30 PM"
                className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
              />
            </FormField>
          </div>

          <FormField label="Venue" required>
            <input
              required
              placeholder="Enter venue location"
              className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
              value={form.venue}
              onChange={(e) => update("venue", e.target.value)}
            />
          </FormField>
        </div>

        {/* Event Configuration */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 pb-2 border-b-2 border-neutral-300">Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Event Type" required>
              <select
                aria-label="Event type"
                className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
              >
                <option value="DISCUSSION">Discussion</option>
                <option value="DEBATE">Debate</option>
                <option value="OFF_THE_BEAT">Off The Beat</option>
                <option value="GROUP_DISCUSSION">Group Discussion</option>
                <option value="STORYTELLING">Storytelling</option>
                <option value="WORKSHOP">Workshop</option>
                <option value="OTHER">Other</option>
              </select>
            </FormField>

            <FormField label="Status" required>
              <select
                aria-label="Event status"
                className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
              >
                <option value="UPCOMING">Upcoming</option>
                <option value="CURRENT">Current</option>
                <option value="LIVE">Live</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </FormField>

            <FormField label="Access" required>
              <select
                aria-label="Event access "
                className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
                value={form.access}
                onChange={(e) => update("access", e.target.value)}
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
              placeholder="https://meet.google.com/..."
              className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
              value={form.meetLink}
              onChange={(e) => update("meetLink", e.target.value)}
            />
          </FormField>

          <FormField label="Registration Link">
            <input
              placeholder="https://forms.google.com/..."
              className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
              value={form.registrationLink}
              onChange={(e) => update("registrationLink", e.target.value)}
            />
          </FormField>

          <FormField label="Event Document Link">
            <input
              placeholder="https://docs.google.com/..."
              className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
              value={form.eventDocLink}
              onChange={(e) => update("eventDocLink", e.target.value)}
            />
          </FormField>

          <FormField label="Cover Image URL">
            <input
              placeholder="https://example.com/image.jpg"
              className="form-input w-full bg-white border-2 border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-900 
            placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition-all"
              value={form.coverImageLink}
              onChange={(e) => update("coverImageLink", e.target.value)}
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
                Creating...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Create Event
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
