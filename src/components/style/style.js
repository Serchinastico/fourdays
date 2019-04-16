import { StyleSheet } from "react-native";

const textSizeM = 12;
const textSizeL = 16;

export const color = {
	transparent: "transparent",
	white: "#FFF",
	black: "#383838",
	black05: "#3838380C",
	black70: "#000000B3",
	brownGray: "#A1A1A1",
	darkMint: "#52BD76",
	darkMint50: "#52BD7680",
	seafoamGreen: "#87E0A5"
};

export const style = StyleSheet.create({
	midRegularPrimary: {
		fontSize: textSizeM,
		color: color.darkMint
	},
	midRegularDisabled: {
		fontSize: textSizeM,
		color: color.darkMint50
	},
	largeMediumNeutral: {
		fontSize: textSizeL,
		color: color.black
	},
	largeRegularNeutral: {
		fontSize: textSizeL,
		color: color.brownGray
	}
});
