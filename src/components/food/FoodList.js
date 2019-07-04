import * as R from "ramda";
import React from "react";
import { FlatList, View, Text } from "react-native";
import addItemToListIfPresentRemoveOtherwise from "../../common/collections";
import fuzzySearch from "../../FuzzySearch";
import FoodGroupHeader from "./FoodGroupHeader";
import FoodRow from "./FoodRow";
import EmptySearch from "../EmptySearch";
import FoodListDescription from "./FoodListDescription";
import { style } from "../style/style";
import I18n from "../../translations/i18n";

const PADDING_ITEM = "Padding";
const GROUP_ITEM = "Group";
const DESCRIPTION_ITEM = "Description";
const HEADER_ITEM = "Header";
const SUBHEADER_ITEM = "Subheader";
const FOOD_ROW_ITEM = "Row";

class FoodList extends React.PureComponent {
	static createPaddingItem(height, keyPrefix) {
		return {
			type: PADDING_ITEM,
			key: `${keyPrefix}-padding`,
			payload: { height }
		};
	}

	static createGroupItem(id, name, children, containsSubgroups) {
		return {
			type: GROUP_ITEM,
			payload: {
				id,
				name,
				children,
				containsSubgroups: containsSubgroups || false
			}
		};
	}

	static createItem(id, keyPrefix, name, thumbnail) {
		return { id, keyPrefix, name, thumbnail };
	}

	static createDescriptionItem(description, marginTop) {
		return {
			type: DESCRIPTION_ITEM,
			payload: {
				description,
				marginTop
			}
		};
	}

	constructor(props) {
		super(props);
		this.renderItem = this.renderItem.bind(this);
		this.onGroupSelected = this.onGroupSelected.bind(this);
		this.onFoodSelected = this.onFoodSelected.bind(this);
		this.state = { expandedGroupIds: [] };
	}

	onGroupSelected(id) {
		const { expandedGroupIds } = this.state;

		this.setState({
			expandedGroupIds: addItemToListIfPresentRemoveOtherwise(
				id,
				expandedGroupIds
			)
		});
	}

	onFoodSelected(id) {
		const { onFoodSelected } = this.props;
		onFoodSelected(id);
	}

	static getSubheaderText(daysSinceLastConsumption) {
		switch (daysSinceLastConsumption) {
			case 0:
				return I18n.t("screen.dailyTracker.subgroup.available");
			case 1:
				return I18n.t("screen.dailyTracker.subgroup.singular").replace(
					"%s",
					daysSinceLastConsumption
				);
			default:
				return I18n.t("screen.dailyTracker.subgroup.plural").replace(
					"%s",
					daysSinceLastConsumption
				);
		}
	}

	getAllFoodItems(items) {
		return R.chain(item => {
			if (item.type === GROUP_ITEM) {
				if (item.payload.id === "Forbidden food") {
					return R.flatten(R.values(item.payload.children));
				} else {
					return item.payload.children;
				}
			} else {
				return [];
			}
		}, items);
	}

	mapFoodSubgroupsIntoRows(subgroups) {
		const subgroupTuples = R.pipe(
			R.toPairs,
			R.reverse
		)(subgroups);
		return R.chain(tuple => {
			return [
				{
					type: SUBHEADER_ITEM,
					key: `subheader#${tuple[0]}`,
					payload: {
						daysSinceLastConsumption: 4 - tuple[0]
					}
				},
				...this.mapFoodItemsIntoRows(tuple[1])
			];
		}, subgroupTuples);
	}

	mapFoodItemsIntoRows(foodItems) {
		let { selectedFoodIds, looksAlwaysSelected } = this.props;
		looksAlwaysSelected = looksAlwaysSelected || false;

		const foodItemsWithSelection = R.map(item => {
			return {
				...item,
				isSelected: looksAlwaysSelected || selectedFoodIds.includes(item.id)
			};
		}, foodItems);

		return R.splitEvery(3, foodItemsWithSelection).map(row => {
			return {
				type: FOOD_ROW_ITEM,
				key: `${row[0].keyPrefix}${row[0].id}`,
				payload: row
			};
		});
	}

	mapGroupChildrenIntoRows(payload) {
		if (payload.containsSubgroups) {
			return this.mapFoodSubgroupsIntoRows(payload.children);
		} else {
			return this.mapFoodItemsIntoRows(payload.children);
		}
	}

	mapGroupItemToFlatListItems(payload, shouldIncludeChildren) {
		const items = shouldIncludeChildren
			? this.mapGroupChildrenIntoRows(payload)
			: [];

		return [
			{
				type: HEADER_ITEM,
				key: payload.id,
				payload: {
					id: payload.id,
					name: payload.name,
					hasFood: items.length > 0
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
				case PADDING_ITEM:
					return [item];
				case GROUP_ITEM:
					return this.mapGroupItemToFlatListItems(
						item.payload,
						expandedGroupIds.includes(item.payload.id)
					);
			}
		}, items);
	}

	mapToFlatListItemsWithSearchExpression(items, searchExpression) {
		const {
			paddingTopForEmptySearch,
			paddingBottomForSearch,
			showSubgroupsWhenSearching,
			daysSinceConsumptionByFoodId
		} = this.props;
		const allFoodItems = this.getAllFoodItems(items);

		const filteredItems = R.uniqBy(
			food => food.name,
			fuzzySearch(searchExpression, "name", allFoodItems)
		);

		if (showSubgroupsWhenSearching) {
			const searchItems = R.groupBy(
				item => daysSinceConsumptionByFoodId[item.id],
				filteredItems
			);

			return [
				FoodList.createPaddingItem(88, "searchListTopPadding"),
				...this.mapGroupChildrenIntoRows(
					FoodList.createGroupItem(
						"Forbidden food",
						"Forbidden food",
						searchItems,
						true
					).payload
				),
				FoodList.createPaddingItem(
					paddingBottomForSearch || 0,
					"searchListBottomPadding"
				)
			];
		}

		return [
			FoodList.createPaddingItem(
				paddingTopForEmptySearch,
				"searchListTopPadding"
			),
			...this.mapFoodItemsIntoRows(filteredItems),
			FoodList.createPaddingItem(
				paddingBottomForSearch || 0,
				"searchListBottomPadding"
			)
		];
	}

	static renderDescriptionItem(payload) {
		return (
			<View style={{ marginTop: payload.marginTop }}>
				<FoodListDescription description={payload.description} />
			</View>
		);
	}

	renderHeaderItem(payload) {
		const { expandedGroupIds } = this.state;
		return (
			<FoodGroupHeader
				id={payload.id}
				isOpen={payload.hasFood && expandedGroupIds.includes(payload.id)}
				name={payload.name}
				onGroupSelected={this.onGroupSelected}
			/>
		);
	}

	static renderSubheaderItem(payload) {
		const text = FoodList.getSubheaderText(payload.daysSinceLastConsumption);

		return (
			<View
				style={{ flex: 1, height: 16, marginHorizontal: 16, marginBottom: 16 }}
			>
				<Text style={style.midRegularNeutral}>{text}</Text>
			</View>
		);
	}

	renderFoodRowItem(payload) {
		const { looksAlwaysSelected } = this.props;
		return (
			<FoodRow
				onFoodSelected={this.onFoodSelected}
				items={payload}
				shouldAnimateOnSelected={!looksAlwaysSelected}
			/>
		);
	}

	renderItem({ item }) {
		switch (item.type) {
			case PADDING_ITEM:
				return <View style={{ height: item.payload.height }} />;
			case DESCRIPTION_ITEM:
				return FoodList.renderDescriptionItem(item.payload);
			case HEADER_ITEM:
				return this.renderHeaderItem(item.payload);
			case SUBHEADER_ITEM:
				return FoodList.renderSubheaderItem(item.payload);
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

		if (searchExpression !== "" && flatListItems.length === 2) {
			return <EmptySearch style={{ flex: 1 }} />;
		} else {
			return <FlatList data={flatListItems} renderItem={this.renderItem} />;
		}
	}
}

export default FoodList;
