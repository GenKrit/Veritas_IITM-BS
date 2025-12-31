// components/admin/dashboard/QuickStatsBar.tsx
type QuickStatsProps = {
  stats: {
    total: number;
    upcoming: number;
    live: number;
    pendingAdmins: number;
    teamCount: number;
  };
};

export default function QuickStatsBar({ stats }: QuickStatsProps) {
  return (
    <div className="bg-neutral-900 text-white rounded-lg p-6 shadow-lg">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        <QuickStat label="Total Events" value={stats.total} />
        <QuickStat label="Upcoming" value={stats.upcoming} />
        <QuickStat label="Live Now" value={stats.live} highlight />
        <QuickStat label="Pending Admins" value={stats.pendingAdmins} />
        <QuickStat label="Team Size" value={stats.teamCount} />
      </div>
    </div>
  );
}

function QuickStat({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="text-center">
      <p className={`text-3xl font-bold mb-1 ${highlight ? 'text-orange-500' : 'text-white'}`}>
        {value}
      </p>
      <p className="text-sm text-neutral-400">{label}</p>
    </div>
  );
}
