import { StyleSheet } from "react-native";
import { color } from "./color";

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

export const textStyle = StyleSheet.create({
	midRegularPrimary: {
		fontFamily: FontFamily.regular,
		fontSize: TextSize.M,
		color: color.darkMint
	},
	midRegularNeutral: {
		fontFamily: FontFamily.regular,
		fontSize: TextSize.M,
		color: color.brownGray
	},
	midRegularDisabled: {
		fontFamily: FontFamily.regular,
		fontSize: TextSize.M,
		color: color.darkMint50
	},
	midMediumBlack: {
		fontFamily: FontFamily.medium,
		fontSize: TextSize.M,
		color: color.black
	},
	midMediumDorian: {
		fontFamily: FontFamily.medium,
		fontSize: TextSize.M,
		color: color.dorian
	},
	midBoldBlack: {
		fontFamily: FontFamily.bold,
		fontSize: TextSize.M,
		color: color.black
	},
	largeMediumBlack: {
		fontFamily: FontFamily.medium,
		fontSize: TextSize.L,
		color: color.black
	},
	largeRegularBlack: {
		fontFamily: FontFamily.regular,
		fontSize: TextSize.L,
		color: color.black
	},
	largeRegularNeutral: {
		fontFamily: FontFamily.regular,
		fontSize: TextSize.L,
		color: color.brownGray
	},
	extraLargeRegularNeutral: {
		fontFamily: FontFamily.regular,
		fontSize: TextSize.XL,
		color: color.black
	},
	extraLargeRegularDisabled: {
		fontFamily: FontFamily.regular,
		fontSize: TextSize.XL,
		color: color.black50
	},
	extraLargeMediumBlack: {
		fontFamily: FontFamily.medium,
		fontSize: TextSize.XL,
		color: color.black
	},
	extraExtraLargeBoldNeutral: {
		fontFamily: FontFamily.bold,
		fontSize: TextSize.XXL,
		color: color.black
	}
});
