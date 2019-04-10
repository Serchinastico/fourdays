import React from 'react';
import { TouchableHighlight, StyleSheet, Text } from 'react-native';
import I18n from '../translations/i18n';
import { color, style } from './style/style';

const styles = StyleSheet.create({
	container: {
		height: 48,
		borderRadius: 24,
		backgroundColor: color.darkMint,
		justifyContent: 'center',
		marginHorizontal: 32,
		elevation: 2,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		marginBottom: 16,
	},
	text: {
		...style.largeMediumNeutral,
		color: color.white,
		textAlign: 'center',
		alignSelf: 'center',
	},
});

class AcceptButton extends React.PureComponent {
	render() {
		const { onPress } = this.props;
		return (
			<TouchableHighlight
				underlayColor={color.seafoamGreen}
				style={styles.container}
				onPress={() => onPress()}
			>
				<Text style={styles.text}>{I18n.t('common.accept.text')}</Text>
			</TouchableHighlight>
		);
	}
}
export default AcceptButton;