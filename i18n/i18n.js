import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from '../public/locales/en/common.json'
import de from '../public/locales/de/common.json'
import pl from '../public/locales/pl/common.json'

const resources = {
  en: {
    translation: en
  },
  de: {
    translation: de
  },
  pl: {
    translation: pl
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;