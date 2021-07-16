import { StyleSheet } from 'react-native';

import { color } from '../style/color';
import { shadow } from '../style/shadow';

export const styles = StyleSheet.create({
	container: {
		width: 164,
		height: 56,
		bottom: 56,
		position: 'absolute',
		display: 'flex',
		flexDirection: 'row',
		alignSelf: 'center',
		justifyContent: 'space-between',
		backgroundColor: color.white,
		borderRadius: 28,
		padding: 4,
		...shadow.mild,
	},
});
