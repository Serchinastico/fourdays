import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import fetchForbiddenFood from "./actions";

const Status = {
	FETCHING: 0,
	ALREADY_CONFIGURED: 1,
	NOT_CONFIGURED: 2
};

class StartScreen extends React.Component {
	componentDidMount() {
		const { status, fetchForbiddenFood } = this.props;

		if (!this.navigateToNextScreenIfFetchFinished(status)) {
			fetchForbiddenFood();
		}
	}

	componentDidUpdate() {
		const { status } = this.props;
		this.navigateToNextScreenIfFetchFinished(status);
	}

	navigateToNextScreenIfFetchFinished(status) {
		const { navigation } = this.props;
		switch (status) {
			case Status.FETCHING:
				return false;
			case Status.ALREADY_CONFIGURED:
				navigation.navigate("DailyTracker");
				return true;
			case Status.NOT_CONFIGURED:
				navigation.navigate("Setup");
				return true;
		}
	}

	render() {
		return <View />;
	}
}

function mapStateToProps(state) {
	let status;

	if (
		state.setup.forbiddenFoodIds !== undefined &&
		state.setup.forbiddenFoodIds.length > 0
	) {
		status = Status.ALREADY_CONFIGURED;
	} else if (state.setup.forbiddenFoodIds !== undefined) {
		status = Status.NOT_CONFIGURED;
	} else {
		status = Status.FETCHING;
	}

	return { status };
}

export default connect(
	mapStateToProps,
	{ fetchForbiddenFood }
)(StartScreen);