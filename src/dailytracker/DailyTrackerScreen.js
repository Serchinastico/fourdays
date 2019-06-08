import moment from "moment";
import * as R from "ramda";
import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Dialog } from "react-native-popup-dialog/src";
import { connect } from "react-redux";
import FoodList from "../components/food/FoodList";
import IconButton, {
	IconButtonSearch,
	IconButtonSettings,
	IconButtonShare
} from "../components/IconButton";
import TopAppBar from "../components/TopAppBar";
import TopSearchBar from "../components/TopSearchBar";
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
	topBarContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0
	},
	searchBarContainer: {
		flexDirection: "row",
		marginTop: 16,
		marginLeft: 16
	},
	daySelector: {
		margin: 8
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
		this.onSearchPressed = this.onSearchPressed.bind(this);
		this.onSetupPressed = this.onSetupPressed.bind(this);
		this.onSharePressed = this.onSharePressed.bind(this);
		this.showCalendar = this.showCalendar.bind(this);
		this.hideCalendar = this.hideCalendar.bind(this);
		this.state = {
			isShowingCalendar: false,
			isSearchActive: false,
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

	onSearchPressed() {
		this.setState({ isSearchActive: true });
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
		const { currentSearch, selectedFoodIds, isSearchActive } = this.state;

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
				I18n.t("screen.dailyTracker.description.text"),
				isSearchActive ? 80 : 140
			),
			...groupItems
		];

		return (
			<SafeAreaView>
				<FoodList
					items={items}
					searchExpression={currentSearch}
					selectedFoodIds={selectedFoodIds}
					onFoodSelected={this.onFoodSelected}
					looksAlwaysSelected
					paddingTopForEmptySearch={148}
				/>
			</SafeAreaView>
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

	renderTopAppBarButtons() {
		return (
			<View style={{ flexDirection: "row" }}>
				<IconButton icon={IconButtonSearch} onPressed={this.onSearchPressed} />
				<IconButton icon={IconButtonSettings} onPressed={this.onSetupPressed} />
				<IconButton icon={IconButtonShare} onPressed={this.onSharePressed} />
			</View>
		);
	}

	renderDaySelector() {
		const { selectedDay } = this.state;

		return (
			<DaySelector
				styles={styles.daySelector}
				onPreviousDayPress={this.onPreviousDayPressed}
				onNextDayPress={this.onNextDayPressed}
				onCurrentDayPress={this.showCalendar}
				selectedDay={selectedDay}
			/>
		);
	}

	renderTopBar() {
		const { isSearchActive } = this.state;

		const topBar = isSearchActive ? (
			<TopSearchBar
				onBackPress={() => this.setState({ isSearchActive: false })}
				onChangeText={this.onSearchChange}
			/>
		) : (
			<TopAppBar
				title={I18n.t("screen.dailyTracker.title")}
				buttons={this.renderTopAppBarButtons()}
				bottomViews={this.renderDaySelector()}
			/>
		);

		return <View style={styles.topBarContainer}>{topBar}</View>;
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.container}>
					{this.renderFoodList()}
					{this.renderTopBar()}
					{this.renderCalendar()}
				</View>
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
