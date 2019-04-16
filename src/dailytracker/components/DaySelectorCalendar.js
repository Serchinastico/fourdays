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

class DaySelectorCalendar extends React.Component {
	constructor(props) {
		super(props);
		const { initialDay } = this.props;
		this.state = { selectedDay: initialDay };
		this.onDayPress = this.onDayPress.bind(this);
		this.onCancelSelected = this.onCancelSelected.bind(this);
		this.onAcceptSelected = this.onAcceptSelected.bind(this);
	}

	onCancelSelected() {
		const { onCancel } = this.props;
		onCancel();
	}

	onAcceptSelected() {
		const { onAccept } = this.props;
		const { selectedDay } = this.state;
		onAccept(selectedDay);
	}

	onDayPress(calendarDay) {
		const selectedDay = moment(calendarDay).subtract(1, "month");
		this.setState({ selectedDay });
	}

	render() {
		const { selectedDay } = this.state;
		const calendarDay = selectedDay.format(dayFormatForCalendarComponent);

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
