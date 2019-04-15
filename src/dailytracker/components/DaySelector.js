import moment from 'moment';
import React from 'react';
import { Text, Image, StyleSheet, View, TouchableHighlight } from 'react-native';
import { color, style } from '../../components/style/style';

const styles = StyleSheet.create({
	container: {
		height: 48,
		flexDirection: 'row',
		top: 120,
		backgroundColor: color.white,
		alignItems: 'stretch',
	},
	previousNextIconContainer: {
		width: 48,
		justifyContent: 'center',
		alignItems: 'center',
	},
	previousNextIcon: {},
	currentDayContainer: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	currentDayIcon: {
		marginTop: 1,
	},
	currentDayText: {
		...style.largeRegularNeutral,
		color: color.black,
		marginLeft: 8,
		textAlign: 'center',
	},
});

const dayFormatForDisplayInThisYear = 'ddd D MMM';
const dayFormatForDisplayInOtherYear = 'ddd D MMM YYYY';

class DaySelector extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onPreviousDayPressed = this.onPreviousDayPressed.bind(this);
		this.onNextDayPressed = this.onNextDayPressed.bind(this);
		this.state = { selectedDay: moment() };
	}

	onPreviousDayPressed() {
		const { selectedDay } = this.state;
		const previousDay = moment(selectedDay).subtract(1, 'day');
		this.setState({ selectedDay: previousDay });
	}

	onNextDayPressed() {
		const { selectedDay } = this.state;
		const previousDay = moment(selectedDay).add(1, 'day');
		this.setState({ selectedDay: previousDay });
	}

	renderSelectedDay() {
		const { selectedDay } = this.state;
		const today = moment();

		if (selectedDay.year() === today.year()) {
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
		return (
			<View style={styles.container}>
				<TouchableHighlight
					underlayColor={color.black05}
					style={styles.previousNextIconContainer}
					onPress={() => this.onPreviousDayPressed()}
				>
					<Image
						style={styles.previousNextIcon}
						source={require('../../images/icon/ChevronLeft.png')}
					/>
				</TouchableHighlight>
				<View style={styles.currentDayContainer}>
					<Image style={styles.currentDayIcon} source={require('../../images/icon/Calendar.png')} />
					{this.renderSelectedDay()}
				</View>
				<TouchableHighlight
					underlayColor={color.black05}
					style={styles.previousNextIconContainer}
					onPress={() => this.onNextDayPressed()}
				>
					<Image
						style={styles.previousNextIcon}
						source={require('../../images/icon/ChevronRight.png')}
					/>
				</TouchableHighlight>
			</View>
		);
	}
}

export default DaySelector;
