import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as R from 'ramda';
import SetupFoodGroupHeader from './SetupFoodGroupHeader';
import FoodItem from '../../common/FoodItem';
import I18n from '../../translations/i18n';

const styles = StyleSheet.create({
	container: {
		margin: 16,
	},
	headerContainer: {
		marginBottom: 16,
	},
	itemsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

class SetupFoodGroup extends React.Component {
	renderRow(foodRow) {
		const foodItems = R.map(
			food => (
				<FoodItem
					key={food.id}
					name={I18n.t(food.nameTranslationKey)}
					thumbnailUrl={food.thumbnailProvider()}
				/>
			),
			foodRow
		);

		while (foodItems.length < 3) {
			foodItems.push(<View style={{ width: 104 }} key={foodItems.length} />);
		}

		return (
			<View key={foodRow[0].id} style={styles.itemsContainer}>
				{foodItems}
			</View>
		);
	}

	renderFoodIfOpen() {
		const { foods, isOpen } = this.props;
		if (isOpen) {
			const foodRows = R.splitEvery(3, foods);
			const allRows = R.map(this.renderRow, foodRows);

			return <View>{allRows}</View>;
		}
	}

	render() {
		const { name, isOpen } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<SetupFoodGroupHeader isOpen={isOpen} name={name} />
				</View>
				{this.renderFoodIfOpen()}
			</View>
		);
	}
}

export default SetupFoodGroup;
