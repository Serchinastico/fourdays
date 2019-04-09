import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Fuse from 'fuse.js';
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
		this.onSearchChange = this.onSearchChange.bind(this);
		this.state = { currentSearch: '' };
	}

	onSearchChange(text) {
		this.setState({ currentSearch: text });
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
		} else if (item.type === 'row') {
			return this.renderFoodRow(item.payload);
		} else if (item.type === 'padding') {
			return <View style={{ height: item.payload.height }} />;
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

	renderSearch(currentSearch) {
		const { foods } = this.props;
		const foodWithNames = R.map(foodItem => {
			return { ...foodItem, name: I18n.t(foodItem.nameTranslationKey) };
		}, foods);

		var options = {
			keys: ['name'],
			threshold: 0.3,
			distance: 100,
		};
		const fuse = new Fuse(foodWithNames, options);
		const matchingFoodItems = fuse.search(currentSearch);

		const items = R.splitEvery(3, matchingFoodItems).map(row => {
			return { type: 'row', key: row[0].id, payload: row };
		});

		return (
			<FlatList
				data={[{ type: 'padding', key: 'padding', payload: { height: 98 } }, ...items]}
				renderItem={this.renderFoodGroup}
			/>
		);
	}

	renderFoodGroups() {
		const { groups, foods, openGroupIds } = this.props;
		const { currentSearch } = this.state;

		if (currentSearch != '') {
			return this.renderSearch(currentSearch);
		}

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
				<SearchBar onChangeText={this.onSearchChange} />
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