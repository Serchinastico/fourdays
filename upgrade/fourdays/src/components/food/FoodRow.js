import React from "react";
import { StyleSheet, View } from "react-native";
import * as R from "ramda";
import FoodItem from "./FoodItem";

const styles = StyleSheet.create({
	itemsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginLeft: 16,
		marginRight: 16,
		marginBottom: 24
	}
});

class FoodRow extends React.PureComponent {
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
		const { onFoodSelected, shouldAnimateOnSelected } = this.props;

		return (
			<FoodItem
				id={food.id}
				key={food.id}
				name={food.name}
				thumbnail={food.image}
				onFoodSelected={onFoodSelected}
				isSelected={food.isSelected}
				isAddFood={food.id === "meta:add-food"}
				shouldAnimate={shouldAnimateOnSelected}
			/>
		);
	}

	render() {
		const { items } = this.props;

		const foodItems = R.map(this.renderFood, items);
		const foodItemsPadded = this.fillWithEmptyViewsToRenderWithEqualSpacing(
			foodItems
		);

		return <View style={styles.itemsContainer}>{foodItemsPadded}</View>;
	}
}

export default FoodRow;
