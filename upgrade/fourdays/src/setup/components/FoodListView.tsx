import * as R from 'ramda';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import FoodList from '../../components/food/FoodList';
import { color } from '../../components/style/color';
import I18n from '../../translations/i18n';

interface FoodListViewProps {
	insets: any;
	foods: any[];
	groups: any[];
	selectedFoodIds: any;
	currentSearch: any;
	onFoodSelect: any;
	onNewGroupSelected: any;
}

export const FoodListView = ({
	insets,
	foods,
	groups,
	selectedFoodIds,
	currentSearch,
	onFoodSelect,
	onNewGroupSelected,
}: FoodListViewProps) => {
	const getChildrenFromGroup = (group: any) => {
		const filteredFoods = foods
			.filter(food => food.groupId === group.id)
			.map(food =>
				FoodList.createItem(food.id, 'Group food', food.name, food.image),
			);
		return R.sortBy(item => item.name)(filteredFoods);
	};

	const groupItems = R.map(group => {
		return FoodList.createGroupItem(
			group.id,
			group.name,
			getChildrenFromGroup(group),
		);
	}, groups);

	const items = [
		FoodList.createDescriptionItem(I18n.t('screen.setup.description.text'), 80),
		...groupItems,
		FoodList.createNewGroup(),
		FoodList.createPaddingItem(80, 'bottomPadding'),
	];

	return (
		<View style={{ flex: 1, marginTop: insets.top }}>
			<FoodList
				items={items}
				selectedFoodIds={selectedFoodIds}
				searchExpression={currentSearch}
				onFoodSelected={onFoodSelect}
				onNewGroupSelected={onNewGroupSelected}
			/>
		</View>
	);
};
