import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { ArrowLeft, FileText } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useFieldArray } from "react-hook-form";

import { rfqSchema, type RFQFormData } from "@/schemas/rfq.schema";

import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import StepIndicator from "@/components/rfq/StepIndicator";

import RFQDetailsStep from "@/components/rfq/RFQDetailsStep";

import RFQItemsStep from "@/components/rfq/RFQItemsStep";

import RFQAttachmentStep from "@/components/rfq/RFQAttachmentStep";

import { rfqApi } from "@/api/rfqApi";

export default function RFQForm() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const form = useForm<RFQFormData>({
    resolver: zodResolver(rfqSchema),

    defaultValues: {
      title: "",
      category: "",
      deadline: "",
      description: "",

      vendors: [],

      items: [
        {
          itemName: "",
          quantity: 1,
          unit: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: RFQFormData) => {
    try {
      setIsSubmitting(true);
      
      const payload = {
        title: data.title,
        description: data.description,
        deadline: new Date(data.deadline).toISOString(),
        items: data.items.map(item => ({
          itemName: item.itemName,
          quantity: item.quantity,
          unit: item.unit,
        })),
        vendorIds: data.vendors,
      };

      await rfqApi.create(payload);
      alert("RFQ created successfully!");
      navigate("/"); // Dashboard
    } catch (err: any) {
      console.error("Failed to create RFQ:", err);
      alert(err.message || "Failed to create RFQ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full px-8 py-6">
      <Card className="min-h-[calc(100vh-120px)]">
        <CardHeader className="border-b space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border p-2">
              <FileText className="size-5" />
            </div>

            <div>
              <CardTitle>Create RFQ</CardTitle>

              <CardDescription>
                Request quotations from vendors.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col min-h-[700px] pt-8">
          <StepIndicator currentStep={step} />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-1 flex-col"
            >
              <div className="flex-1">
                {step === 1 && <RFQDetailsStep form={form} />}

                {step === 2 && (
                  <RFQItemsStep
                    form={form}
                    fields={fields}
                    append={append}
                    remove={remove}
                  />
                )}

                {step === 3 && <RFQAttachmentStep form={form} />}
              </div>
              <div className="mt-auto flex items-center justify-between border-t pt-6">
                <Button
                  type="button"
                  variant="outline"
                  disabled={step === 1 || isSubmitting}
                  onClick={() => setStep((prev) => prev - 1)}
                >
                  Previous
                </Button>

                <div className="flex gap-3">
                  

                  {step < 3 ? (
                    <Button
                      type="button"
                      onClick={() => setStep((prev) => prev + 1)}
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send RFQ"}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
