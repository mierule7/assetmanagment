"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangleIcon, BellIcon, BellRingIcon, InboxIcon } from "lucide-react";

export function RecentAlerts() {
  const alerts = [
    {
      id: "AL001",
      title: "Maintenance Due",
      message: "Server maintenance scheduled for Dell PowerEdge R740",
      time: "1 hour ago",
      type: "maintenance",
      read: false,
    },
    {
      id: "AL002",
      title: "License Expiring",
      message: "Software license for Adobe Creative Cloud expiring in 7 days",
      time: "2 hours ago",
      type: "warning",
      read: false,
    },
    {
      id: "AL003",
      title: "Asset Checked Out",
      message: "MacBook Pro checked out by Sarah Johnson",
      time: "Yesterday",
      type: "info",
      read: true,
    },
    {
      id: "AL004",
      title: "Warranty Expiring",
      message: "Warranty for 3 laptop computers expiring next month",
      time: "2 days ago",
      type: "warning",
      read: true,
    },
  ];

  function getAlertIcon(type: string, read: boolean) {
    const className = `h-5 w-5 ${read ? "text-zinc-400" : ""}`;

    switch (type) {
      case "maintenance":
        return <BellRingIcon className={`${className} ${!read ? "text-blue-600" : ""}`} />;
      case "warning":
        return <AlertTriangleIcon className={`${className} ${!read ? "text-amber-600" : ""}`} />;
      case "info":
        return <InboxIcon className={`${className} ${!read ? "text-green-600" : ""}`} />;
      default:
        return <BellIcon className={className} />;
    }
  }

  function getAlertBadge(type: string) {
    switch (type) {
      case "maintenance":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Maintenance</Badge>;
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Warning</Badge>;
      case "info":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Info</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Notifications and maintenance alerts</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
          View All Alerts
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${
                alert.read ? "bg-white dark:bg-zinc-950" : "bg-blue-50 dark:bg-zinc-900"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${alert.read ? "bg-zinc-100" : "bg-white"}`}>
                  {getAlertIcon(alert.type, alert.read)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`font-medium ${!alert.read ? "" : "text-zinc-500"}`}>
                        {alert.title}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {alert.message}
                      </p>
                    </div>
                    {getAlertBadge(alert.type)}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {alert.time}
                    </p>
                    {!alert.read && (
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <span className="text-xs">Mark as Read</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
