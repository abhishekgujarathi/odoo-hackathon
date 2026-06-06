import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type Props = {
  form: any;
};

export default function RFQAttachmentStep({
  form,
}: Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <FormField
            control={form.control}
            name="attachments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Attachments
                </FormLabel>

                <FormControl>
                  <input
                    type="file"
                    multiple
                    onChange={(e) =>
                      field.onChange(
                        e.target.files
                      )
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">
            Review
          </h3>

          <pre className="overflow-auto rounded-md bg-muted p-4 text-xs">
            {JSON.stringify(
              form.watch(),
              null,
              2
            )}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}