import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  vendorSchema,
  type VendorFormData,
} from "../schemas/vendor.schema.ts";

import {
  handleGSTChange,
  handlePANChange,
  handlePhoneChange,
} from "../utils/inputValidators.ts";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Separator } from "@/components/ui/separator";

import {
  Building2,
  ArrowLeft,
  MapPin,
  FileText,
  Mail,
  Phone,
  Globe,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { vendorApi, vendorCategoryApi, type VendorCategory } from "@/api/vendorApi";

export default function VendorForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const [categories, setCategories] = useState<VendorCategory[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      companyName: "",
      email: "",
      phone: "",
      gstNumber: "",
      panNumber: "",
      website: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "India",
      postalCode: "",
      categoryId: "",
    },
  });

  useEffect(() => {
    vendorCategoryApi.getAll().then(setCategories).catch(console.error);

    if (id) {
      setLoading(true);
      vendorApi
        .getById(id)
        .then((vendor) => {
          form.reset({
            companyName: vendor.companyName,
            email: vendor.email,
            phone: vendor.phone || "",
            gstNumber: vendor.gstNumber || "",
            panNumber: vendor.panNumber || "",
            website: vendor.website || "",
            addressLine1: vendor.addressLine1 || "",
            addressLine2: vendor.addressLine2 || "",
            city: vendor.city || "",
            state: vendor.state || "",
            country: vendor.country || "India",
            postalCode: vendor.postalCode || "",
            categoryId: vendor.categoryId,
          });
        })
        .catch((err) => {
          console.error("Failed to load vendor:", err);
          alert("Failed to load vendor details");
          navigate("/vendors");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const onSubmit = async (data: VendorFormData) => {
    try {
      setSubmitting(true);
      if (isEditMode && id) {
        await vendorApi.update(id, data);
      } else {
        const userId =
          localStorage.getItem("userId") ||
          "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
        await vendorApi.create({ ...data, userId });
      }
      navigate("/vendors");
    } catch (err: any) {
      console.error("Failed to save vendor:", err);
      alert(err.message || "Failed to save vendor");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full p-6 flex items-center justify-center min-h-[400px] text-muted-foreground">
        Loading vendor details...
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <Card className="shadow-lg">
        <CardHeader className="border-b space-y-4 pb-6">
          <Button
            type="button"
            variant="ghost"
            className="w-fit gap-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3">
              <Building2 className="size-6 text-primary" />
            </div>

            <div>
              <CardTitle className="text-2xl font-bold tracking-tight">
                {isEditMode ? "Edit Vendor" : "Add New Vendor"}
              </CardTitle>

              <CardDescription className="mt-1 text-base">
                Register a new vendor with company details and documentation.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              {/* ── Company Information ── */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-lg">
                    Company Information
                  </h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Company Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the Company Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Category <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>

                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-10"
                              placeholder="https://www.example.com"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* ── Contact Details ── */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-lg">Contact Details</h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="email"
                              className="pl-10"
                              placeholder="contact@company.com"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              className="pl-10"
                              placeholder="9876543210"
                              value={field.value}
                              onChange={(e) =>
                                field.onChange(
                                  handlePhoneChange(e.target.value)
                                )
                              }
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* ── Tax & Compliance ── */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-lg">
                    Tax & Compliance
                  </h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="gstNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GST Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="27AABCT1234F1ZH"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(
                                handleGSTChange(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="panNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PAN Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="AABCT1234F"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(
                                handlePANChange(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* ── Address ── */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-lg">Address</h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Building, Street"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address Line 2</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Area, Landmark"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Mumbai" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Maharashtra" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="India" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIN Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="400069"
                            maxLength={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* ── Actions ── */}
              <div className="flex justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="px-6"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>

                <Button type="submit" className="px-6 font-semibold" disabled={submitting}>
                  {submitting ? "Saving..." : isEditMode ? "Update Vendor" : "Save Vendor"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
