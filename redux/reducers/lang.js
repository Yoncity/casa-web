import SET_LANG from "../actionTypes/lang";
import initialState from "../initialState";

const setLang = (state = initialState.locale, { type, payload }) => {
  switch (type) {
    case SET_LANG:
      return { lang: payload.data };
    default:
      return state;
  }
};

export default setLang;
