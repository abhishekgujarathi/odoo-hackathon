import { useEffect, useState } from "react";

import { Plus, Search, Building2, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

import { vendorApi, type Vendor } from "@/api/vendorApi";

const statusLabels: Record<number, string> = {
  0: "Pending",
  1: "Active",
  2: "Approved",
  3: "Blocked",
  4: "Rejected",
};

const statusVariants: Record<number, "default" | "secondary" | "destructive" | "outline"> = {
  0: "secondary",
  1: "default",
  2: "default",
  3: "destructive",
  4: "destructive",
};

export default function VendorsPage() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const data = await vendorApi.getAll();
      setVendors(data);
    } catch (err) {
      console.error("Failed to load vendors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete vendor "${name}"?`)) {
      try {
        await vendorApi.delete(id);
        setVendors((prev) => prev.filter((v) => v.id !== id));
      } catch (err: any) {
        console.error("Failed to delete vendor:", err);
        alert(err.message || "Failed to delete vendor");
      }
    }
  };

  // Filter logic
  const filteredVendors = vendors.filter((v) => {
    const matchesSearch =
      v.companyName.toLowerCase().includes(search.toLowerCase()) ||
      v.email.toLowerCase().includes(search.toLowerCase()) ||
      (v.gstNumber?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      (v.categoryName?.toLowerCase().includes(search.toLowerCase()) ?? false);

    if (activeFilter === "All") return matchesSearch;
    const statusLabel = statusLabels[v.status] || "";
    return matchesSearch && statusLabel === activeFilter;
  });

  // Reset pagination when search, filter, or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeFilter, itemsPerPage]);

  // Pagination logic
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const paginatedVendors = filteredVendors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Status counts
  const statusCounts = vendors.reduce(
    (acc, v) => {
      const label = statusLabels[v.status] || "Unknown";
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
          <p className="text-muted-foreground mt-1">
            Manage supplier profiles and registrations
          </p>
        </div>
        <Button onClick={() => navigate("/vendors/add")} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Search by vendor name, GST number, category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 flex-wrap">
        <Badge
          variant={activeFilter === "All" ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setActiveFilter("All")}
        >
          All ({vendors.length})
        </Badge>

        {Object.entries(statusCounts).map(([label, count]) => (
          <Badge
            key={label}
            variant={activeFilter === label ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveFilter(label)}
          >
            {label} ({count})
          </Badge>
        ))}
      </div>

      {/* Vendor Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Vendor Directory</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              Loading vendors...
            </div>
          ) : filteredVendors.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              {search
                ? "No vendors match your search."
                : "No vendors found. Click 'Add Vendor' to get started."}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="font-semibold">Vendor Code</TableHead>
                  <TableHead className="font-semibold">Company Name</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">GST Number</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedVendors.map((vendor) => (
                  <TableRow key={vendor.id} className="hover:bg-muted/20">
                    <TableCell className="font-mono text-sm">
                      {vendor.vendorCode}
                    </TableCell>
                    <TableCell className="font-medium">
                      {vendor.companyName}
                    </TableCell>
                    <TableCell>{vendor.categoryName || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {vendor.email}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {vendor.gstNumber || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariants[vendor.status] || "outline"}>
                        {statusLabels[vendor.status] || "Unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          title="Edit Vendor"
                          onClick={() => navigate(`/vendors/${vendor.id}/edit`)}
                        >
                          <Pencil className="h-4 w-4 text-primary" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          title="Delete Vendor"
                          onClick={() => handleDelete(vendor.id, vendor.companyName)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Pagination Controls */}
          {filteredVendors.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <p>
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredVendors.length)} of{" "}
                  {filteredVendors.length} vendors
                </p>
                <div className="flex items-center gap-2 border-l pl-4">
                  <span>Rows per page</span>
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(val) => setItemsPerPage(Number(val))}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
