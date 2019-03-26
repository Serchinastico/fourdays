import { StyleSheet } from 'react-native';

const textSizeM = 12;
const textSizeL = 16;

const Colors = {
	black: '#383838',
	brownGray: '#A1A1A1',
	darkMint: '#52BD76',
};

export default StyleSheet.create({
	midRegularPrimary: {
		fontSize: textSizeM,
		color: Colors.darkMint,
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
