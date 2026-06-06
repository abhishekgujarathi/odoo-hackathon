import { api } from "./apiClient";
import { VENDOR_ENDPOINTS, VENDOR_CATEGORY_ENDPOINTS } from "./endpoints";

// ── Types ──

export type VendorCategory = {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
};

export type Vendor = {
  id: string;
  vendorCode: string;
  companyName: string;
  gstNumber?: string;
  panNumber?: string;
  email: string;
  phone?: string;
  website?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  status: number;
  rating: number;
  categoryId: string;
  categoryName?: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
};

export type CreateVendorPayload = {
  companyName: string;
  email: string;
  phone?: string;
  gstNumber?: string;
  panNumber?: string;
  website?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  categoryId: string;
  userId: string;
};

// ── Vendor Category API ──

export const vendorCategoryApi = {
  getAll: async (): Promise<VendorCategory[]> => {
    const { data } = await api.get(VENDOR_CATEGORY_ENDPOINTS.getAll());
    return data;
  },

  getById: async (id: string): Promise<VendorCategory> => {
    const { data } = await api.get(VENDOR_CATEGORY_ENDPOINTS.getById(id));
    return data;
  },
};

// ── Vendor API ──

export const vendorApi = {
  getAll: async (): Promise<Vendor[]> => {
    const { data } = await api.get(VENDOR_ENDPOINTS.getAll());
    return data;
  },

  getById: async (id: string): Promise<Vendor> => {
    const { data } = await api.get(VENDOR_ENDPOINTS.getById(id));
    return data;
  },

  create: async (payload: CreateVendorPayload): Promise<Vendor> => {
    const { data } = await api.post(VENDOR_ENDPOINTS.create(), payload);
    return data;
  },

  update: async (
    id: string,
    payload: Partial<CreateVendorPayload>
  ): Promise<Vendor> => {
    const { data } = await api.put(VENDOR_ENDPOINTS.update(id), payload);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(VENDOR_ENDPOINTS.delete(id));
  },
};
