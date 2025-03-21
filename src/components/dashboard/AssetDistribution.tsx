"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export function AssetDistribution() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Data for Location distribution chart
  const locationData = {
    labels: ["Main Office", "Marketing Dept", "Sales Dept", "Server Room", "Remote"],
    datasets: [
      {
        label: "Assets by Location",
        data: [65, 23, 18, 12, 25],
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for Category distribution chart
  const categoryData = {
    labels: ["Laptops", "Desktops", "Servers", "Tablets", "Printers", "Other"],
    datasets: [
      {
        label: "Assets by Category",
        data: [42, 31, 12, 15, 8, 35],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const statusData = {
    labels: ["Active", "Checked Out", "Maintenance", "Retired", "Storage"],
    datasets: [
      {
        label: "Assets by Status",
        data: [98, 8, 12, 15, 10],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data for value by department
  const valueData = {
    labels: ["IT", "Marketing", "Sales", "Operations", "Admin"],
    datasets: [
      {
        label: "Asset Value by Department",
        data: [48250, 23700, 18450, 19600, 14934],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!mounted) {
    return null;
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Asset Distribution</CardTitle>
        <CardDescription>View your assets by various categories</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="category">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="location">By Location</TabsTrigger>
            <TabsTrigger value="status">By Status</TabsTrigger>
            <TabsTrigger value="value">By Value</TabsTrigger>
          </TabsList>
          <div className="h-80 mt-4">
            <TabsContent value="category" className="h-full">
              <Doughnut data={categoryData} options={options} />
            </TabsContent>
            <TabsContent value="location" className="h-full">
              <Doughnut data={locationData} options={options} />
            </TabsContent>
            <TabsContent value="status" className="h-full">
              <Doughnut data={statusData} options={options} />
            </TabsContent>
            <TabsContent value="value" className="h-full">
              <Bar data={valueData} options={barOptions} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
