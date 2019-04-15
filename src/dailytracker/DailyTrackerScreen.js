import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import SearchBar from "../components/SearchBar";
import DaySelector from "./components/DaySelector";
import { color } from "../components/style/style";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.white,
		flexDirection: "column"
	},
	daySelector: {}
});
class DailyTrackerScreen extends React.Component {
	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<SearchBar />
				<DaySelector
					style={styles.daySelector}
					onDayChanged={() => {}}
					navigation={navigation}
				/>
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
	{}
)(DailyTrackerScreen);
