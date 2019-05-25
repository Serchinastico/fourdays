import { StyleSheet } from "react-native";

const textSizeM = 12;
const textSizeL = 16;
const textSizeXL = 20;

export const color = {
	transparent: "transparent",
	white: "#FFF",
	black: "#383838",
	black05: "#3838380C",
	black50: "#38383877",
	black70: "#000000B3",
	brownGray: "#A1A1A1",
	darkMint: "#52BD76",
	darkMint50: "#52BD7680",
	seafoamGreen: "#87E0A5"
};

export const style = StyleSheet.create({
	midRegularPrimary: {
		fontFamily: "AvenirNext-Regular",
		fontSize: textSizeM,
		color: color.darkMint
	},
	midRegularNeutral: {
		fontFamily: "AvenirNext-Regular",
		fontSize: textSizeM,
		color: color.brownGray
	},
	midRegularDisabled: {
		fontFamily: "AvenirNext-Regular",
		fontSize: textSizeM,
		color: color.darkMint50
	},
	largeMediumNeutral: {
		fontFamily: "AvenirNext-Medium",
		fontSize: textSizeL,
		color: color.black
	},
	largeRegularNeutral: {
		fontFamily: "AvenirNext-Regular",
		fontSize: textSizeL,
		color: color.brownGray
	},
	extraLargeRegularNeutral: {
		fontFamily: "AvenirNext-Regular",
		fontSize: textSizeXL,
		color: color.black
	},
	extraLargeRegularDisabled: {
		fontFamily: "AvenirNext-Regular",
		fontSize: textSizeXL,
		color: color.black50
	}
});
