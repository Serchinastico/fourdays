import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import SetupFoodGroupHeader from './SetupFoodGroupHeader';
import FoodItem from '../common/FoodItem';

const styles = StyleSheet.create({
	container: {
		margin: 16,
	},
	headerContainer: {
		marginBottom: 16,
	},
	itemsContainer: {
		flexDirection: 'row',
		alignContent: 'space-between',
		justifyContent: 'space-between',
	},
});

const SetupFoodGroup = ({ name }) => (
	<View style={styles.container}>
		<View style={styles.headerContainer}>
			<SetupFoodGroupHeader isOpen name={name} />
		</View>
		<View style={styles.itemsContainer}>
			<FoodItem name="Cebolla" thumbnailUrl="" />
			<FoodItem name="Lechuga" thumbnailUrl="" />
			<FoodItem name="Guisantes" thumbnailUrl="" />
		</View>
		<View style={styles.itemsContainer}>
			<FoodItem name="Cebolla" thumbnailUrl="" />
			<FoodItem name="Lechuga" thumbnailUrl="" />
			<FoodItem name="Guisantes" thumbnailUrl="" />
		</View>
	</View>
);

SetupFoodGroup.propTypes = {
	name: PropTypes.string.isRequired,
};

export default SetupFoodGroup;
