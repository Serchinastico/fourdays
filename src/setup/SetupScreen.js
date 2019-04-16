import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as R from "ramda";
import FoodList from "../components/FoodList";
import SearchBar from "../components/SearchBar";
import AcceptButton from "../components/AcceptButton";
import storeForbiddenFood from "./actions";
import I18n from "../translations/i18n";
import { style, color } from "../components/style/style";

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
		bottom: 16,
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

class SetupScreen extends React.Component {
	constructor(props) {
		super(props);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onAcceptPress = this.onAcceptPress.bind(this);
		this.onFoodSelected = this.onFoodSelected.bind(this);
		this.state = {
			currentSearch: "",
			selectedFoodIds: []
		};
	}

	onAcceptPress() {
		const { storeForbiddenFood, navigation } = this.props;
		const { selectedFoodIds } = this.state;
		storeForbiddenFood(selectedFoodIds);
		navigation.navigate("DailyTracker");
	}

	onFoodSelected(foodIds) {
		this.setState({ selectedFoodIds: foodIds });
	}

	onSearchChange(text) {
		this.setState({ currentSearch: text });
	}

	getChildrenFromGroup(group) {
		const { foods } = this.props;

		return R.filter(food => {
			return food.groupId === group.id;
		}, foods).map(food => {
			return FoodList.createItem(
				food.id,
				I18n.t(food.nameTranslationKey),
				food.thumbnailProvider
			);
		});
	}

	renderFoodList() {
		const { groups } = this.props;
		const { currentSearch } = this.state;

		const groupItems = R.map(group => {
			return FoodList.createGroupItem(
				group.id,
				I18n.t(group.nameTranslationKey),
				this.getChildrenFromGroup(group)
			);
		}, groups);

		const items = [
			FoodList.createDescriptionItem(
				I18n.t("screen.setup.description.title"),
				I18n.t("screen.setup.description.text")
			),
			...groupItems
		];

		return (
			<FoodList
				items={items}
				searchExpression={currentSearch}
				onFoodSelected={this.onFoodSelected}
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
				<View style={styles.footer}>
					<AcceptButton onPress={this.onAcceptPress} />
				</View>
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		groups: state.setup.groups,
		foods: state.setup.foods
	};
}

export default connect(
	mapStateToProps,
	{ storeForbiddenFood }
)(SetupScreen);
