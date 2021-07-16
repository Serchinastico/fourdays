import * as R from 'ramda';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

import addItemToListIfPresentRemoveOtherwise from '../common/collections';
import { BottomNavigation, Selection } from '../components/BottomNavigation';
import { color } from '../components/style/color';
import storeForbiddenFood from './actions';
import { FoodListView } from './components/FoodListView';
import { TopAppBarButtons } from './components/TopAppBarButtons';
import { TopBar } from './components/TopBar';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.cloud,
	},
	footer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
	},
	itemsContainer: {
		padding: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

interface SetupScreenProps {
	foods: any[];
	groups: any[];
	forbiddenFoodIdsOnStart: string[];
	storeForbiddenFood: (foodIds: string[]) => void;
	navigation: NavigationScreenProp<{}>;
}

const SetupScreen = ({
	foods,
	groups,
	forbiddenFoodIdsOnStart,
	storeForbiddenFood,
	navigation,
}: SetupScreenProps) => {
	const [currentSearch, setCurrentSearch] = useState('');
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [selectedFoodIds, setSelectedFoodIds] = useState(
		R.pipe(
			R.map((f: any) => f.id),
			R.filter((id: string) => !forbiddenFoodIdsOnStart.includes(id)),
		)(foods),
	);

	const close = () => {
		const isModalNavigation = navigation.getParam('isModalNavigation') ?? false;
		if (isModalNavigation) {
			navigation.pop();
		} else {
			navigation.navigate('DailyTracker');
		}
	};

	const onAcceptPress = () => {
		const forbiddenFoodIds = R.without(
			selectedFoodIds,
			R.map(f => f.id, foods),
		);
		storeForbiddenFood(forbiddenFoodIds);

		close();
	};

	const onClosePress = useCallback(() => close(), []);

	const onFoodSelect = useCallback((foodId: string) => {
		const updatedSelectedFoodIds = addItemToListIfPresentRemoveOtherwise(
			foodId,
			selectedFoodIds,
		);
		setSelectedFoodIds(updatedSelectedFoodIds);
	}, []);

	const onNewGroupSelected = useCallback(
		() => navigation.navigate('CreateGroup', { isModalNavigation: true }),
		[navigation],
	);

	const onSearchChange = useCallback((text: string) => setCurrentSearch(text), [
		setCurrentSearch,
	]);

	const onSearchPress = useCallback(() => setIsSearchActive(true), [
		setIsSearchActive,
	]);

	const onAddPress = useCallback(
		() =>
			navigation.navigate('AddFood', { foodName: '', isModalNavigation: true }),
		[navigation],
	);

	const onBottomNavigationSelect = (selection: Selection) => {
		switch (selection) {
			case 'tracker': {
				navigation.navigate('DailyTracker');
			}
			case 'setup': {
				/* We are already there */
			}
			case 'stats': {
				/* TODO */
			}
		}
	};

	return (
		<SafeAreaInsetsContext.Consumer>
			{insets => (
				<View style={styles.container}>
					<FoodListView
						insets={insets}
						foods={foods}
						groups={groups}
						selectedFoodIds={selectedFoodIds}
						currentSearch={currentSearch}
						onFoodSelect={onFoodSelect}
						onNewGroupSelected={onNewGroupSelected}
					/>
					<TopBar
						isSearchActive={isSearchActive}
						onBackPress={() => setIsSearchActive(false)}
						onChangeText={onSearchChange}
						buttons={
							<TopAppBarButtons
								onAddPress={onAddPress}
								onClosePress={onClosePress}
								onSearchPress={onSearchPress}
							/>
						}
					/>
				</View>
			)}
		</SafeAreaInsetsContext.Consumer>
	);
};

function mapStateToProps(state: any) {
	return {
		groups: state.setup.groups,
		foods: state.setup.foods,
		forbiddenFoodIdsOnStart: state.setup.forbiddenFoodIds || [],
	};
}

export default connect(mapStateToProps, { storeForbiddenFood })(SetupScreen);
