import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

const vendors = [
  {
    id: 1,
    name: "Infra Supplies Pvt Ltd",
    category: "Construction",
    gst: "27AABCS1924B2Z0",
    contact: "9876543210",
    status: "Active",
  },

  {
    id: 2,
    name: "Tech Core LTD",
    category: "IT",
    gst: "27AABCS1924B2Z1",
    contact: "9876543211",
    status: "Active",
  },

  {
    id: 3,
    name: "FastLog Transport",
    category: "Logistics",
    gst: "27AABCS1924B2Z2",
    contact: "9876543212",
    status: "Blocked",
  },
];

export default function VendorsPage() {


  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Vendors</h1>

          <p className="text-muted-foreground">
            Manage supplier profiles and registrations
          </p>
        </div>
        <div>
          <Button onClick={() => navigate("/vendors/add")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
        </div>
      </div>

      {/* Search */}

      <Input placeholder="Search by vendor name, GST number, category..." />

      {/* Status Tabs */}

      <div className="flex gap-2 flex-wrap">
        <Badge variant="secondary" className="cursor-pointer">
          All (29)
        </Badge>

        <Badge variant="outline" className="cursor-pointer">
          Active (21)
        </Badge>

        <Badge variant="outline" className="cursor-pointer">
          Pending (4)
        </Badge>

        <Badge variant="outline" className="cursor-pointer">
          Blocked (3)
        </Badge>
      </div>

      {/* Vendor Table */}

      <Card>
        <CardHeader>
          <CardTitle>Vendor Directory</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>

                <TableHead>Category</TableHead>

                <TableHead>GST Number</TableHead>

                <TableHead>Contact</TableHead>

                <TableHead>Status</TableHead>

                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>

                  <TableCell>{vendor.category}</TableCell>

                  <TableCell>{vendor.gst}</TableCell>

                  <TableCell>{vendor.contact}</TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        vendor.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {vendor.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
