import { StyleSheet } from "react-native";
import { color } from "./color";

/* tslint:disable:object-literal-sort-keys */
const TextSize = {
	M: 12,
	L: 16,
	XL: 20,
	XXL: 32
};

const FontFamily = {
	header: "SFPro-Black",
	content: {
		regular: "Gilroy-Regular",
		regularItalic: "Gilroy-RegularItalic",
		medium: "Gilroy-medium"
	}
};
/* tslint:enable:object-literal-sort-keys */

export const textStyle = StyleSheet.create({
	h1: {
		color: color.foreground[1],
		fontFamily: FontFamily.header,
		fontSize: TextSize.XXL
	},
	h2: {
		color: color.foreground[1],
		fontFamily: FontFamily.content.medium,
		fontSize: TextSize.XL
	},
	h3: {
		color: color.foreground[1],
		fontFamily: FontFamily.header,
		fontSize: TextSize.M
	},
	button: {
		color: color.foreground[1],
		fontFamily: FontFamily.content.medium,
		fontSize: TextSize.L
	},
	body1: {
		color: color.foreground[1],
		fontFamily: FontFamily.content.regular,
		fontSize: TextSize.XL
	},
	body2: {
		color: color.foreground[1],
		fontFamily: FontFamily.content.regular,
		fontSize: TextSize.L
	},
	body3: {
		color: color.foreground[1],
		fontFamily: FontFamily.content.regular,
		fontSize: TextSize.M
	},
	caption: {
		color: color.foreground[2],
		fontFamily: FontFamily.content.regularItalic,
		fontSize: TextSize.L
	}
});
