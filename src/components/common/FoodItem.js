import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, StyleSheet, View } from 'react-native';
import style from '../style/style';

const styles = StyleSheet.create({
	container: {
		width: 104,
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
	},
	name: {
		...style.midRegularPrimary,
		alignSelf: 'center',
		margin: 8,
	},
});

const FoodItem = ({ name }) => {
	return (
		<View style={styles.container}>
			<View style={styles.thumbnailContainer}>
				<Image style={styles.thumbnail} />
			</View>
			<Text style={styles.name}>{name}</Text>
		</View>
	);
};

FoodItem.propTypes = {
	name: PropTypes.string.isRequired,
};

export default FoodItem;
