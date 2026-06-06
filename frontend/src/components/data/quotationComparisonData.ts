// Dummy RFQ list
export type DummyRFQ = {
  id: string;
  rfqNumber: string;
  title: string;
  status: "Draft" | "Published" | "Closed" | "UnderReview";
  deadline: string;
  quotationCount: number;
};

export const dummyRFQs: DummyRFQ[] = [
  {
    id: "rfq-1",
    rfqNumber: "RFQ-001",
    title: "Office Furniture Procurement Q2",
    status: "UnderReview",
    deadline: "2026-06-30",
    quotationCount: 3,
  },
  {
    id: "rfq-2",
    rfqNumber: "RFQ-002",
    title: "IT Equipment — Laptops & Monitors",
    status: "Published",
    deadline: "2026-07-15",
    quotationCount: 2,
  },
  {
    id: "rfq-3",
    rfqNumber: "RFQ-003",
    title: "Annual Stationery Supply Contract",
    status: "Closed",
    deadline: "2026-05-20",
    quotationCount: 4,
  },
  {
    id: "rfq-4",
    rfqNumber: "RFQ-004",
    title: "Server Room UPS & Electrical Upgrade",
    status: "Draft",
    deadline: "2026-08-01",
    quotationCount: 0,
  },
];

// Quotation type used by comparison cards
export type QuotationItem = {
  item: string;
  qty: number;
  unitPrice: number;
};

export type Quotation = {
  id: number;
  vendor: string;
  total: number;
  gst: number;
  deliveryDays: number;
  rating: number;
  paymentTerms: string;
  recommended: boolean;
  items: QuotationItem[];
  notes: string;
};

// Quotations grouped by RFQ id
export const quotationsByRFQ: Record<string, Quotation[]> = {
  "rfq-1": [
    {
      id: 1,
      vendor: "Infra Supplies Pvt Ltd",
      total: 185000,
      gst: 18,
      deliveryDays: 10,
      rating: 4.5,
      paymentTerms: "30 Days",
      recommended: true,
      items: [
        { item: "Ergonomic Chair", qty: 25, unitPrice: 3500 },
        { item: "Standing Desk", qty: 10, unitPrice: 9700 },
      ],
      notes: "Delivery within 10 days. Installation included.",
    },
    {
      id: 2,
      vendor: "TechCore LTD",
      total: 200010,
      gst: 18,
      deliveryDays: 14,
      rating: 4.2,
      paymentTerms: "30 Days",
      recommended: false,
      items: [
        { item: "Ergonomic Chair", qty: 25, unitPrice: 3800 },
        { item: "Standing Desk", qty: 10, unitPrice: 10500 },
      ],
      notes: "Extended warranty included.",
    },
    {
      id: 3,
      vendor: "Office Need Co.",
      total: 214900,
      gst: 18,
      deliveryDays: 7,
      rating: 3.8,
      paymentTerms: "15 Days",
      recommended: false,
      items: [
        { item: "Ergonomic Chair", qty: 25, unitPrice: 4100 },
        { item: "Standing Desk", qty: 10, unitPrice: 11200 },
      ],
      notes: "Fastest delivery available.",
    },
  ],

  "rfq-2": [
    {
      id: 4,
      vendor: "TechCore LTD",
      total: 752000,
      gst: 18,
      deliveryDays: 21,
      rating: 4.2,
      paymentTerms: "45 Days",
      recommended: true,
      items: [
        { item: 'Laptop 14" i7', qty: 10, unitPrice: 62000 },
        { item: '27" Monitor', qty: 10, unitPrice: 13200 },
      ],
      notes: "3-year on-site warranty included.",
    },
    {
      id: 5,
      vendor: "Digital Mart India",
      total: 808000,
      gst: 18,
      deliveryDays: 14,
      rating: 4.0,
      paymentTerms: "30 Days",
      recommended: false,
      items: [
        { item: 'Laptop 14" i7', qty: 10, unitPrice: 65000 },
        { item: '27" Monitor', qty: 10, unitPrice: 15800 },
      ],
      notes: "Faster delivery, 1-year warranty.",
    },
  ],

  "rfq-3": [
    {
      id: 6,
      vendor: "Paper Plus",
      total: 48500,
      gst: 12,
      deliveryDays: 5,
      rating: 4.6,
      paymentTerms: "15 Days",
      recommended: true,
      items: [
        { item: "A4 Paper (500 sheets)", qty: 200, unitPrice: 180 },
        { item: "Pen Box (50 pcs)", qty: 20, unitPrice: 425 },
      ],
      notes: "Monthly delivery schedule available.",
    },
    {
      id: 7,
      vendor: "Office Need Co.",
      total: 52800,
      gst: 12,
      deliveryDays: 7,
      rating: 3.8,
      paymentTerms: "30 Days",
      recommended: false,
      items: [
        { item: "A4 Paper (500 sheets)", qty: 200, unitPrice: 195 },
        { item: "Pen Box (50 pcs)", qty: 20, unitPrice: 440 },
      ],
      notes: "Free delivery above ₹50k.",
    },
    {
      id: 8,
      vendor: "Stationery World",
      total: 45200,
      gst: 12,
      deliveryDays: 10,
      rating: 4.1,
      paymentTerms: "30 Days",
      recommended: false,
      items: [
        { item: "A4 Paper (500 sheets)", qty: 200, unitPrice: 170 },
        { item: "Pen Box (50 pcs)", qty: 20, unitPrice: 410 },
      ],
      notes: "Bulk pricing available for annual contracts.",
    },
    {
      id: 9,
      vendor: "Infra Supplies Pvt Ltd",
      total: 55000,
      gst: 12,
      deliveryDays: 3,
      rating: 4.5,
      paymentTerms: "15 Days",
      recommended: false,
      items: [
        { item: "A4 Paper (500 sheets)", qty: 200, unitPrice: 200 },
        { item: "Pen Box (50 pcs)", qty: 20, unitPrice: 500 },
      ],
      notes: "Premium quality. Express delivery.",
    },
  ],
};

// Keep legacy export for backward compatibility (used by sub-components type inference)
export const quotations = quotationsByRFQ["rfq-1"];
