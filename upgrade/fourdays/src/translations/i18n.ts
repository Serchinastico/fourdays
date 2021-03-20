import I18n from "react-native-i18n";

// @ts-ignore
import en from "./en.json";
// @ts-ignore
import es from "./es.json";

I18n.translations = {
	en,
	es,
};
I18n.fallbacks = true;

export default I18n;
