import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaConsumer } from "react-native-safe-area-context";
import { connect } from "react-redux";
import * as R from "ramda";
import addItemToListIfPresentRemoveOtherwise from "../common/collections";
import AcceptButton from "../components/AcceptButton";
import IconButton, { Icon } from "../components/IconButton";
import FoodList from "../components/food/FoodList";
import TopAppBar from "../components/TopAppBar";
import TopSearchBar from "../components/TopSearchBar";
import storeForbiddenFood from "./actions";
import I18n from "../translations/i18n";
import { color } from "../components/style/color";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.white
	},
	footer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0
	},
	itemsContainer: {
		padding: 16,
		flexDirection: "row",
		justifyContent: "space-between"
	}
});

interface SetupScreenProps {
	foods: any[];
	groups: any[];
	forbiddenFoodIdsOnStart: string[];
	storeForbiddenFood: (foodIds: string[]) => void;
	navigation: any;
}

const SetupScreen = ({
	foods,
	groups,
	forbiddenFoodIdsOnStart,
	storeForbiddenFood,
	navigation
}: SetupScreenProps) => {
	const [currentSearch, setCurrentSearch] = useState("");
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [selectedFoodIds, setSelectedFoodIds] = useState(
		R.pipe(
			R.map((f: any) => f.id),
			R.filter((id: string) => !forbiddenFoodIdsOnStart.includes(id))
		)(foods)
	);

	const close = () => {
		const isModalNavigation = navigation.getParam("isModalNavigation") || false;
		if (isModalNavigation) {
			navigation.pop();
		} else {
			navigation.navigate("DailyTracker");
		}
	};

	const onAcceptPress = () => {
		const forbiddenFoodIds = R.without(
			selectedFoodIds,
			R.map(f => f.id, foods)
		);
		storeForbiddenFood(forbiddenFoodIds);

		close();
	};

	const onClosePress = () => {
		close();
	};

	const onFoodSelect = (foodId: string) => {
		const updatedSelectedFoodIds = addItemToListIfPresentRemoveOtherwise(
			foodId,
			selectedFoodIds
		);
		setSelectedFoodIds(updatedSelectedFoodIds);
	};

	const onNewGroupSelected = () => {
		navigation.navigate("CreateGroup", { isModalNavigation: true });
	};

	const onSearchChange = (text: string) => {
		setCurrentSearch(text);
	};

	const onSearchPress = () => {
		setIsSearchActive(true);
	};

	const onAddPress = () => {
		navigation.navigate("AddFood", { foodName: "", isModalNavigation: true });
	};

	const getChildrenFromGroup = (group: any) => {
		const filteredFoods = foods
			.filter((food: any) => food.groupId === group.id)
			.map((food: any) =>
				FoodList.createItem(food.id, "Group food", food.name, food.image)
			);
		return R.sortBy((item: any) => item.name)(filteredFoods);
	};

	const renderFoodList = (insets: any) => {
		const groupItems = R.map(group => {
			return FoodList.createGroupItem(
				group.id,
				group.name,
				getChildrenFromGroup(group)
			);
		}, groups);

		const items = [
			FoodList.createDescriptionItem(
				I18n.t("screen.setup.description.text"),
				80
			),
			...groupItems,
			FoodList.createNewGroup(),
			FoodList.createPaddingItem(80, "bottomPadding")
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

	const renderTopAppBarButtons = () => {
		const isModalNavigation = navigation.getParam("isModalNavigation") || false;

		if (isModalNavigation) {
			return (
				<View style={{ flexDirection: "row" }}>
					<IconButton icon={Icon.Search} onPress={onSearchPress} />
					<IconButton icon={Icon.Add} onPress={onAddPress} />
					<IconButton icon={Icon.Clear} onPress={onClosePress} />
				</View>
			);
		} else {
			return (
				<View style={{ flexDirection: "row" }}>
					<IconButton icon={Icon.Search} onPress={onSearchPress} />
					<IconButton icon={Icon.Add} onPress={onAddPress} />
				</View>
			);
		}
	};

	const renderTopBar = () => {
		return isSearchActive ? (
			<TopSearchBar
				onBackPress={() => setIsSearchActive(false)}
				onChangeText={onSearchChange}
			/>
		) : (
			<TopAppBar
				title={I18n.t("screen.setup.title")}
				buttons={renderTopAppBarButtons()}
			/>
		);
	};

	const renderWithInsets = (insets: any) => {
		return (
			<View style={styles.container}>
				{renderFoodList(insets)}
				{renderTopBar()}
				<AcceptButton onPress={onAcceptPress} isEnabled />
			</View>
		);
	};

	return (
		<SafeAreaConsumer>{insets => renderWithInsets(insets)}</SafeAreaConsumer>
	);
};

function mapStateToProps(state: any) {
	return {
		groups: state.setup.groups,
		foods: state.setup.foods,
		forbiddenFoodIdsOnStart: state.setup.forbiddenFoodIds || []
	};
}

export default connect(mapStateToProps, { storeForbiddenFood })(SetupScreen);
