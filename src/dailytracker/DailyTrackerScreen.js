import moment from "moment";
import * as R from "ramda";
import React from "react";
import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import { Dialog } from "react-native-popup-dialog/src";
import { connect } from "react-redux";
import FoodList from "../components/FoodList";
import SearchBar from "../components/SearchBar";
import I18n from "../translations/i18n";
import {
	dayFormatForStoringConsumedFoodIds,
	shareMonthlyReport,
	fetchForbiddenFoodForDay,
	storeConsumedFoodForDay
} from "./actions";
import DaySelector from "./components/DaySelector";
import { color } from "../components/style/style";
import DaySelectorCalendar from "./components/DaySelectorCalendar";

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
		height: 128,
		flexDirection: "column",
		backgroundColor: color.white
	},
	daySelector: {
		marginVertical: 16,
		marginHorizontal: 16
	},
	searchBarContainer: {
		flexDirection: "row",
		marginTop: 16,
		marginLeft: 16
	},
	setupIcon: { width: 48, height: 48 }
});

const FORBIDDEN_FOOD_GROUP_ID = "Forbidden food";
const CONSUMED_FOOD_GROUP_ID = "Consumed food";

class DailyTrackerScreen extends React.Component {
	constructor(props) {
		super(props);
		this.onFoodSelected = this.onFoodSelected.bind(this);
		this.onPreviousDayPressed = this.onPreviousDayPressed.bind(this);
		this.onNextDayPressed = this.onNextDayPressed.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSetupPressed = this.onSetupPressed.bind(this);
		this.onSharePressed = this.onSharePressed.bind(this);
		this.showCalendar = this.showCalendar.bind(this);
		this.hideCalendar = this.hideCalendar.bind(this);
		this.state = {
			isShowingCalendar: false,
			selectedDay: moment(),
			currentSearch: "",
			selectedFoodIds: []
		};
	}

	componentDidMount() {
		this.fetchFoodForSelectedDay();
	}

	componentDidUpdate() {
		this.fetchFoodForSelectedDay();
	}

	onFoodSelected(selectedId) {
		const { storeConsumedFoodForDay } = this.props;
		const { selectedDay } = this.state;

		storeConsumedFoodForDay(selectedId, selectedDay);
	}

	onSearchChange(text) {
		this.setState({ currentSearch: text });
	}

	onSetupPressed() {
		const { navigation } = this.props;
		navigation.navigate("Setup");
	}
	onSharePressed() {
		const { shareMonthlyReport, allFoods } = this.props;
		const { selectedDay } = this.state;

		const allFoodNamesById = {};
		for (let i = 0, size = allFoods.length; i < size; i++) {
			const food = allFoods[i];
			allFoodNamesById[food.id] = I18n.t(food.nameTranslationKey);
		}

		shareMonthlyReport(selectedDay, allFoodNamesById);
	}

	onPreviousDayPressed() {
		this.updateSelectedDay(selectedDay => {
			return selectedDay.subtract(1, "day");
		});
	}

	onNextDayPressed() {
		this.updateSelectedDay(selectedDay => {
			return selectedDay.add(1, "day");
		});
	}

	getChildrenFromGroup(group) {
		const { foods, consumedFoodIdsByDay } = this.props;
		const { selectedDay } = this.state;

		const daysUpToFourDaysAgo = [0, 1, 2, 3];
		const forbiddenFoodIdsForForTodayMinusDays = days => {
			const day = moment(selectedDay);
			day.subtract(days, "day");
			const formattedDay = day.format(dayFormatForStoringConsumedFoodIds);
			return consumedFoodIdsByDay[formattedDay] || [];
		};
		const allForbiddenFoodIds = R.uniq(
			R.chain(forbiddenFoodIdsForForTodayMinusDays, daysUpToFourDaysAgo)
		);

		const forbiddenFoodIdsByDay = R.map(
			forbiddenFoodIdsForForTodayMinusDays,
			daysUpToFourDaysAgo
		);

		const day = moment(selectedDay);
		const formattedDay = day.format(dayFormatForStoringConsumedFoodIds);

		const filterByGroupId = R.filter(food => food.groupId === group.id);
		const filterOutForbiddenFoods = R.filter(
			food => !allForbiddenFoodIds.includes(food.id)
		);
		const filterOutForbiddenFood = R.filter(food => food !== undefined);
		const mapIdToFood = R.map(id => R.find(f => f.id === id, foods));

		const mapFoodToFoodListItem = prefix =>
			R.map(food => {
				return FoodList.createItem(
					food.id,
					prefix,
					I18n.t(food.nameTranslationKey),
					food.thumbnail
				);
			});
		const sortByName = R.sortBy(item => item.name);

		const groupByDaysSinceLastConsumption = R.groupBy(food => {
			return R.find(
				i => forbiddenFoodIdsByDay[i].includes(food.id),
				daysUpToFourDaysAgo
			);
		});

		switch (group.id) {
			case FORBIDDEN_FOOD_GROUP_ID:
				return R.pipe(
					mapIdToFood,
					filterOutForbiddenFood,
					mapFoodToFoodListItem(FORBIDDEN_FOOD_GROUP_ID),
					groupByDaysSinceLastConsumption
				)(allForbiddenFoodIds);
			case CONSUMED_FOOD_GROUP_ID:
				return R.pipe(
					mapIdToFood,
					filterOutForbiddenFood,
					mapFoodToFoodListItem(CONSUMED_FOOD_GROUP_ID),
					sortByName
				)(consumedFoodIdsByDay[formattedDay] || []);
			default:
				return R.pipe(
					filterByGroupId,
					filterOutForbiddenFoods,
					mapFoodToFoodListItem("Group food"),
					sortByName
				)(foods);
		}
	}

	fetchFoodForSelectedDay() {
		const { selectedDay } = this.state;
		const { consumedFoodIdsByDay, fetchForbiddenFoodForDay } = this.props;

		const formattedDay = selectedDay.format(dayFormatForStoringConsumedFoodIds);
		if (consumedFoodIdsByDay[formattedDay] === undefined) {
			fetchForbiddenFoodForDay(selectedDay);
		}
	}

	showCalendar() {
		this.setState({ isShowingCalendar: true });
	}

	hideCalendar() {
		this.setState({ isShowingCalendar: false });
	}

	updateSelectedDay(updateBlock) {
		const { selectedDay } = this.state;
		const updatedDay = updateBlock(moment(selectedDay));
		this.setState({ selectedDay: updatedDay, selectedFoodIds: [] });
	}

	renderFoodList() {
		const { groups } = this.props;
		const { currentSearch, selectedFoodIds } = this.state;

		const groupItems = R.map(
			group => {
				return FoodList.createGroupItem(
					group.id,
					I18n.t(group.nameTranslationKey),
					this.getChildrenFromGroup(group),
					group.id === FORBIDDEN_FOOD_GROUP_ID
				);
			},
			[
				...groups,
				{
					id: FORBIDDEN_FOOD_GROUP_ID,
					nameTranslationKey: "food.group.forbidden"
				},
				{
					id: CONSUMED_FOOD_GROUP_ID,
					nameTranslationKey: "food.group.consumed"
				}
			]
		);

		const items = [
			FoodList.createDescriptionItem(
				I18n.t("screen.dailyTracker.description.title"),
				I18n.t("screen.dailyTracker.description.text"),
				140
			),
			...groupItems
		];

		return (
			<FoodList
				items={items}
				searchExpression={currentSearch}
				selectedFoodIds={selectedFoodIds}
				onFoodSelected={this.onFoodSelected}
				looksAlwaysSelected
				paddingTopForEmptySearch={148}
			/>
		);
	}

	renderCalendar() {
		const { isShowingCalendar, selectedDay } = this.state;

		return (
			<Dialog
				visible={isShowingCalendar}
				width="0.8"
				onTouchOutside={this.hideCalendar}
			>
				<DaySelectorCalendar
					selectedDay={selectedDay}
					onAccept={day => {
						this.setState({
							isShowingCalendar: false,
							selectedDay: day,
							selectedFoodIds: []
						});
					}}
					onCancel={this.hideCalendar}
				/>
			</Dialog>
		);
	}

	render() {
		const { selectedDay } = this.state;
		return (
			<View style={styles.container}>
				{this.renderFoodList()}
				<View style={styles.header}>
					<View style={styles.searchBarContainer}>
						<SearchBar style={{ flex: 1 }} onChangeText={this.onSearchChange} />
						<TouchableHighlight
							underlayColor={color.black05}
							onPress={this.onSetupPressed}
						>
							<Image
								style={styles.setupIcon}
								source={require("../images/icon/Configure.png")}
							/>
						</TouchableHighlight>
						<TouchableHighlight
							underlayColor={color.black05}
							onPress={this.onSharePressed}
						>
							<Image
								style={styles.setupIcon}
								source={require("../images/icon/Share.png")}
							/>
						</TouchableHighlight>
					</View>
					<DaySelector
						style={styles.daySelector}
						onPreviousDayPress={this.onPreviousDayPressed}
						onNextDayPress={this.onNextDayPressed}
						onCurrentDayPress={this.showCalendar}
						selectedDay={selectedDay}
					/>
				</View>
				{this.renderCalendar()}
			</View>
		);
	}
}

function mapStateToProps(state) {
	const { forbiddenFoodIds } = state.setup;

	return {
		groups: state.setup.groups,
		foods: R.filter(
			food => !forbiddenFoodIds.includes(food.id),
			state.setup.foods
		),
		allFoods: state.setup.foods,
		consumedFoodIdsByDay: state.dailyTracker.consumedFoodIdsByDay
	};
}

export default connect(
	mapStateToProps,
	{ shareMonthlyReport, fetchForbiddenFoodForDay, storeConsumedFoodForDay }
)(DailyTrackerScreen);
