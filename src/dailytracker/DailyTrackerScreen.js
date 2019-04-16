import moment from "moment";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Dialog } from "react-native-popup-dialog/src";
import { connect } from "react-redux";
import SearchBar from "../components/SearchBar";
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
		this.onPreviousDayPressed = this.onPreviousDayPressed.bind(this);
		this.onNextDayPressed = this.onNextDayPressed.bind(this);
		this.showCalendar = this.showCalendar.bind(this);
		this.hideCalendar = this.hideCalendar.bind(this);
		this.state = { isShowingCalendar: false, selectedDay: moment() };
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

	renderCalendar() {
		const { isShowingCalendar, selectedDay } = this.state;
		return (
			<Dialog
				visible={isShowingCalendar}
				width="0.8"
				onTouchOutside={this.hideCalendar}
			>
				<DaySelectorCalendar
					initialDay={selectedDay}
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
				<View style={{ backgroundColor: color.darkMint, flex: 1 }} />
				<View style={styles.header}>
					<SearchBar />
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
		foods: state.setup.foods
	};
}

export default connect(
	mapStateToProps,
	null
)(DailyTrackerScreen);
