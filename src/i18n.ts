// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language files
import enTranslation from './locales/en/translation.json';
import jpTranslation from './locales/jp/translation.json'

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      }, 
      jp:{
        translation: jpTranslation,
      }
    },
    lng: 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;
