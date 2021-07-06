import React from 'react';
import { useState } from 'react';
import {View,} from 'react-native';

import { Icon } from '../IconButton';
import { styles } from './BottomNavigation.styles';
import { Button } from './Button';

interface ButtonProps {
	isSelected: boolean;
	onPress: () => void;
}

const TrackerButton = (props: ButtonProps) => (
	<Button
		{...props}
		selectedIcon={Icon.TrackerSelected}
		unselectedIcon={Icon.TrackerUnselected}
	/>
);

const SetupButton = (props: ButtonProps) => (
	<Button
		{...props}
		selectedIcon={Icon.SettingsSelected}
		unselectedIcon={Icon.SettingsUnselected}
	/>
);

const StatsButton = (props: ButtonProps) => (
	<Button
		{...props}
		selectedIcon={Icon.StatsSelected}
		unselectedIcon={Icon.StatsUnselected}
	/>
);

export type Selection = 'tracker' | 'setup' | 'stats'

interface BottomNavigationProps {
	onSelection: (selection: Selection) => void
}

export const BottomNavigation = ({onSelection}: BottomNavigationProps) => {
	const [selection, setSelection] = useState<Selection>('tracker')

	const handleOnPress = (selection: Selection) => {
		setSelection(selection)
		onSelection(selection)
	}

	return (
		<View style={styles.container}>
			<TrackerButton isSelected={selection === 'tracker'} onPress={() => handleOnPress('tracker')} />
			<SetupButton isSelected={selection === 'setup'} onPress={() => handleOnPress('setup')} />
			<StatsButton isSelected={selection === 'stats'} onPress={() => handleOnPress('stats')} />
		</View>
	);
};
