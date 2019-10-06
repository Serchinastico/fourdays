import moment from "moment";
import React from "react";
import {
	Image,
	StyleProp,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	ViewStyle,
} from "react-native";
import { color } from "../../components/style/color";
import { textStyle } from "../../components/style/font";

const dayFormatForDisplayInThisYear = "ddd D MMM";
const dayFormatForDisplayInOtherYear = "ddd D MMM YYYY";

export interface Props {
	onPreviousDayPress: () => void;
	onNextDayPress: () => void;
	onCurrentDayPress: () => void;
	selectedDay: moment.Moment;
	style: StyleProp<ViewStyle>;
}

class DaySelector extends React.PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.onPreviousDayPress = this.onPreviousDayPress.bind(this);
		this.onNextDayPress = this.onNextDayPress.bind(this);
		this.onCurrentDayPress = this.onCurrentDayPress.bind(this);
	}

	public render() {
		const { style } = this.props;
		return (
			<View style={[styles.container, style]}>
				<TouchableHighlight
					underlayColor={color.black05}
					style={styles.previousNextIconContainer}
					onPress={this.onPreviousDayPress}
				>
					<Image
						style={styles.previousNextIcon}
						source={require("../../images/icon/ChevronLeft.png")}
					/>
				</TouchableHighlight>
				<TouchableHighlight
					style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
					underlayColor={color.black05}
					onPress={this.onCurrentDayPress}
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
					onPress={this.onNextDayPress}
				>
					<Image
						style={styles.previousNextIcon}
						source={require("../../images/icon/ChevronRight.png")}
					/>
				</TouchableHighlight>
			</View>
		);
	}

	private onPreviousDayPress() {
		const { onPreviousDayPress } = this.props;
		onPreviousDayPress();
	}

	private onNextDayPress() {
		const { onNextDayPress } = this.props;
		onNextDayPress();
	}

	private onCurrentDayPress() {
		const { onCurrentDayPress } = this.props;
		onCurrentDayPress();
	}

	private renderSelectedDay() {
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
}

const styles = StyleSheet.create({
	container: {
		height: 48,
		flexDirection: "row",
		backgroundColor: color.white,
		alignItems: "stretch",
	},
	previousNextIconContainer: {
		width: 48,
		justifyContent: "center",
		alignItems: "center",
	},
	previousNextIcon: {},
	currentDayContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	currentDayIcon: {
		marginTop: 1,
	},
	currentDayText: {
		...textStyle.largeRegularNeutral,
		color: color.black,
		marginLeft: 8,
		textAlign: "center",
	},
});

export default DaySelector;
