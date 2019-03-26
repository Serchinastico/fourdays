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
});

const App = () => (
	<View style={styles.container}>
		<ScrollView>
			<View style={{ height: 80 }} />
			<SetupDescription />
			<SetupFoodGroup name="Grupo 1" />
			<SetupFoodGroup name="Grupo 2" />
			<SetupFoodGroup name="Grupo 3" />
			<SetupFoodGroup name="Grupo 4" />
			<View style={{ height: 20 }} />
		</ScrollView>
		<SearchBar />
	</View>
);

export default App;
