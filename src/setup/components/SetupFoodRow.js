import React from "react";
import { StyleSheet, View } from "react-native";
import * as R from "ramda";
import FoodItem from "../../components/FoodItem";

const styles = StyleSheet.create({
	itemsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginLeft: 16,
		marginRight: 16
	}
});

class SetupFoodRow extends React.PureComponent {
	constructor(props) {
		super(props);
		this.renderFood = this.renderFood.bind(this);
	}

	fillWithEmptyViewsToRenderWithEqualSpacing(foodItems) {
		const numberOfItemsToAdd = R.max(0, 3 - foodItems.length);

		const padding = R.range(0, numberOfItemsToAdd).map(i => (
			<View style={{ width: "30%" }} key={`${foodItems}-${i}`} />
		));

		return R.concat(foodItems, padding);
	}

	renderFood(food) {
		const { onFoodSelected } = this.props;

		return (
			<FoodItem
				id={food.id}
				key={food.id}
				name={food.name}
				thumbnailUrl={food.thumbnailProvider()}
				onFoodSelected={onFoodSelected}
				isSelected={food.isSelected}
			/>
		);
	}

	render() {
		const { items } = this.props;

		const foodItems = R.map(this.renderFood, items);
		const foodItemsPadded = this.fillWithEmptyViewsToRenderWithEqualSpacing(
			foodItems
		);
		const rowKey = items[0].id;

		return (
			<View key={rowKey} style={styles.itemsContainer}>
				{foodItemsPadded}
			</View>
		);
	}
}

export default SetupFoodRow;
