import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SearchBar from './components/SearchBar';
import SetupDescription from './components/setup/SetupDescription';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
});

const App = () => (
	<View style={styles.container}>
		<SearchBar />
		<ScrollView>
			<SetupDescription />
		</ScrollView>
	</View>
);

export default App;
