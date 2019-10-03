import { StyleSheet } from "react-native";

const textSizeM = 12;
const textSizeL = 16;
const textSizeXL = 20;
const textSizeXXL = 32;

export const color = {
	transparent: "transparent",
	white: "#FFF",
	black: "#2E2E2E",
	black05: "#2E2E2E0C",
	black20: "#2E2E2E33",
	black50: "#2E2E2E77",
	black70: "#2E2E2EB3",
	brownGray: "#A1A1A1",
	dorian: "#C0C0C0",
	grass: "#95D163",
	clearGrass: "#B6DF94",
	darkMint: "#52BD76",
	darkMint50: "#52BD7680",
	seafoamGreen: "#87E0A5"
};

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
	}
});

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
	midMediumBlack: {
		fontFamily: "AvenirNext-Medium",
		fontSize: textSizeM,
		color: color.black
	},
	midMediumDorian: {
		fontFamily: "AvenirNext-Medium",
		fontSize: textSizeM,
		color: color.dorian
	},
	midBoldBlack: {
		fontFamily: "AvenirNext-Bold",
		fontSize: textSizeM,
		color: color.black
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
	},
	extraLargeMediumBlack: {
		fontFamily: "AvenirNext-Medium",
		fontSize: textSizeXL,
		color: color.black
	},
	extraExtraLargeBoldNeutral: {
		fontFamily: "AvenirNext-Bold",
		fontSize: textSizeXXL,
		color: color.black
	}
});
