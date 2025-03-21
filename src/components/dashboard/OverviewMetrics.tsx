"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BanknoteIcon,
  BarChartIcon,
  Package2Icon,
  ShieldCheckIcon,
  TagIcon,
} from "lucide-react";

export function OverviewMetrics() {
  const metrics = [
    {
      title: "Total Assets",
      value: "143",
      icon: <Package2Icon className="h-5 w-5 text-blue-600" />,
      trend: "+3.6%",
      trendDirection: "up",
      description: "from last month",
    },
    {
      title: "Asset Value",
      value: "$124,934.12",
      icon: <BanknoteIcon className="h-5 w-5 text-green-600" />,
      trend: "+2.8%",
      trendDirection: "up",
      description: "from last month",
    },
    {
      title: "Assets Checked Out",
      value: "8",
      icon: <TagIcon className="h-5 w-5 text-amber-600" />,
      trend: "0%",
      trendDirection: "neutral",
      description: "from last week",
    },
    {
      title: "Maintenance Due",
      value: "2",
      icon: <ShieldCheckIcon className="h-5 w-5 text-red-600" />,
      trend: "-25%",
      trendDirection: "down",
      description: "from last month",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between py-4">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            {metric.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              <span
                className={`inline-flex mr-1 ${
                  metric.trendDirection === "up"
                    ? "text-green-600"
                    : metric.trendDirection === "down"
                    ? "text-red-600"
                    : "text-zinc-600"
                }`}
              >
                {metric.trend}
              </span>
              <span>{metric.description}</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
