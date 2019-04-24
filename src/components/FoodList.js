import React from "react";
import { View, Dimensions } from "react-native";
import * as R from "ramda";
import DataProvider from "recyclerlistview/dist/reactnative/core/dependencies/DataProvider";
import LayoutProvider from "recyclerlistview/dist/reactnative/core/dependencies/LayoutProvider";
import RecyclerListView from "recyclerlistview/dist/reactnative/core/RecyclerListView";
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

	static createItem(id, name, thumbnailUrl) {
		return { id, name, thumbnailUrl };
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

	renderItem({ type, data }) {
		switch (type) {
			case PADDING_ITEM:
				return <View style={{ height: data.payload }} />;
			case DESCRIPTION_ITEM:
				return FoodList.renderDescriptionItem(data.payload);
			case HEADER_ITEM:
				return this.renderHeaderItem(data.payload);
			case FOOD_ROW_ITEM:
				return this.renderFoodRowItem(data.payload);
		}
	}

	render() {
		const { items, searchExpression } = this.props;

		const flatListItems =
			searchExpression === ""
				? this.mapToFlatListItems(items)
				: this.mapToFlatListItemsWithSearchExpression(items, searchExpression);

		const dataProvider = new DataProvider((r1, r2) => {
			return r1 !== r2;
		});

		let { width } = Dimensions.get("window");

		const layoutProvider = new LayoutProvider(
			index => {
				return flatListItems[index].type;
			},
			(type, dim) => {
				switch (type) {
					case PADDING_ITEM:
						dim.width = width;
						dim.height = 90;
						break;
					case DESCRIPTION_ITEM:
						dim.width = width;
						dim.height = 100;
						break;
					case HEADER_ITEM:
						dim.width = width;
						dim.height = 48;
						break;
					case FOOD_ROW_ITEM:
						dim.width = width;
						dim.height = 104;
						break;
				}
			}
		);

		if (searchExpression !== "" && flatListItems.length === 1) {
			return <EmptySearch />;
		} else {
			return (
				<RecyclerListView
					dataProvider={dataProvider}
					layoutProvider={layoutProvider}
					rowRenderer={this.renderItem}
				/>
			);
		}
	}
}

export default FoodList;
