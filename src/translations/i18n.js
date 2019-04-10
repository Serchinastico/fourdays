import I18n from 'react-native-i18n';

import en from './en.json';
import es from './es.json';

I18n.translations = {
	en: en,
	es: es,
};
I18n.fallbacks = true;

export default I18n;
