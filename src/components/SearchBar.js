import React from 'react';
import { Image, TextInput, StyleSheet, View } from 'react-native';

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
		<TextInput style={styles.textInput} placeholder="Buscar un alimento" />
	</View>
);

export default SearchBar;
