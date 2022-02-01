export default {
  auth: {
    loading: false,
    error: null,
    address: null,
  },
  contractStatistics: {
    loading: false,
    error: null,
    data: [],
  },
  userStatistics: {
    loading: false,
    error: null,
    data: [],
  },
  transactions: {
    loading: false,
    error: null,
    data: [],
  },
  createAccount: {
    loading: false,
    pending: false,
    error: null,
    data: [],
  },
  getAccounts: {
    loading: false,
    error: null,
    data: [],
  },
  updateAccount: {
    loading: false,
    error: null,
    data: [],
  },
  rate: {
    loading: false,
    error: null,
    data: null,
  },
  locale: {
    value: "en",
  },
};

export type InitialState = {
  authenticate: Record<string, any>;
  contractStatistics: Record<string, any>;
  userStatistics: Record<string, any>;
  transactions: Record<string, any>;
  createAccount: Record<string, any>;
  getAccounts: Record<string, any>;
  updateAccount: Record<string, any>;
  rate: Record<string, any>;
  locale: Record<string, any>;
};
