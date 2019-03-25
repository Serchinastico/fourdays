import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SearchBar from './components/SearchBar';
import SetupDescription from './components/setup/SetupDescription';
import SetupFoodGroup from './components/setup/SetupFoodGroup';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	scrollView: {
		margin: 0,
	},
});

const App = () => (
	<View style={styles.container}>
		<SearchBar />
		<ScrollView contentContainerStyle={styles.scrollView}>
			<SetupDescription />
			<SetupFoodGroup name="Grupo 1" />
		</ScrollView>
	</View>
);

export default App;
