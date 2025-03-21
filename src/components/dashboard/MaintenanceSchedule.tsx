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
import { CalendarIcon, CheckSquare, InfoIcon } from "lucide-react";

export function MaintenanceSchedule() {
  const maintenanceItems = [
    {
      id: "M001",
      assetId: "A050",
      assetName: "Dell PowerEdge R740",
      type: "Server Maintenance",
      date: "Mar 25, 2025",
      status: "Scheduled",
      assignedTo: "IT Support Team",
      daysUntil: 4,
    },
    {
      id: "M002",
      assetId: "A065",
      assetName: "Cargo Van",
      type: "Vehicle Maintenance",
      date: "Mar 28, 2025",
      status: "Scheduled",
      assignedTo: "Facilities Dept",
      daysUntil: 7,
    },
    {
      id: "M003",
      assetId: "A043",
      assetName: "Air Conditioning Unit",
      type: "HVAC Maintenance",
      date: "Apr 02, 2025",
      status: "Scheduled",
      assignedTo: "Facilities Dept",
      daysUntil: 12,
    },
    {
      id: "M004",
      assetId: "A048",
      assetName: "Network Switch",
      type: "IT Maintenance",
      date: "Apr 05, 2025",
      status: "Scheduled",
      assignedTo: "IT Support Team",
      daysUntil: 15,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>Upcoming Maintenance</CardTitle>
          <CardDescription>
            Scheduled maintenance for your assets
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
          <CalendarIcon className="mr-2 h-4 w-4" />
          View Calendar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {maintenanceItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-3 rounded-lg border bg-zinc-50 dark:bg-zinc-900"
            >
              <div className={`p-2 rounded-full ${item.daysUntil <= 7 ? "bg-amber-100" : "bg-blue-100"}`}>
                {item.daysUntil <= 7 ? (
                  <InfoIcon className="h-5 w-5 text-amber-600" />
                ) : (
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.assetName}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {item.type} - {item.date}
                    </p>
                  </div>
                  <Badge variant="outline" className="h-fit">
                    {item.daysUntil} days
                  </Badge>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Assigned to: {item.assignedTo}
                  </p>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <CheckSquare className="h-4 w-4 mr-1" />
                    <span className="text-xs">Complete</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {maintenanceItems.length === 0 && (
          <div className="text-center py-6 text-zinc-500 dark:text-zinc-400">
            No upcoming maintenance scheduled
          </div>
        )}
      </CardContent>
    </Card>
  );
}
