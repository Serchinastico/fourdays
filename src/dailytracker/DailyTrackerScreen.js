import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

// eslint-disable-next-line react/prefer-stateless-function
class DailyTrackerScreen extends React.Component {
	render() {
		return <View style={{ flex: 1, backgroundColor: '#0F2' }} />;
	}
}

function mapStateToProps(state) {
	return {
		groups: state.setup.groups,
		foods: state.setup.foods,
	};
}

export default connect(
	mapStateToProps,
	{}
)(DailyTrackerScreen);
