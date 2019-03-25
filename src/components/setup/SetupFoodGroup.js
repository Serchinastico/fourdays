import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import SetupFoodGroupHeader from './SetupFoodGroupHeader';

const styles = StyleSheet.create({
	container: {
		margin: 16,
	},
});

const SetupFoodGroup = ({ name }) => (
	<View style={styles.container}>
		<SetupFoodGroupHeader isOpen name={name} />
	</View>
);

SetupFoodGroup.propTypes = {
	name: PropTypes.string.isRequired,
};

export default SetupFoodGroup;
