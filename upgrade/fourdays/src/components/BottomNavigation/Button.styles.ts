import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { color } from '../style/color';

const baseButtonContainer: StyleProp<ViewStyle> = {
	borderRadius: 32,
	flexDirection: 'column',
	justifyContent: 'center',
};

export const styles = StyleSheet.create({
	selectedButtonContainer: {
		...baseButtonContainer,
		backgroundColor: color.black,
	},
	unselectedButtonContainer: {
		...baseButtonContainer,
		backgroundColor: color.white,
	},
});