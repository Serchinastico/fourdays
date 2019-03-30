import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';
import style from '../components/style/style';

const styles = StyleSheet.create({
	container: {
		width: '30%',
	},
	thumbnailContainer: {
		borderRadius: 8,
		shadowRadius: 8,
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 0 },
		backgroundColor: '#FFF',
		elevation: 8,
	},
	thumbnail: {
		width: 104,
		height: 104,
		borderRadius: 8,
		resizeMode: 'contain',
	},
	name: {
		...style.midRegularPrimary,
		alignSelf: 'center',
		margin: 8,
	},
});

const FoodItem = ({ name, thumbnailUrl }) => {
	return (
		<View style={styles.container}>
			<View style={styles.thumbnailContainer}>
				<Image style={styles.thumbnail} source={thumbnailUrl} />
			</View>
			<Text style={styles.name}>{name}</Text>
		</View>
	);
};

export default FoodItem;
