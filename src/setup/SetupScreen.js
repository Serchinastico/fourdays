import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { chain } from 'lodash';
import SearchBar from '../components/SearchBar';
import SetupDescription from './components/SetupDescription';
import SetupFoodGroup from './components/SetupFoodGroup';
import { selectGroup, selectFood } from './actions';
import I18n from '../translations/i18n';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
});

class SetupScreen extends React.Component {
	constructor(props) {
		super(props);
		this.renderFoodGroup = this.renderFoodGroup.bind(this);
		this.renderFoodGroups = this.renderFoodGroups.bind(this);
		this.onGroupPressed = this.onGroupPressed.bind(this);
		this.onFoodSelected = this.onFoodSelected.bind(this);
	}

	onGroupPressed(id) {
		const { selectGroup } = this.props;
		selectGroup(id);
	}

	onFoodSelected(id) {
		const { selectFood } = this.props;
		selectFood(id);
	}

	renderFoodGroup({ item }) {
		if (item.type === 'header') {
			return <SetupDescription />;
		}

		const { foods, selectedFoodIds, openGroupIds } = this.props;

		const groupFoods = chain(foods)
			.filter(item => item.groupId === item.id)
			.map(item => {
				return { ...item, isSelected: selectedFoodIds.includes(item.id) };
			})
			.value();

		return (
			<SetupFoodGroup
				onGroupSelected={this.onGroupSelected}
				onFoodSelected={this.onFoodSelected}
				name={I18n.t(item.nameTranslationKey)}
				foods={groupFoods}
				isOpen={openGroupIds.includes(item.id)}
			/>
		);
	}

	renderFoodGroups() {
		const { groups } = this.props;

		return (
			<View style={{ flex: 1 }}>
				<FlatList
					style={{ flex: 1 }}
					data={groups}
					renderItem={this.renderFoodGroup}
					keyExtractor={item => item.id}
				/>
			</View>
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

const mapStateToProps = state => {
	return {
		groups: state.setup.groups,
		foods: state.setup.foods,
		selectedFoodIds: state.setup.selectedFoodIds,
		openGroupIds: state.setup.selectedGroupIds,
	};
};

export default connect(
	mapStateToProps,
	{ selectGroup, selectFood }
)(SetupScreen);
