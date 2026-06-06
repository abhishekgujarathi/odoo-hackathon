import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  vendorSchema,
  type VendorFormData,
} from "..//schemas/vendor.schema.ts";

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

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";
import { CardDescription } from "../components/ui/card.tsx";

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

export default function VendorForm() {
  const navigate = useNavigate();

  const form = useForm<VendorFormData>({
    resolver: zodResolver(vendorSchema),

    defaultValues: {
      vendorName: "",
      vendorType: "Company",
      category: "IT Services",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      gstNumber: "",
      panNumber: "",
      productsServices: "",
    },
  });

  const onSubmit = (data: VendorFormData) => {
    console.log("Vendor Data");
    console.log(data);
  };

  return (
    <div className="w-full p-6">
      <Card>
        <CardHeader className="border-b space-y-4">
          <Button
            type="button"
            variant="ghost"
            className="w-fit"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          <div className="flex items-center gap-3">
            <div className="rounded-lg border p-2">
              <Building2 className="size-5" />
            </div>

            <div>
              <CardTitle>Add New Vendor</CardTitle>

              <CardDescription>
                Manage vendor information and registration details.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-5 md:grid-cols-2"
            >
              <FormField
                control={form.control}
                name="vendorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vendorType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor Type</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Individual">Individual</SelectItem>

                        <SelectItem value="Company">Company</SelectItem>

                        <SelectItem value="Partnership">Partnership</SelectItem>

                        <SelectItem value="LLP">LLP</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="IT Services">IT Services</SelectItem>

                        <SelectItem value="Manufacturing">
                          Manufacturing
                        </SelectItem>

                        <SelectItem value="Logistics">Logistics</SelectItem>

                        <SelectItem value="Consulting">Consulting</SelectItem>

                        <SelectItem value="Construction">
                          Construction
                        </SelectItem>

                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
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
                      <Input
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(handlePhoneChange(e.target.value))
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gstNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST Number</FormLabel>

                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(handleGSTChange(e.target.value))
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
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(handlePANChange(e.target.value))
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Address</FormLabel>

                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productsServices"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Products / Services</FormLabel>

                    <FormControl>
                      <Textarea
                        placeholder="Software Development, Cloud Services..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 flex justify-end gap-3 border-t pt-6 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>

                <Button type="submit">Save Vendor</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
