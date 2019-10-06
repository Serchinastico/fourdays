import moment from "moment";
import React from "react";
import {
	Text,
	Image,
	StyleSheet,
	View,
	TouchableHighlight
} from "react-native";
import { color } from "../../components/style/color";
import { textStyle } from "../../components/style/font";

const styles = StyleSheet.create({
	container: {
		height: 48,
		flexDirection: "row",
		backgroundColor: color.white,
		alignItems: "stretch"
	},
	previousNextIconContainer: {
		width: 48,
		justifyContent: "center",
		alignItems: "center"
	},
	previousNextIcon: {},
	currentDayContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	currentDayIcon: {
		marginTop: 1
	},
	currentDayText: {
		...textStyle.largeRegularNeutral,
		color: color.black,
		marginLeft: 8,
		textAlign: "center"
	}
});

const dayFormatForDisplayInThisYear = "ddd D MMM";
const dayFormatForDisplayInOtherYear = "ddd D MMM YYYY";

class DaySelector extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onPreviousDayPressed = this.onPreviousDayPressed.bind(this);
		this.onNextDayPressed = this.onNextDayPressed.bind(this);
		this.onCurrentDayPressed = this.onCurrentDayPressed.bind(this);
	}

	onPreviousDayPressed() {
		const { onPreviousDayPress } = this.props;
		onPreviousDayPress();
	}

	onNextDayPressed() {
		const { onNextDayPress } = this.props;
		onNextDayPress();
	}

	onCurrentDayPressed() {
		const { onCurrentDayPress } = this.props;
		onCurrentDayPress();
	}

	renderSelectedDay() {
		const { selectedDay } = this.props;
		const today = moment();

		if (selectedDay === null) {
			return (
				<Text style={styles.currentDayText}>
					{today.format(dayFormatForDisplayInThisYear)}
				</Text>
			);
		} else if (selectedDay.year() === today.year()) {
			return (
				<Text style={styles.currentDayText}>
					{selectedDay.format(dayFormatForDisplayInThisYear)}
				</Text>
			);
		} else {
			return (
				<Text style={styles.currentDayText}>
					{selectedDay.format(dayFormatForDisplayInOtherYear)}
				</Text>
			);
		}
	}

	render() {
		const { style } = this.props;
		return (
			<View style={[styles.container, style]}>
				<TouchableHighlight
					underlayColor={color.black05}
					style={styles.previousNextIconContainer}
					onPress={this.onPreviousDayPressed}
				>
					<Image
						style={styles.previousNextIcon}
						source={require("../../images/icon/ChevronLeft.png")}
					/>
				</TouchableHighlight>
				<TouchableHighlight
					style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
					underlayColor={color.black05}
					onPress={this.onCurrentDayPressed}
				>
					<View style={styles.currentDayContainer}>
						<Image
							style={styles.currentDayIcon}
							source={require("../../images/icon/Calendar.png")}
						/>
						{this.renderSelectedDay()}
					</View>
				</TouchableHighlight>
				<TouchableHighlight
					underlayColor={color.black05}
					style={styles.previousNextIconContainer}
					onPress={this.onNextDayPressed}
				>
					<Image
						style={styles.previousNextIcon}
						source={require("../../images/icon/ChevronRight.png")}
					/>
				</TouchableHighlight>
			</View>
		);
	}
}

export default DaySelector;
