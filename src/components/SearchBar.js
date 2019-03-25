import React from 'react';
import { Image, TextInput, StyleSheet, View } from 'react-native';
import I18n from '../translations/i18n';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		top: 26,
		borderColor: '#EBEBEB',
		borderWidth: 1,
		borderRadius: 8,
		backgroundColor: '#FFF',
		elevation: 2,
		margin: 16,
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

const SearchBar = () => (
	<View style={styles.container}>
		<Image style={styles.icon} source={require('../images/icon/Search.png')} />
		<TextInput style={styles.textInput} placeholder={I18n.t('search.placeholder')} />
	</View>
);

export default SearchBar;
