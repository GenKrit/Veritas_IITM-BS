// components/admin/dashboard/NotificationsSection.tsx
import { AlertTriangle, Info } from "lucide-react";

type Notification = {
  type: "warning" | "info" | "error";
  message: string;
};

export default function NotificationsSection({
  notifications,
}: {
  notifications: Notification[];
}) {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-neutral-900 mb-4">High Priority Notifications</h2>

      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <NotificationAlert key={index} notification={notification} />
        ))}
      </div>
    </div>
  );
}

function NotificationAlert({ notification }: { notification: Notification }) {
  const styles = {
    warning: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      icon: "text-orange-600",
      text: "text-orange-900",
      Icon: AlertTriangle,
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "text-blue-600",
      text: "text-blue-900",
      Icon: Info,
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "text-red-600",
      text: "text-red-900",
      Icon: AlertTriangle,
    },
  };

  const style = styles[notification.type];
  const Icon = style.Icon;

  return (
    <div className={`flex items-start gap-3 ${style.bg} border ${style.border} px-4 py-3 rounded-lg`}>
      <Icon className={`h-5 w-5 ${style.icon} shrink-0 mt-0.5`} />
      <span className={`font-medium text-sm ${style.text}`}>{notification.message}</span>
    </div>
  );
}
