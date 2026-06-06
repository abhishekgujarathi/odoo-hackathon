import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Plus,
  Trash2,
} from "lucide-react";

import { useState, useEffect } from "react";
import { vendorApi, type Vendor } from "@/api/vendorApi";

type Props = {
  form: any;
  fields: any[];
  append: any;
  remove: any;
};

export default function RFQItemsStep({
  form,
  fields,
  append,
  remove,
}: Props) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loadingVendors, setLoadingVendors] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const data = await vendorApi.getAll();
        setVendors(data);
      } catch (err) {
        console.error("Failed to load vendors:", err);
      } finally {
        setLoadingVendors(false);
      }
    };
    fetchVendors();
  }, []);

  return (
    <div className="space-y-8">
      {/* Line Items */}

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-lg">
            Line Items
          </h3>

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              append({
                itemName: "",
                quantity: 1,
                unit: "",
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>
        </div>

        <div className="space-y-4">
          {fields.map(
            (field, index) => (
              <Card key={field.id}>
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    <FormField
                      control={
                        form.control
                      }
                      name={`items.${index}.itemName`}
                      render={({
                        field,
                      }) => (
                        <FormItem>
                          <FormLabel>
                            Item
                          </FormLabel>

                          <FormControl>
                            <Input
                              placeholder="Ergonomic Chair"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={
                        form.control
                      }
                      name={`items.${index}.quantity`}
                      render={({
                        field,
                      }) => (
                        <FormItem>
                          <FormLabel>
                            Quantity
                          </FormLabel>

                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={
                        form.control
                      }
                      name={`items.${index}.unit`}
                      render={({
                        field,
                      }) => (
                        <FormItem>
                          <FormLabel>
                            Unit
                          </FormLabel>

                          <FormControl>
                            <Input
                              placeholder="Nos"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() =>
                          remove(index)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>

      {/* Vendors */}

      <div>
        <h3 className="mb-4 font-semibold text-lg">
          Assign Vendors
        </h3>

        <div className="space-y-3">
          {loadingVendors ? (
            <p className="text-sm text-muted-foreground">Loading vendors...</p>
          ) : vendors.length === 0 ? (
            <p className="text-sm text-muted-foreground">No vendors available to assign.</p>
          ) : (
            vendors.map((vendor) => (
              <FormField
                key={vendor.id}
                control={form.control}
                name="vendors"
                render={({ field }) => {
                  const selected =
                    field.value?.includes(
                      vendor.id
                    );

                  return (
                    <label className="flex items-center gap-3 rounded-md border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                      <input
                        type="checkbox"
                        checked={
                          selected
                        }
                        onChange={(
                          e
                        ) => {
                          if (
                            e.target
                              .checked
                          ) {
                            field.onChange(
                              [
                                ...field.value,
                                vendor.id,
                              ]
                            );
                          } else {
                            field.onChange(
                              field.value.filter(
                                (
                                  v: string
                                ) =>
                                  v !==
                                  vendor.id
                              )
                            );
                          }
                        }}
                      />

                      <div>
                        <p className="font-medium">{vendor.companyName}</p>
                        <p className="text-xs text-muted-foreground">{vendor.email} • {vendor.categoryName || "No Category"}</p>
                      </div>
                    </label>
                  );
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}