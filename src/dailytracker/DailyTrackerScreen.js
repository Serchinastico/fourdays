import moment from "moment";
import * as R from "ramda";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Dialog } from "react-native-popup-dialog/src";
import { connect } from "react-redux";
import FoodList from "../components/FoodList";
import SearchBar from "../components/SearchBar";
import I18n from "../translations/i18n";
import {
	dayFormatForStoringConsumedFoodIds,
	fetchConsumedFoodForDay,
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
		padding: 16,
		flexDirection: "column",
		backgroundColor: color.white
	},
	daySelector: {
		marginVertical: 16,
		marginHorizontal: 16
	}
});

class DailyTrackerScreen extends React.Component {
	constructor(props) {
		super(props);
		this.onFoodSelected = this.onFoodSelected.bind(this);
		this.onPreviousDayPressed = this.onPreviousDayPressed.bind(this);
		this.onNextDayPressed = this.onNextDayPressed.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.showCalendar = this.showCalendar.bind(this);
		this.hideCalendar = this.hideCalendar.bind(this);
		this.state = {
			isShowingCalendar: false,
			selectedDay: moment(),
			currentSearch: ""
		};
	}

	componentDidMount() {
		this.fetchFoodForSelectedDay();
	}

	componentDidUpdate() {
		this.fetchFoodForSelectedDay();
	}

	onFoodSelected() {}

	onSearchChange(text) {
		this.setState({ currentSearch: text });
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
		const { selectedDay } = this.state;
		const { foods, consumedFoodIdsByDay } = this.props;

		const formattedDay = selectedDay.format(dayFormatForStoringConsumedFoodIds);
		const consumedFoodIds = consumedFoodIdsByDay[formattedDay] || [];

		if (group.id === "Forbidden food") {
			return R.map(id => {
				const food = R.find(f => f.id === id, foods);
				FoodList.createItem(
					food.id,
					I18n.t(food.nameTranslationKey),
					food.thumbnailUrl
				);
			}, consumedFoodIds);
		} else {
			return R.filter(food => {
				return food.groupId === group.id;
			}, foods)
				.filter(food => {
					return !consumedFoodIds.includes(food.id);
				})
				.map(food => {
					return FoodList.createItem(
						food.id,
						I18n.t(food.nameTranslationKey),
						food.thumbnailUrl
					);
				});
		}
	}

	fetchFoodForSelectedDay() {
		const { selectedDay } = this.state;
		const { consumedFoodIdsByDay, fetchConsumedFoodForDay } = this.props;

		const formattedDay = selectedDay.format(dayFormatForStoringConsumedFoodIds);
		if (consumedFoodIdsByDay[formattedDay] === undefined) {
			fetchConsumedFoodForDay(selectedDay);
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
		this.setState({ selectedDay: updatedDay });
	}

	renderFoodList() {
		const { groups } = this.props;
		const { currentSearch } = this.state;

		const groupItems = R.map(
			group => {
				return FoodList.createGroupItem(
					group.id,
					I18n.t(group.nameTranslationKey),
					this.getChildrenFromGroup(group)
				);
			},
			[
				...groups,
				{ id: "Forbidden food", nameTranslationKey: "food.group.forbidden" }
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
						this.setState({ isShowingCalendar: false, selectedDay: day });
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
					<SearchBar onChangeText={this.onSearchChange} />
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
	return {
		groups: state.setup.groups,
		foods: state.setup.foods,
		consumedFoodIdsByDay: state.dailyTracker.consumedFoodIdsByDay
	};
}

export default connect(
	mapStateToProps,
	{ fetchConsumedFoodForDay, storeConsumedFoodForDay }
)(DailyTrackerScreen);
