import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaConsumer } from "react-native-safe-area-context";
import { connect } from "react-redux";
import * as R from "ramda";
import addItemToListIfPresentRemoveOtherwise from "../common/collections";
import AcceptButton from "../components/AcceptButton";
import IconButton, {
	IconButtonClear,
	IconButtonSearch
} from "../components/IconButton";
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

class SetupScreen extends React.Component {
	constructor(props) {
		super(props);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onAcceptPress = this.onAcceptPress.bind(this);
		this.onClosePress = this.onClosePress.bind(this);
		this.onFoodSelected = this.onFoodSelected.bind(this);
		this.onSearchPressed = this.onSearchPressed.bind(this);
		const { foods, forbiddenFoodIdsOnStart } = this.props;
		this.state = {
			currentSearch: "",
			isSearchActive: false,
			selectedFoodIds: R.pipe(
				R.map(f => f.id),
				R.filter(id => !forbiddenFoodIdsOnStart.includes(id))
			)(foods)
		};
	}

	onAcceptPress() {
		const { storeForbiddenFood, foods } = this.props;
		const { selectedFoodIds } = this.state;
		const forbiddenFoodIds = R.without(
			selectedFoodIds,
			R.map(f => f.id, foods)
		);
		storeForbiddenFood(forbiddenFoodIds);

		this.close();
	}

	onClosePress() {
		this.close();
	}

	onFoodSelected(foodId) {
		const { selectedFoodIds } = this.state;
		const updatedSelectedFoodIds = addItemToListIfPresentRemoveOtherwise(
			foodId,
			selectedFoodIds
		);
		this.setState({ selectedFoodIds: updatedSelectedFoodIds });
	}

	onSearchChange(text) {
		this.setState({ currentSearch: text });
	}

	onSearchPressed() {
		this.setState({ isSearchActive: true });
	}

	getChildrenFromGroup(group) {
		const { foods } = this.props;

		const filterByGroupId = R.filter(food => food.groupId === group.id);
		const mapToFoodListItem = R.map(food =>
			FoodList.createItem(food.id, "Group food", food.name, food.image)
		);
		const sortByName = R.sortBy(item => item.name);

		return R.pipe(
			filterByGroupId,
			mapToFoodListItem,
			sortByName
		)(foods);
	}

	close() {
		const { navigation } = this.props;
		const isModalNavigation = navigation.getParam("isModalNavigation") || false;
		if (isModalNavigation) {
			navigation.pop();
		} else {
			navigation.navigate("DailyTracker");
		}
	}

	renderFoodList(insets) {
		const { groups } = this.props;
		const { currentSearch, selectedFoodIds } = this.state;

		const groupItems = R.map(group => {
			return FoodList.createGroupItem(
				group.id,
				group.name,
				this.getChildrenFromGroup(group)
			);
		}, groups);

		const items = [
			FoodList.createDescriptionItem(
				I18n.t("screen.setup.description.text"),
				80
			),
			...groupItems,
			FoodList.createPaddingItem(80, "bottomPadding")
		];

		return (
			<View style={{ flex: 1, marginTop: insets.top }}>
				<FoodList
					items={items}
					selectedFoodIds={selectedFoodIds}
					searchExpression={currentSearch}
					onFoodSelected={this.onFoodSelected}
				/>
			</View>
		);
	}

	renderTopAppBarButtons() {
		const { navigation } = this.props;
		const isModalNavigation = navigation.getParam("isModalNavigation") || false;

		if (isModalNavigation) {
			return (
				<View style={{ flexDirection: "row" }}>
					<IconButton
						icon={IconButtonSearch}
						onPressed={this.onSearchPressed}
					/>
					<IconButton icon={IconButtonClear} onPressed={this.onClosePress} />
				</View>
			);
		} else {
			return (
				<IconButton icon={IconButtonSearch} onPressed={this.onSearchPressed} />
			);
		}
	}

	renderTopBar() {
		const { isSearchActive } = this.state;

		return isSearchActive ? (
			<TopSearchBar
				onBackPress={() => this.setState({ isSearchActive: false })}
				onChangeText={this.onSearchChange}
			/>
		) : (
			<TopAppBar
				title={I18n.t("screen.setup.title")}
				buttons={this.renderTopAppBarButtons()}
			/>
		);
	}

	renderWithInsets(insets) {
		return (
			<View style={styles.container}>
				{this.renderFoodList(insets)}
				{this.renderTopBar()}
				<AcceptButton onPress={this.onAcceptPress} />
			</View>
		);
	}

	render() {
		return (
			<SafeAreaConsumer>
				{insets => this.renderWithInsets(insets)}
			</SafeAreaConsumer>
		);
	}
}

function mapStateToProps(state) {
	return {
		groups: state.setup.groups,
		foods: state.setup.foods,
		forbiddenFoodIdsOnStart: state.setup.forbiddenFoodIds || []
	};
}

export default connect(
	mapStateToProps,
	{ storeForbiddenFood }
)(SetupScreen);
