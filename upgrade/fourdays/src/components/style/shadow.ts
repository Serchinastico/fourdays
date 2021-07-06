import { StyleSheet } from 'react-native';

import { color } from './color';

export const shadow = StyleSheet.create({
	grass: {
		elevation: 8,
		shadowColor: color.grass,
		shadowOffset: {
			height: 0,
			width: 0,
		},
		shadowOpacity: 0.5,
		shadowRadius: 8,
	},
	regular: {
		elevation: 2,
		shadowColor: color.black,
		shadowOffset: {
			height: 0,
			width: 0,
		},
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	strong: {
		elevation: 16,
		shadowColor: color.shadow[1],
		shadowOffset: {
			height: 0,
			width: 0,
		},
		shadowOpacity: 1,
		shadowRadius: 16,
	},
	mild: {
		elevation: 24,
		shadowColor: color.shadow[1],
		shadowOffset: {
			height: 0,
			width: 0,
		},
		shadowOpacity: 1,
		shadowRadius: 24,
	},
});
