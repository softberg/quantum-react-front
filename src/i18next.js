import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationEN from './assets/locales/en/common.json'
import translationRU from './assets/locales/ru/common.json'
import translationAM from './assets/locales/am/common.json'

const resources = {
	en: {
		translation: translationEN
	},
	ru: {
		translation: translationRU
	},
	am: {
		translation: translationAM
	}
};
const languages = ['en', 'ru', 'am'];
const currentLang = () => {
	if (localStorage.getItem('i18nextLng') && languages.includes(localStorage.getItem('i18nextLng'))) {
		return localStorage.getItem('i18nextLng')
	}
	else {
		return 'en'
	}
}

i18n
	.use(detector)
	.use(initReactI18next)
	.init({
		resources,
		lng: currentLang(),
		keySeparator: false,
		whitelist: languages,
		interpolation: {
			escapeValue: false
		}
	});

export default i18n;