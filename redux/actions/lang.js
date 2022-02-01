import SET_LANG from "../actionTypes/lang";

const setLang = (data) => ({
  type: SET_LANG,
  payload: { data },
});

export default setLang;
