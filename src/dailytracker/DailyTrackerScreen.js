import React from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import SearchBar from "../components/SearchBar";
import DaySelector from "./components/DaySelector";
import { color } from "../components/style/style";

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
		flexDirection: "column"
	},
	daySelector: {
		marginVertical: 16,

		marginHorizontal: 16
	}
});

class DailyTrackerScreen extends React.Component {
	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<SearchBar style={styles.searchBar} />
					<DaySelector
						style={styles.daySelector}
						onDayChanged={() => {}}
						navigation={navigation}
					/>
				</View>
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
