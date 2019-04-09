import React from 'react';
import { Image, TextInput, StyleSheet, View } from 'react-native';
import I18n from '../translations/i18n';

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		padding: 16,
		position: 'absolute',
		top: 0,
		left: 0,
		elevation: 2,
		flex: 1,
		width: '100%',
		flexDirection: 'column',
		backgroundColor: 'transparent',
	},
	shadowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 8,
		borderColor: '#EBEBEB',
		borderWidth: 1,
		shadowRadius: 2,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 1 },
		backgroundColor: '#FFF',
		height: 48,
	},
	icon: {
		width: 24,
		height: 24,
		marginLeft: 16,
	},
	textInput: {
		marginLeft: 16,
	},
});

class SearchBar extends React.PureComponent {
	render() {
		const { onChangeText } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.shadowContainer}>
					<Image style={styles.icon} source={require('../images/icon/Search.png')} />
					<TextInput
						style={styles.textInput}
						placeholder={I18n.t('common.search.placeholder')}
						onChangeText={text => onChangeText(text)}
					/>
				</View>
			</View>
		);
	}
}
export default SearchBar;
