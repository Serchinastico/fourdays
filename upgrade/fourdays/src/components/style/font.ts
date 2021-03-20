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
	regular: "AvenirNext-Regular",
	medium: "AvenirNext-Medium",
	bold: "AvenirNext-Bold"
};
/* tslint:enable:object-literal-sort-keys */

export const textStyle = StyleSheet.create({
	midRegularDisabled: {
		color: color.darkMint50,
		fontFamily: FontFamily.regular,
		fontSize: TextSize.M
	},
	midRegularNeutral: {
		color: color.brownGray,
		fontFamily: FontFamily.regular,
		fontSize: TextSize.M
	},
	midRegularPrimary: {
		color: color.darkMint,
		fontFamily: FontFamily.regular,
		fontSize: TextSize.M
	},

	midBoldBlack: {
		color: color.black,
		fontFamily: FontFamily.bold,
		fontSize: TextSize.M
	},

	midMediumBlack: {
		color: color.black,
		fontFamily: FontFamily.medium,
		fontSize: TextSize.M
	},
	midMediumDorian: {
		color: color.dorian,
		fontFamily: FontFamily.medium,
		fontSize: TextSize.M
	},

	largeMediumBlack: {
		color: color.black,
		fontFamily: FontFamily.medium,
		fontSize: TextSize.L
	},

	largeRegularBlack: {
		color: color.black,
		fontFamily: FontFamily.regular,
		fontSize: TextSize.L
	},
	largeRegularNeutral: {
		color: color.brownGray,
		fontFamily: FontFamily.regular,
		fontSize: TextSize.L
	},

	extraLargeRegularDisabled: {
		color: color.black50,
		fontFamily: FontFamily.regular,
		fontSize: TextSize.XL
	},
	extraLargeRegularNeutral: {
		color: color.black,
		fontFamily: FontFamily.regular,
		fontSize: TextSize.XL
	},

	extraLargeMediumBlack: {
		color: color.black,
		fontFamily: FontFamily.medium,
		fontSize: TextSize.XL
	},

	extraExtraLargeBoldNeutral: {
		color: color.black,
		fontFamily: FontFamily.bold,
		fontSize: TextSize.XXL
	}
});
