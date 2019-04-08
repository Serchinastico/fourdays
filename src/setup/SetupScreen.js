import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as R from 'ramda';
import SearchBar from '../components/SearchBar';
import SetupDescription from './components/SetupDescription';
import { selectGroup, selectFood } from './actions';
import I18n from '../translations/i18n';
import SetupFoodGroupHeader from './components/SetupFoodGroupHeader';
import SetupFoodRow from './components/SetupFoodRow';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	itemsContainer: {
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

class SetupScreen extends React.Component {
	constructor(props) {
		super(props);
		this.renderFoodGroup = this.renderFoodGroup.bind(this);
		this.renderFoodGroups = this.renderFoodGroups.bind(this);
		this.onGroupSelected = this.onGroupSelected.bind(this);
		this.onFoodSelected = this.onFoodSelected.bind(this);
	}

	onGroupSelected(id) {
		const { selectGroup } = this.props;
		selectGroup(id);
	}

	onFoodSelected(id) {
		const { selectFood } = this.props;
		selectFood(id);
	}

	renderFoodRow(foodRow) {
		const { selectedFoodIds } = this.props;
		return (
			<SetupFoodRow
				onFoodSelected={this.onFoodSelected}
				items={foodRow}
				selectedFoodIds={selectedFoodIds}
			/>
		);
	}

	renderFoodGroup({ item }) {
		if (item.type === 'header') {
			return this.renderDescription();
		} else if (item.type === 'group') {
			return this.renderGroupHeader(item);
		} else {
			return this.renderFoodRow(item.payload);
		}
	}

	renderDescription() {
		return (
			<View style={{ marginTop: 80 }}>
				<SetupDescription />
			</View>
		);
	}

	renderGroupHeader(item) {
		const { openGroupIds } = this.props;
		return (
			<SetupFoodGroupHeader
				id={item.payload.id}
				key={item.payload.id}
				isOpen={openGroupIds.includes(item.payload.id)}
				name={I18n.t(item.payload.nameTranslationKey)}
				onGroupSelected={this.onGroupSelected}
			/>
		);
	}

	renderFoodGroups() {
		const { groups, foods, openGroupIds } = this.props;

		const content = R.map(group => {
			var groupFoods = [];
			if (openGroupIds.includes(group.id)) {
				groupFoods = R.filter(food => food.groupId === group.id, foods);
			}
			const rows = R.splitEvery(3, groupFoods).map(row => {
				return { type: 'row', key: row[0].id, payload: row };
			});
			return [{ type: 'group', key: group.id, payload: group }, ...rows];
		}, groups);

		return (
			<FlatList
				data={[{ type: 'header', key: 'header' }, ...R.flatten(content)]}
				renderItem={this.renderFoodGroup}
			/>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderFoodGroups()}
				<SearchBar />
			</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		groups: state.setup.groups,
		foods: state.setup.foods,
		selectedFoodIds: state.setup.selectedFoodIds,
		openGroupIds: state.setup.selectedGroupIds,
	};
}

export default connect(
	mapStateToProps,
	{ selectGroup, selectFood }
)(SetupScreen);
