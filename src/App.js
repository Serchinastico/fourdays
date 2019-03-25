import React from 'react';
import { StyleSheet, View } from 'react-native';
import SearchBar from './components/SearchBar';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
});

const App = () => (
	<View style={styles.container}>
		<SearchBar />
	</View>
);

export default App;
