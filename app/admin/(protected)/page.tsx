// app/admin/(protected)/page.tsx
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { prisma } from "@/db/client";
import { canApproveAdmins } from "@/lib/auth/permissions";
import StatsSection from "@/components/admin/dashboard/StatsSection";
import QuickStatsBar from "@/components/admin/dashboard/QuickStatsBar";
import NotificationsSection from "@/components/admin/dashboard/NotificationsSection";
import ApprovalsSection from "@/components/admin/dashboard/ApprovalsSection";
import EventsPreview from "@/components/admin/dashboard/EventsPreview";
import Link from "next/link";
import DashboardFooter from "@/components/admin/dashboard/DashboardFooter";

export default async function AdminDashboard() {
  const admin = await requireAdmin();

  // Fetch all stats
  const [
    siteStats,
    teamCount,
    totalEvents,
    totalAdmins,
    upcomingEvents,
    liveEvents,
    completedEvents,
    pendingAdmins,
    approvedAdmins,
    recentEvents,
    eventsMissingLinks,
    activeEvents,
  ] = await Promise.all([
    prisma.siteStats.findFirst(),
    prisma.teamMember.count(),
    prisma.event.count(),
    prisma.adminUser.count(),
    prisma.event.count({ where: { status: "UPCOMING" } }),
    prisma.event.count({ where: { status: "LIVE" } }),
    prisma.event.count({ where: { status: "COMPLETED" } }),
    prisma.adminUser.count({ where: { isApproved: false } }),
    prisma.adminUser.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: "desc" },
      take: 3,
    }),
    prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { createdBy: true },
    }),
    prisma.event.findMany({
      where: {
        access: "REGISTRATION",
        registrationLink: null,
        status: { in: ["UPCOMING", "LIVE", "CURRENT"] },
      },
    }),
    prisma.event.findMany({
      where: {
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        status: { in: ["UPCOMING", "LIVE", "CURRENT"] },
      },
    }),
  ]);

  const pendingAdminsList = await prisma.adminUser.findMany({
    where: { isApproved: false },
    orderBy: { createdAt: "desc" },
  });

  // Calculate notifications
  const notifications: Array<{ type: "info" | "error" | "warning"; message: string }> = [];
  
  if (pendingAdmins > 0 && canApproveAdmins(admin)) {
    notifications.push({
      type: "warning",
      message: `${pendingAdmins} admin${pendingAdmins > 1 ? "s" : ""} awaiting approval`,
    });
  }

  activeEvents.forEach((event) => {
    if (event.status === "UPCOMING") {
      notifications.push({
        type: "info",
        message: `Event "${event.name}" starts today but status is UPCOMING`,
      });
    }
  });

  if (eventsMissingLinks.length > 0) {
    notifications.push({
      type: "warning",
      message: `${eventsMissingLinks.length} event${eventsMissingLinks.length > 1 ? "s" : ""} missing registration links`,
    });
  }

  const stats = {
    societyMemberCount: siteStats?.societyMemberCount || 0,
    lastUpdated: siteStats?.updatedAt || new Date(),
    teamCount,
    totalEvents,
    totalAdmins,
  };

  const quickStats = {
    total: totalEvents,
    upcoming: upcomingEvents,
    live: liveEvents,
    pendingAdmins,
    teamCount,
  };

  const canEdit = canApproveAdmins(admin);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header Section */}
      <div className="bg-white border-b border-neutral-200">
        <div className="px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            {/* Title with online indicator */}
            <div>
              <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">
                {admin.role.replace(/_/g, " ")}
              </p>
              <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
            </div>

            {/* User Badge */}
            <Link href="/admin/profile"
            className="group relative block overflow-hidden rounded-[10px] p-px transition-all duration-500 hover:p-px hover:shadow-lg bg-neutral-200 hover:bg-linear-to-r 
            hover:from-blue-600 hover:via-orange-500 hover:to-purple-600 bg-size-[200%_auto] bg-left hover:bg-right">
            <div className="flex items-center gap-4 px-5 py-3 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-neutral-900 transition-colors duration-200">
              <div className="relative">
                <div className="h-11 w-11 rounded-full bg-linear-to-br from-neutral-700 to-neutral-900 flex items-center justify-center">
                  <span className="text-white font-bold text-base">
                    {admin.name.split(" ")[0].charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  {admin.name.split(" ")[0]}
                </p>
                <p className="text-xs text-neutral-600">{admin.email}</p>
              </div>
              <RoleBadge role={admin.role} />
            </div>
            </Link>
          </div>

          <StatsSection stats={stats} canEdit={canEdit} />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 lg:px-8 py-8 space-y-6">
        <QuickStatsBar stats={quickStats} />

        {notifications.length > 0 && (
          <NotificationsSection notifications={notifications} />
        )}

        {canEdit && (
          <ApprovalsSection
            pendingAdmins={pendingAdminsList}
            approvedAdmins={approvedAdmins}
            canEdit={canEdit}
          />
        )}

        <EventsPreview events={recentEvents} />

        <DashboardFooter />
      </div>
      
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const badgeMap = {
    SUPER_ADMIN: "/Super_Admin.png",
    DEPARTMENT_ADMIN: "/Department_Admin.png",
    CONTENT_ADMIN: "/Content_Admin.png",
  };

  return (
    <img
      src={badgeMap[role as keyof typeof badgeMap]}
      alt={role}
      className="h-14 w-14 object-contain"
    />
  );
}
