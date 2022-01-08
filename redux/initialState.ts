export default {
  auth: {
    loading: false,
    error: null,
    address: null,
  },
  createAccount: {
    loading: false,
    error: null,
    success: false,
  },
  getAccounts: {
    loading: false,
    error: null,
    data: null,
  },
};

export type InitialState = {
  authenticate: Record<string, any>;
  createAccount: Record<string, any>;
  getAccounts: Record<string, any>;
};