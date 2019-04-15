import moment from "moment";
import React from "react";
import { TouchableHighlight, Text, View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { color } from "../../components/style/style";

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: color.black,
		paddingHorizontal: 16,
		justifyContent: "center"
	},
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
		alignItems: "center"
	}
});

const dayFormatForCalendarComponent = "YYYY-MM-DD";

export default class CalendarScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selectedDay: moment() };
		this.onDaySelected = this.onDaySelected.bind(this);
		this.onCancelSelected = this.onCancelSelected.bind(this);
		this.onAcceptSelected = this.onAcceptSelected.bind(this);
	}

	onCancelSelected() {
		const { navigation } = this.props;
		navigation.goBack();
	}
	onAcceptSelected() {}

	onDaySelected(calendarDay) {
		const selectedDay = moment(calendarDay).subtract(1, "month");
		this.setState({ selectedDay });
	}

	render() {
		const { selectedDay } = this.state;
		const calendarDay = selectedDay.format(dayFormatForCalendarComponent);
		return (
			<View style={styles.background}>
				<View style={styles.container}>
					<Calendar
						style={styles.calendar}
						markedDates={{ [calendarDay]: { selected: true } }}
						onDayPress={this.onDaySelected}
					/>
					<View style={styles.buttonsContainer}>
						<TouchableHighlight
							underlayColor={color.black05}
							style={styles.button}
							onPress={() => this.onCancelSelected()}
						>
							<Text>CANCEL</Text>
						</TouchableHighlight>
						<TouchableHighlight
							underlayColor={color.black05}
							style={styles.button}
							onPress={() => this.onAcceptSelected()}
						>
							<Text>OK</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		);
	}
}
