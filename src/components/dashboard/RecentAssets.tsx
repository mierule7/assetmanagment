"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EyeIcon, ChevronDown, ChevronUp, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import Link from "next/link";

type Asset = {
  id: string;
  name: string;
  category: string;
  status: string;
  location: string;
  assignedTo: string;
  lastUpdated: string;
}

export function RecentAssets() {
  const [assets] = useState<Asset[]>([
    {
      id: "A037",
      name: "Dell XPS 15",
      category: "Laptop",
      status: "Active",
      location: "Main Office",
      assignedTo: "John Smith",
      lastUpdated: "Today at 10:45 AM",
    },
    {
      id: "A036",
      name: "HP LaserJet Pro",
      category: "Printer",
      status: "Active",
      location: "Marketing Dept",
      assignedTo: "-",
      lastUpdated: "Yesterday at 3:22 PM",
    },
    {
      id: "A050",
      name: "Dell PowerEdge R740",
      category: "Server",
      status: "Maintenance",
      location: "Server Room",
      assignedTo: "-",
      lastUpdated: "Mar 19, 2025",
    },
    {
      id: "A049",
      name: "MacBook Pro M2",
      category: "Laptop",
      status: "Checked Out",
      location: "-",
      assignedTo: "Sarah Johnson",
      lastUpdated: "Mar 18, 2025",
    },
    {
      id: "A048",
      name: "iPad Pro 12.9\"",
      category: "Tablet",
      status: "Active",
      location: "Sales Dept",
      assignedTo: "Mike Wilson",
      lastUpdated: "Mar 17, 2025",
    },
  ]);

  // For search and filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // For sorting
  const [sortField, setSortField] = useState<keyof Asset>("lastUpdated");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Sorting and filtering
  const filteredAndSortedAssets = useMemo(() => {
    let filtered = [...assets];

    // Apply search query across multiple fields
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        asset =>
          asset.id.toLowerCase().includes(query) ||
          asset.name.toLowerCase().includes(query) ||
          asset.category.toLowerCase().includes(query) ||
          asset.location.toLowerCase().includes(query) ||
          asset.assignedTo.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(asset => asset.status === statusFilter);
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(asset => asset.category === categoryFilter);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [assets, searchQuery, statusFilter, categoryFilter, sortField, sortDirection]);

  // Category and status option sets
  const categories = useMemo(() => {
    const set = new Set(assets.map(asset => asset.category));
    return Array.from(set);
  }, [assets]);

  const statuses = useMemo(() => {
    const set = new Set(assets.map(asset => asset.status));
    return Array.from(set);
  }, [assets]);

  // Sort handler
  const handleSort = (field: keyof Asset) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

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

  // Helper for sort icons
  const getSortIcon = (field: keyof Asset) => {
    if (field !== sortField) return null;
    return sortDirection === "asc" ?
      <ChevronUp className="h-4 w-4 ml-1" /> :
      <ChevronDown className="h-4 w-4 ml-1" />;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div>
          <CardTitle>Recent Assets</CardTitle>
          <CardDescription>
            Recently updated and active assets
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="ml-auto">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <Input
              type="search"
              placeholder="Search assets..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-1 gap-2">
            <div className="flex-1">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    Asset ID
                    {getSortIcon("id")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name
                    {getSortIcon("name")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("category")}
                >
                  <div className="flex items-center">
                    Category
                    {getSortIcon("category")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {getSortIcon("status")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("location")}
                >
                  <div className="flex items-center">
                    Location
                    {getSortIcon("location")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("assignedTo")}
                >
                  <div className="flex items-center">
                    Assigned To
                    {getSortIcon("assignedTo")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("lastUpdated")}
                >
                  <div className="flex items-center">
                    Last Updated
                    {getSortIcon("lastUpdated")}
                  </div>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedAssets.length > 0 ? (
                filteredAndSortedAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.id}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.category}</TableCell>
                    <TableCell>{getStatusBadge(asset.status)}</TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>{asset.assignedTo}</TableCell>
                    <TableCell className="text-zinc-500 text-sm">
                      {asset.lastUpdated}
                    </TableCell>
                    <TableCell>
                      <Link href={`/assets/${asset.id}`}>
                        <Button variant="ghost" size="icon">
                          <EyeIcon className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No assets match your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
