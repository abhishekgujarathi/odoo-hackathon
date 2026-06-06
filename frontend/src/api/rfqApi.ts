import { api } from "./apiClient";
import { RFQ_ENDPOINTS } from "./endpoints";

export type RFQItem = {
  id?: string;
  itemName: string;
  description?: string;
  quantity: number;
  unit: string;
  estimatedUnitPrice?: number;
};

export type RFQVendor = {
  vendorId: string;
  companyName: string;
  vendorCode: string;
  invitedAt: string;
};

export type RFQ = {
  id: string;
  rfqNumber: string;
  title: string;
  description?: string;
  deadline: string;
  status: number;
  statusLabel: string;
  procurementOfficerName?: string;
  createdAt: string;
  items: RFQItem[];
  vendors: RFQVendor[];
};

export type CreateRFQPayload = {
  title: string;
  description?: string;
  deadline: string;
  items: Omit<RFQItem, "id">[];
  vendorIds: string[];
};

export const rfqApi = {
  getAll: async (): Promise<RFQ[]> => {
    const { data } = await api.get(RFQ_ENDPOINTS.getAll());
    return data;
  },

  getById: async (id: string): Promise<RFQ> => {
    const { data } = await api.get(RFQ_ENDPOINTS.getById(id));
    return data;
  },

  create: async (payload: CreateRFQPayload): Promise<RFQ> => {
    const { data } = await api.post(RFQ_ENDPOINTS.create(), payload);
    return data;
  },
};
