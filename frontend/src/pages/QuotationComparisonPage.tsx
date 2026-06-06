import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { ArrowLeft, Trophy, FileSpreadsheet } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import ApprovalSummaryCard from "@/components/quotation/ApprovalSummaryCard";

import QuotationDetailDialog from "@/components/quotation/QuotationDetailDialog";

import RejectQuotationDialog from "@/components/quotation/RejectQuotationDialog";

import { quotations } from "../components/data/quotationComparisonData.ts";
// } from "@/data/quotationComparisonData";

export default function QuotationComparisonPage() {
  const navigate = useNavigate();

  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  const handleSelectVendor = (vendor: string) => {
    setSelectedVendor(vendor);
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
              <FileSpreadsheet className="size-5" />
            </div>

            <div>
              <CardTitle>Quotation Comparison</CardTitle>

              <CardDescription>
                Compare vendor quotations and select the best proposal.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-8">
          {/* Header Summary */}

          <div className="mb-8 rounded-lg border p-4">
            <h3 className="font-semibold">
              RFQ: Office Furniture Procurement Q2
            </h3>

            <p className="text-sm text-muted-foreground">
              Compare quotations received from vendors.
            </p>
          </div>

          {/* Comparison Cards */}

          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex gap-5 pb-4">
              {quotations.map((quotation) => (
                <Card
                  key={quotation.id}
                  className={`min-w-[360px]
                    ${
                      quotation.recommended ? "border-red-500 shadow-lg" : ""
                    }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {quotation.vendor}
                      </CardTitle>

                      {quotation.recommended && (
                        <Badge>
                          <Trophy className="mr-1 h-3 w-3" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Grand Total
                      </p>

                      <h3 className="text-3xl font-bold">
                        ₹{quotation.total.toLocaleString()}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">GST</p>

                        <p>{quotation.gst}%</p>
                      </div>

                      <div>
                        <p className="text-muted-foreground">Delivery</p>

                        <p>{quotation.deliveryDays} Days</p>
                      </div>

                      <div>
                        <p className="text-muted-foreground">Rating</p>

                        <p>⭐{quotation.rating}</p>
                      </div>

                      <div>
                        <p className="text-muted-foreground">Terms</p>

                        <p>{quotation.paymentTerms}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <QuotationDetailDialog quotation={quotation} />

                      <Button
                        className="w-full"
                        onClick={() => handleSelectVendor(quotation.vendor)}
                      >
                        Select Vendor
                      </Button>

                      <RejectQuotationDialog vendorName={quotation.vendor} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          {/* Selected Vendor */}

          {selectedVendor && (
            <div className="mt-8 rounded-lg border border-green-500 bg-green-50 p-4">
              <h3 className="font-semibold">Selected Vendor</h3>

              <p>{selectedVendor}</p>
            </div>
          )}

          {/* Approval Section */}

          <div className="mt-8">
            <ApprovalSummaryCard selectedVendor={selectedVendor || undefined} />
          </div>

          {/* Footer */}

          <div className="mt-8 flex justify-end gap-3 border-t pt-6">
            <Button variant="outline">Save Decision</Button>

            <Button>Send For Approval</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
