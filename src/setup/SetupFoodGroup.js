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
			<FoodItem name="Cebolla" thumbnailUrl={require('../images/food/cebolla.jpg')} />
			<FoodItem name="Lechuga" thumbnailUrl={require('../images/food/Lechuga.png')} />
			<FoodItem name="Guisantes" thumbnailUrl={require('../images/food/guisantes.jpg')} />
		</View>
		<View style={styles.itemsContainer}>
			<FoodItem name="Batata" thumbnailUrl={require('../images/food/sweetPotato.jpg')} />
			<FoodItem name="Cerezas" thumbnailUrl={require('../images/food/cerezas.jpg')} />
			<FoodItem name="Garbanzos" thumbnailUrl={require('../images/food/garbanzos.jpg')} />
		</View>
	</View>
);

SetupFoodGroup.propTypes = {
	name: PropTypes.string.isRequired,
};

export default SetupFoodGroup;
