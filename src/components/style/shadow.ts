import { StyleSheet } from "react-native";
import { color } from "./color";

export const shadow = StyleSheet.create({
	regular: {
		shadowColor: color.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2
	},
	strong: {
		shadowColor: color.black,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.2,
		shadowRadius: 16,
		elevation: 16
	},
	grass: {
		shadowColor: color.grass,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.5,
		shadowRadius: 8,
		elevation: 8
	}
});
