import React from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
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

// eslint-disable-next-line react/prefer-stateless-function
class DaySelector extends React.PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.previousNextIconContainer}>
					<Image
						style={styles.previousNextIcon}
						source={require('../../images/icon/ChevronLeft.png')}
					/>
				</View>
				<View style={styles.currentDayContainer}>
					<Image style={styles.currentDayIcon} source={require('../../images/icon/Calendar.png')} />
					<Text style={styles.currentDayText}>Tue 19 Mar</Text>
				</View>
				<View style={styles.previousNextIconContainer}>
					<Image
						style={styles.previousNextIcon}
						source={require('../../images/icon/ChevronRight.png')}
					/>
				</View>
			</View>
		);
	}
}
export default DaySelector;
