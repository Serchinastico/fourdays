import { StyleSheet } from 'react-native';

const textSizeM = 12;
const textSizeL = 16;

const Colors = {
	black: '#383838',
	brownGray: '#A1A1A1',
	darkMint: '#52BD76',
	darkMint50: '#52BD7680',
};

export default StyleSheet.create({
	midRegularPrimary: {
		fontSize: textSizeM,
		color: Colors.darkMint,
	},
	midRegularDisabled: {
		fontSize: textSizeM,
		color: Colors.darkMint50,
	},
	largeMediumNeutral: {
		fontSize: textSizeL,
		color: Colors.black,
	},
	largeRegularNeutral: {
		fontSize: textSizeL,
		color: Colors.brownGray,
	},
});
