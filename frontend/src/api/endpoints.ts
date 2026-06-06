export const AUTH_ENDPOINTS = {
  login: () => `/auth/login`,
  verify: () => `/auth/verify`,
};

export const USER_ENDPOINTS = {
  getAll: () => `/user`,
  getById: (id: string) => `/user/${id}`,
  create: () => `/user`,
  update: (id: string) => `/user/${id}`,
  delete: (id: string) => `/user/${id}`,
};

export const VENDOR_ENDPOINTS = {
  getAll: () => `/vendor`,
  getById: (id: string) => `/vendor/${id}`,
  create: () => `/vendor`,
  update: (id: string) => `/vendor/${id}`,
  delete: (id: string) => `/vendor/${id}`,
};

export const VENDOR_CATEGORY_ENDPOINTS = {
  getAll: () => `/vendor-category`,
  getById: (id: string) => `/vendor-category/${id}`,
  create: () => `/vendor-category`,
  update: (id: string) => `/vendor-category/${id}`,
  delete: (id: string) => `/vendor-category/${id}`,
};

export const RFQ_ENDPOINTS = {
  getAll: () => `/rfq`,
  getById: (id: string) => `/rfq/${id}`,
  create: () => `/rfq`,
};