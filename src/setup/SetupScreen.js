import React from 'react';
import { FlatList, Image, Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as R from 'ramda';
import Fuse from 'fuse.js';
import SearchBar from '../components/SearchBar';
import AcceptButton from '../components/AcceptButton';
import SetupDescription from './components/SetupDescription';
import { selectGroup, selectFood } from './actions';
import I18n from '../translations/i18n';
import SetupFoodGroupHeader from './components/SetupFoodGroupHeader';
import SetupFoodRow from './components/SetupFoodRow';
import { style, color } from '../components/style/style';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.white,
	},
	emptyCaseContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 200,
	},
	emptyCaseText: {
		...style.largeMediumNeutral,
		textAlign: 'center',
		color: color.brownGray,
		marginTop: 8,
		marginLeft: 48,
		marginRight: 48,
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
		this.onAcceptPress = this.onAcceptPress.bind(this);
		this.state = { currentSearch: '', selectedFoodIds: [], openGroupIds: [] };
	}

	onAcceptPress() {}

	onSearchChange(text) {
		this.setState({ currentSearch: text });
	}

	onGroupSelected(id) {
		const { openGroupIds } = this.state;

		if (openGroupIds.includes(id)) {
			this.setState({ openGroupIds: R.without([id], openGroupIds) });
		} else {
			this.setState({ openGroupIds: R.append(id, openGroupIds) });
		}
	}

	onFoodSelected(id) {
		const { selectedFoodIds } = this.state;

		if (selectedFoodIds.includes(id)) {
			this.setState({ selectedFoodIds: R.without([id], selectedFoodIds) });
		} else {
			this.setState({ selectedFoodIds: R.append(id, selectedFoodIds) });
		}
	}

	renderFoodRow(foodRow) {
		const { selectedFoodIds } = this.state;
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
		const { openGroupIds } = this.state;
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

	renderEmptySearch() {
		return (
			<View style={styles.emptyCaseContainer}>
				<Image source={require('../images/icon/Empty.png')} />
				<Text style={styles.emptyCaseText}>{I18n.t('common.search.emptyCase.title')}</Text>
				<Text style={styles.emptyCaseText}>{I18n.t('common.search.emptyCase.description')}</Text>
			</View>
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

		if (matchingFoodItems.length === 0) {
			return this.renderEmptySearch();
		}

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
		const { groups, foods } = this.props;
		const { currentSearch, openGroupIds } = this.state;

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
				<AcceptButton onPress={this.onAcceptPress} />
			</View>
		);
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
	{ selectGroup, selectFood }
)(SetupScreen);
