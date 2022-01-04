export default {
  auth: {
    loading: false,
    error: {},
    address: null,
  },
};

export type InitialState = {
  authenticate: Record<string, any>;
};
