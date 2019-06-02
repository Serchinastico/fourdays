import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import addItemToListIfPresentRemoveOtherwise from "../../common/collections";
import FoodList from "../../components/food/FoodList";
import SearchBar from "../../components/SearchBar";
import storeForbiddenFood from "../actions";
import I18n from "../../translations/i18n";
import { style, color } from "../../components/style/style";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.white
	},
	header: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		padding: 16
	},
	footer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0
	},
	emptyCaseContainer: {
		height: "100%",
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center"
	},
	emptyCaseText: {
		...style.largeMediumNeutral,
		textAlign: "center",
		color: color.brownGray,
		marginTop: 8,
		marginLeft: 48,
		marginRight: 48
	},
	itemsContainer: {
		padding: 16,
		flexDirection: "row",
		justifyContent: "space-between"
	}
});

class SetupSearchScreen extends React.Component {
	constructor(props) {
		super(props);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onFoodSelected = this.onFoodSelected.bind(this);
		const { foods, forbiddenFoodIdsOnStart } = this.props;
		this.state = {
			currentSearch: "",
			selectedFoodIds: R.pipe(
				R.map(f => f.id),
				R.filter(id => !forbiddenFoodIdsOnStart.includes(id))
			)(foods)
		};
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

	getChildrenFromGroup(group) {
		const { foods } = this.props;

		const filterByGroupId = R.filter(food => food.groupId === group.id);
		const mapToFoodListItem = R.map(food =>
			FoodList.createItem(
				food.id,
				"Group food",
				I18n.t(food.nameTranslationKey),
				food.thumbnail
			)
		);
		const sortByName = R.sortBy(item => item.name);

		return R.pipe(
			filterByGroupId,
			mapToFoodListItem,
			sortByName
		)(foods);
	}

	renderFoodList() {
		const { groups } = this.props;
		const { currentSearch, selectedFoodIds } = this.state;

		const groupItems = R.map(group => {
			return FoodList.createGroupItem(
				group.id,
				I18n.t(group.nameTranslationKey),
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
			<FoodList
				items={items}
				selectedFoodIds={selectedFoodIds}
				searchExpression={currentSearch}
				onFoodSelected={this.onFoodSelected}
				paddingTopForEmptySearch={98}
				paddingBottomForSearch={80}
			/>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderFoodList()}
				<View style={styles.header}>
					<SearchBar onChangeText={this.onSearchChange} />
				</View>
			</View>
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
)(SetupSearchScreen);
