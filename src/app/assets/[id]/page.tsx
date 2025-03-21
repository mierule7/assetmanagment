"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Download,
  Edit,
  Folder,
  History,
  MapPin,
  Printer,
  Tag,
  Trash,
  User
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

// Asset data type
type AssetType = {
  id: string;
  name: string;
  category: string;
  status: string;
  location: string;
  assignedTo: string;
  description: string;
  serialNumber: string;
  purchaseDate: string;
  purchasePrice: string;
  warranty: {
    start: string;
    end: string;
  };
  maintenanceSchedule: {
    date: string;
    type: string;
    notes: string;
  }[];
  attachments: {
    name: string;
    type: string;
    date: string;
  }[];
  historyLog: {
    date: string;
    action: string;
    user: string;
    notes: string;
  }[];
  custom: {
    [key: string]: string;
  };
};

export default function AssetDetailPage() {
  const params = useParams();
  const assetId = params.id as string;
  const [asset, setAsset] = useState<AssetType | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock API call to get asset details
  useEffect(() => {
    // In a real app, this would be an API call
    const fakeApiCall = async () => {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock data for each asset
      const mockAssets: Record<string, AssetType> = {
        "A037": {
          id: "A037",
          name: "Dell XPS 15",
          category: "Laptop",
          status: "Active",
          location: "Main Office",
          assignedTo: "John Smith",
          description: "High-performance laptop for design and development work",
          serialNumber: "XPS15-78923-A",
          purchaseDate: "2024-09-15",
          purchasePrice: "$1,899.99",
          warranty: {
            start: "2024-09-15",
            end: "2026-09-15"
          },
          maintenanceSchedule: [
            {
              date: "2025-03-15",
              type: "Software Update",
              notes: "Update BIOS and drivers"
            }
          ],
          attachments: [
            {
              name: "Purchase Invoice",
              type: "PDF",
              date: "2024-09-15"
            },
            {
              name: "Warranty Card",
              type: "PDF",
              date: "2024-09-15"
            }
          ],
          historyLog: [
            {
              date: "2025-03-21",
              action: "Checked out",
              user: "John Smith",
              notes: "For client demo"
            },
            {
              date: "2025-03-18",
              action: "Maintenance completed",
              user: "IT Support",
              notes: "Software updates installed"
            },
            {
              date: "2024-09-16",
              action: "Asset added",
              user: "Admin",
              notes: "Initial asset record created"
            }
          ],
          custom: {
            "CPU": "Intel Core i9",
            "RAM": "32GB",
            "Storage": "1TB SSD",
            "Graphics": "NVIDIA RTX 3050"
          }
        },
        "A036": {
          id: "A036",
          name: "HP LaserJet Pro",
          category: "Printer",
          status: "Active",
          location: "Marketing Dept",
          assignedTo: "-",
          description: "Color laser printer for marketing materials",
          serialNumber: "HPLJ2022-12345",
          purchaseDate: "2024-08-10",
          purchasePrice: "$499.99",
          warranty: {
            start: "2024-08-10",
            end: "2025-08-10"
          },
          maintenanceSchedule: [
            {
              date: "2025-02-10",
              type: "Toner Replacement",
              notes: "Replace all toner cartridges"
            }
          ],
          attachments: [
            {
              name: "User Manual",
              type: "PDF",
              date: "2024-08-10"
            }
          ],
          historyLog: [
            {
              date: "2025-03-10",
              action: "Maintenance scheduled",
              user: "Admin",
              notes: "Scheduled for toner replacement"
            },
            {
              date: "2024-08-11",
              action: "Asset added",
              user: "Admin",
              notes: "Initial asset record created"
            }
          ],
          custom: {
            "Type": "Color Laser",
            "Print Speed": "25 ppm",
            "Connectivity": "Wi-Fi, Ethernet"
          }
        },
        "A050": {
          id: "A050",
          name: "Dell PowerEdge R740",
          category: "Server",
          status: "Maintenance",
          location: "Server Room",
          assignedTo: "-",
          description: "Primary database server for customer management system",
          serialNumber: "PE-R740-982763",
          purchaseDate: "2024-01-20",
          purchasePrice: "$5,899.99",
          warranty: {
            start: "2024-01-20",
            end: "2027-01-20"
          },
          maintenanceSchedule: [
            {
              date: "2025-03-25",
              type: "Hardware Maintenance",
              notes: "Memory upgrade and system check"
            },
            {
              date: "2025-06-20",
              type: "Software Update",
              notes: "OS patching and security updates"
            }
          ],
          attachments: [
            {
              name: "Server Configuration",
              type: "XLSX",
              date: "2024-01-25"
            },
            {
              name: "Warranty Extension",
              type: "PDF",
              date: "2024-02-10"
            }
          ],
          historyLog: [
            {
              date: "2025-03-20",
              action: "Maintenance scheduled",
              user: "IT Support",
              notes: "Scheduled for memory upgrade"
            },
            {
              date: "2024-07-15",
              action: "Software updated",
              user: "IT Support",
              notes: "Security patches installed"
            },
            {
              date: "2024-01-25",
              action: "Asset added",
              user: "Admin",
              notes: "Initial asset record created"
            }
          ],
          custom: {
            "CPU": "2x Intel Xeon Gold",
            "RAM": "128GB",
            "Storage": "16TB RAID",
            "OS": "Windows Server 2022"
          }
        },
        "A049": {
          id: "A049",
          name: "MacBook Pro M2",
          category: "Laptop",
          status: "Checked Out",
          location: "-",
          assignedTo: "Sarah Johnson",
          description: "M2 MacBook Pro for design team",
          serialNumber: "MBP-M2-293847",
          purchaseDate: "2024-06-05",
          purchasePrice: "$2,499.99",
          warranty: {
            start: "2024-06-05",
            end: "2025-06-05"
          },
          maintenanceSchedule: [
            {
              date: "2025-06-05",
              type: "Software Update",
              notes: "macOS update"
            }
          ],
          attachments: [
            {
              name: "Purchase Invoice",
              type: "PDF",
              date: "2024-06-05"
            }
          ],
          historyLog: [
            {
              date: "2025-03-15",
              action: "Checked out",
              user: "Sarah Johnson",
              notes: "For remote work"
            },
            {
              date: "2024-08-10",
              action: "Software updated",
              user: "IT Support",
              notes: "macOS patches"
            },
            {
              date: "2024-06-07",
              action: "Asset added",
              user: "Admin",
              notes: "Initial asset record created"
            }
          ],
          custom: {
            "CPU": "Apple M2 Pro",
            "RAM": "16GB",
            "Storage": "512GB SSD",
            "Display": "14-inch Retina"
          }
        },
        "A048": {
          id: "A048",
          name: "iPad Pro 12.9\"",
          category: "Tablet",
          status: "Active",
          location: "Sales Dept",
          assignedTo: "Mike Wilson",
          description: "iPad Pro for sales demos and presentations",
          serialNumber: "IPAD-12P-87634",
          purchaseDate: "2024-05-12",
          purchasePrice: "$1,299.99",
          warranty: {
            start: "2024-05-12",
            end: "2025-05-12"
          },
          maintenanceSchedule: [
            {
              date: "2025-05-12",
              type: "Software Update",
              notes: "iOS update"
            }
          ],
          attachments: [
            {
              name: "Purchase Invoice",
              type: "PDF",
              date: "2024-05-12"
            }
          ],
          historyLog: [
            {
              date: "2025-02-01",
              action: "Assigned to user",
              user: "Mike Wilson",
              notes: "For client presentations"
            },
            {
              date: "2024-09-15",
              action: "Software updated",
              user: "IT Support",
              notes: "iOS update"
            },
            {
              date: "2024-05-15",
              action: "Asset added",
              user: "Admin",
              notes: "Initial asset record created"
            }
          ],
          custom: {
            "Model": "iPad Pro 12.9\"",
            "Storage": "256GB",
            "Connectivity": "Wi-Fi + Cellular",
            "Accessories": "Apple Pencil, Smart Keyboard"
          }
        }
      };

      if (assetId in mockAssets) {
        setAsset(mockAssets[assetId]);
      }
      setLoading(false);
    };

    fakeApiCall();
  }, [assetId]);

  function getStatusBadge(status: string) {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
      case "Maintenance":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Maintenance</Badge>;
      case "Checked Out":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Checked Out</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="w-8 h-8 border-4 border-zinc-300 border-t-zinc-500 rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!asset) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center">
            <Link href="/" className="inline-flex items-center mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Asset Not Found</CardTitle>
              <CardDescription>The asset you're looking for doesn't exist or has been removed.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href="/">Return to Dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <Link href="/" className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">{asset.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-zinc-500 text-sm">ID: {asset.id}</span>
              <span className="text-zinc-300">•</span>
              <span className="text-zinc-500 text-sm">{asset.category}</span>
              <span className="text-zinc-300">•</span>
              {getStatusBadge(asset.status)}
            </div>
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Check className="mr-2 h-4 w-4" />
              Check Out
            </Button>
            <Button size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Asset Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 text-sm">
                    <span className="text-zinc-500">Serial Number</span>
                    <span className="col-span-2">{asset.serialNumber}</span>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <span className="text-zinc-500">Purchase Date</span>
                    <span className="col-span-2">{formatDate(asset.purchaseDate)}</span>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <span className="text-zinc-500">Purchase Price</span>
                    <span className="col-span-2">{asset.purchasePrice}</span>
                  </div>
                  <div className="grid grid-cols-3 text-sm">
                    <span className="text-zinc-500">Warranty</span>
                    <span className="col-span-2">
                      {formatDate(asset.warranty.start)} - {formatDate(asset.warranty.end)}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Location & Assignment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-2 text-zinc-500" />
                    <span className="text-sm font-medium">Current Location</span>
                  </div>
                  <div className="pl-6 text-sm">
                    {asset.location === '-' ? 'Not specified' : asset.location}
                  </div>

                  <div className="flex items-center mb-2 mt-6">
                    <User className="h-4 w-4 mr-2 text-zinc-500" />
                    <span className="text-sm font-medium">Assigned To</span>
                  </div>
                  <div className="pl-6 text-sm">
                    {asset.assignedTo === '-' ? 'Not assigned' : asset.assignedTo}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Custom Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(asset.custom).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 text-sm">
                        <span className="text-zinc-500">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  {asset.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-6">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Maintenance Schedule</h3>
              <Button size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Add Maintenance
              </Button>
            </div>

            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-zinc-50 dark:bg-zinc-800">
                      <th className="h-10 px-4 text-left align-middle font-medium">Date</th>
                      <th className="h-10 px-4 text-left align-middle font-medium">Type</th>
                      <th className="h-10 px-4 text-left align-middle font-medium">Notes</th>
                      <th className="h-10 px-4 text-left align-middle font-medium w-[100px]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {asset.maintenanceSchedule.length ? asset.maintenanceSchedule.map((maintenance, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-4 align-middle">{formatDate(maintenance.date)}</td>
                        <td className="p-4 align-middle">{maintenance.type}</td>
                        <td className="p-4 align-middle">{maintenance.notes}</td>
                        <td className="p-4 align-middle">
                          {new Date(maintenance.date) > new Date() ? (
                            <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          )}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-zinc-500">
                          No maintenance events scheduled
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          {/* Attachments Tab */}
          <TabsContent value="attachments" className="space-y-6">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Documents & Attachments</h3>
              <Button size="sm">
                <Folder className="mr-2 h-4 w-4" />
                Add Attachment
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {asset.attachments.length ? asset.attachments.map((attachment, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="p-2 mr-4 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                        <Folder className="h-8 w-8 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">{attachment.name}</h4>
                        <p className="text-xs text-zinc-500">{attachment.type} • {formatDate(attachment.date)}</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4 gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <Card className="col-span-full">
                  <CardContent className="p-6 text-center text-zinc-500">
                    <p>No attachments have been added to this asset</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Activity History</h3>
            </div>

            <div className="border rounded-md p-4">
              <div className="relative pl-6 border-l border-zinc-200 dark:border-zinc-700 space-y-8">
                {asset.historyLog.map((log, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[24px] p-1 bg-white dark:bg-zinc-900 rounded-full border border-zinc-200 dark:border-zinc-700">
                      <History className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="mb-1 flex items-center justify-between">
                      <h4 className="font-medium">{log.action}</h4>
                      <div className="flex items-center text-sm text-zinc-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <time>{formatDate(log.date)}</time>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-500">
                      By: {log.user}
                    </p>
                    {log.notes && (
                      <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                        {log.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
