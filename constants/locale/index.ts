import en from "./en";
import es from "./es";
import fr from "./fr";

const translates: any = {
  en,
  es,
  fr,
};

const locales = (key: string, locale: "en" | "es" = "en") => {
  if (!translates[locale]) {
    throw new Error("Locale doesn't exist");
  }

  if (!translates[locale][key]) {
    throw new Error(`Translation for ${key} doesn't exist`);
  }

  return translates[locale][key];
};

export default locales;
