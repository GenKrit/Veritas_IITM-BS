// components/admin/dashboard/StatsSection.tsx
"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import UpdateMemberCountModal from "./UpdateMemberCountModal";

type StatsProps = {
  stats: {
    societyMemberCount: number;
    lastUpdated: Date;
    teamCount: number;
    totalEvents: number;
    totalAdmins: number;
  };
  canEdit: boolean;
};

export default function StatsSection({ stats, canEdit }: StatsProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Society Members" 
          value={stats.societyMemberCount}
          large
        />
        <StatCard 
          label="Team Members" 
          value={stats.teamCount}
        />
        <StatCard 
          label="Total Events" 
          value={stats.totalEvents}
        />
        <StatCard 
          label="Total Admins" 
          value={stats.totalAdmins}
        />
      </div>

      {canEdit && (
        <div className="mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors shadow-sm"
          >
            <span>Update Member Count</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {showModal && (
        <UpdateMemberCountModal
          currentCount={stats.societyMemberCount}
          lastUpdated={stats.lastUpdated}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

function StatCard({ label, value, large = false }: { label: string; value: number; large?: boolean }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-neutral-500 mb-3">{label}</p>
      <p className={`font-bold text-neutral-900 ${large ? 'text-4xl' : 'text-3xl'}`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}
