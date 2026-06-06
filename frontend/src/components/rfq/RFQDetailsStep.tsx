import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  form: any;
};

export default function RFQDetailsStep({
  form,
}: Props) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              RFQ Title
            </FormLabel>

            <FormControl>
              <Input
                placeholder="Office Furniture Procurement Q2"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Category
            </FormLabel>

            <Select
              value={field.value}
              onValueChange={
                field.onChange
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Furniture">
                  Furniture
                </SelectItem>

                <SelectItem value="IT Equipment">
                  IT Equipment
                </SelectItem>

                <SelectItem value="Construction">
                  Construction
                </SelectItem>

                <SelectItem value="Consulting">
                  Consulting
                </SelectItem>

                <SelectItem value="Logistics">
                  Logistics
                </SelectItem>
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="deadline"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Deadline
            </FormLabel>

            <FormControl>
              <Input
                type="date"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <div />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>
              Description
            </FormLabel>

            <FormControl>
              <Textarea
                rows={5}
                placeholder="Describe requirements..."
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}