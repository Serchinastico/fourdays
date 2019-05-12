import moment from "moment";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import Button from "react-native-button";
import { color } from "../../components/style/style";

const styles = StyleSheet.create({
	container: {
		backgroundColor: color.white,
		flexDirection: "column"
	},
	buttonsContainer: {
		backgroundColor: color.white,
		flexDirection: "row",
		justifyContent: "flex-end"
	},
	button: {
		padding: 16,
		minWidth: 100,
		alignItems: "center",
		fontWeight: "100"
	}
});

const dayFormatForCalendarComponent = "YYYY-MM-DD";

class DaySelectorCalendar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onDayPress = this.onDayPress.bind(this);
		this.onCancelSelected = this.onCancelSelected.bind(this);
		this.onAcceptSelected = this.onAcceptSelected.bind(this);
		this.state = { inCalendarSelectedDay: null };
	}

	onCancelSelected() {
		const { onCancel } = this.props;
		onCancel();
		this.setState({ inCalendarSelectedDay: null });
	}

	onAcceptSelected() {
		const { onAccept, onCancel } = this.props;
		const { inCalendarSelectedDay } = this.state;
		if (inCalendarSelectedDay === null) {
			onCancel();
		} else {
			onAccept(inCalendarSelectedDay);
		}
		this.setState({ inCalendarSelectedDay: null });
	}

	static getMomentBySubtractingOneMonthBecauseItsInDateFormat(calendarDay) {
		return moment({
			y: calendarDay.year,
			M: calendarDay.month - 1,
			d: calendarDay.day
		});
	}

	onDayPress(calendarDay) {
		const selectedDay = DaySelectorCalendar.getMomentBySubtractingOneMonthBecauseItsInDateFormat(
			calendarDay
		);
		this.setState({ inCalendarSelectedDay: selectedDay });
	}

	render() {
		const { inCalendarSelectedDay } = this.state;
		const { selectedDay } = this.props;
		const markedDate = inCalendarSelectedDay || selectedDay;
		const calendarDay = markedDate.format(dayFormatForCalendarComponent);

		return (
			<View style={styles.container}>
				<Calendar
					style={styles.calendar}
					markedDates={{ [calendarDay]: { selected: true } }}
					onDayPress={this.onDayPress}
				/>
				<View style={styles.buttonsContainer}>
					<Button
						style={styles.button}
						color={color.white}
						onPress={() => this.onCancelSelected()}
					>
						CANCEL
					</Button>
					<Button
						style={styles.button}
						color={color.white}
						onPress={() => this.onAcceptSelected()}
					>
						OK
					</Button>
				</View>
			</View>
		);
	}
}

export default DaySelectorCalendar;
