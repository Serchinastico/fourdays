import React from "react";
import { View, FlatList } from "react-native";
import * as R from "ramda";
import SetupFoodGroupHeader from "../setup/components/SetupFoodGroupHeader";
import SetupFoodRow from "../setup/components/SetupFoodRow";
import fuzzySearch from "../FuzzySearch";
import EmptySearch from "./EmptySearch";
import FoodListDescription from "./FoodListDescription";

const PADDING_ITEM = "Padding";
const GROUP_ITEM = "Group";
const DESCRIPTION_ITEM = "Description";
const HEADER_ITEM = "Header";
const FOOD_ROW_ITEM = "Row";

class FoodList extends React.PureComponent {
	static createPaddingItem(height) {
		return { type: PADDING_ITEM, key: PADDING_ITEM, payload: height };
	}

	static createGroupItem(id, name, children) {
		return {
			type: GROUP_ITEM,
			payload: { id, name, children }
		};
	}

	static createItem(id, name, thumbnailProvider) {
		return { id, name, thumbnailProvider };
	}

	static createDescriptionItem(title, description, marginTop) {
		return {
			type: DESCRIPTION_ITEM,
			payload: {
				title,
				description,
				marginTop
			}
		};
	}

	static addOrRemoveIdToListOfIds(id, list) {
		if (list.includes(id)) {
			return R.without([id], list);
		} else {
			return R.append(id, list);
		}
	}

	constructor(props) {
		super(props);
		this.renderItem = this.renderItem.bind(this);
		this.onGroupSelected = this.onGroupSelected.bind(this);
		this.onFoodSelected = this.onFoodSelected.bind(this);
		this.state = { expandedGroupIds: [], selectedFoodIds: [] };
	}

	onGroupSelected(id) {
		const { expandedGroupIds } = this.state;

		this.setState({
			expandedGroupIds: FoodList.addOrRemoveIdToListOfIds(id, expandedGroupIds)
		});
	}

	onFoodSelected(id) {
		const { selectedFoodIds } = this.state;
		const { onFoodSelected } = this.props;

		const updatedFoodIds = FoodList.addOrRemoveIdToListOfIds(
			id,
			selectedFoodIds
		);
		this.setState({ selectedFoodIds: updatedFoodIds });
		onFoodSelected(updatedFoodIds);
	}

	mapFoodItemsIntoRows(foodItems) {
		const { selectedFoodIds } = this.state;

		const foodItemsWithSelection = R.map(item => {
			return { ...item, isSelected: selectedFoodIds.includes(item.id) };
		}, foodItems);

		return R.splitEvery(3, foodItemsWithSelection).map(row => {
			return {
				type: FOOD_ROW_ITEM,
				key: row[0].id,
				payload: row
			};
		});
	}

	mapGroupItemToFlatListItems(payload, shouldIncludeChildren) {
		const items = shouldIncludeChildren
			? this.mapFoodItemsIntoRows(payload.children)
			: [];

		return [
			{
				type: HEADER_ITEM,
				key: payload.id,
				payload: {
					id: payload.id,
					name: payload.name
				}
			},
			...items
		];
	}

	mapToFlatListItems(items) {
		const { expandedGroupIds } = this.state;

		return R.chain(item => {
			switch (item.type) {
				case DESCRIPTION_ITEM:
					return [{ ...item, key: item.type }];
				case GROUP_ITEM:
					return this.mapGroupItemToFlatListItems(
						item.payload,
						expandedGroupIds.includes(item.payload.id)
					);
			}
		}, items);
	}

	mapToFlatListItemsWithSearchExpression(items, searchExpression) {
		const { paddingTopForEmptySearch } = this.props;
		const allFoodItems = R.chain(item => {
			return item.type === GROUP_ITEM ? item.payload.children : [];
		}, items);
		const filteredItems = fuzzySearch(searchExpression, "name", allFoodItems);
		return [
			FoodList.createPaddingItem(paddingTopForEmptySearch),
			...this.mapFoodItemsIntoRows(filteredItems)
		];
	}

	static renderDescriptionItem(payload) {
		return (
			<View style={{ marginTop: payload.marginTop }}>
				<FoodListDescription
					title={payload.title}
					description={payload.description}
				/>
			</View>
		);
	}

	renderHeaderItem(payload) {
		const { expandedGroupIds } = this.state;
		return (
			<SetupFoodGroupHeader
				id={payload.id}
				isOpen={expandedGroupIds.includes(payload.id)}
				name={payload.name}
				onGroupSelected={this.onGroupSelected}
			/>
		);
	}

	renderFoodRowItem(payload) {
		return (
			<SetupFoodRow onFoodSelected={this.onFoodSelected} items={payload} />
		);
	}

	renderItem({ item }) {
		switch (item.type) {
			case PADDING_ITEM:
				return <View style={{ height: item.payload }} />;
			case DESCRIPTION_ITEM:
				return FoodList.renderDescriptionItem(item.payload);
			case HEADER_ITEM:
				return this.renderHeaderItem(item.payload);
			case FOOD_ROW_ITEM:
				return this.renderFoodRowItem(item.payload);
		}
	}

	render() {
		const { items, searchExpression } = this.props;

		const flatListItems =
			searchExpression === ""
				? this.mapToFlatListItems(items)
				: this.mapToFlatListItemsWithSearchExpression(items, searchExpression);

		if (searchExpression !== "" && flatListItems.length === 1) {
			return <EmptySearch />;
		} else {
			return <FlatList data={flatListItems} renderItem={this.renderItem} />;
		}
	}
}

export default FoodList;
