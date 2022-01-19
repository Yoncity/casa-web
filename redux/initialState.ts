export default {
  auth: {
    loading: false,
    error: null,
    address: null,
  },
  statistics: {
    loading: false,
    error: null,
    data: null,
  },
  createAccount: {
    loading: false,
    pending: false,
    error: null,
    data: null,
  },
  getAccounts: {
    loading: false,
    error: null,
    data: [],
  },
  updateAccount: {
    loading: false,
    pending: false,
    error: null,
    data: [],
  },
};

export type InitialState = {
  authenticate: Record<string, any>;
  statistics: Record<string, any>;
  createAccount: Record<string, any>;
  getAccounts: Record<string, any>;
  updateAccount: Record<string, any>;
};
