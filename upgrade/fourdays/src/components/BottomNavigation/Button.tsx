import React from 'react';
import { TouchableHighlight } from 'react-native';
import IconButton, { Icon } from '../IconButton';
import { styles } from './Button.styles';

interface GenericButtonProps extends ButtonProps {
	selectedIcon: Icon;
	unselectedIcon: Icon;
}

interface ButtonProps {
	isSelected: boolean;
	onPress: () => void;
}

export const Button = ({
	isSelected,
	selectedIcon,
	unselectedIcon,
	onPress,
}: GenericButtonProps) => {
	return (
		<TouchableHighlight
			style={
				isSelected
					? styles.selectedButtonContainer
					: styles.unselectedButtonContainer
			}
		>
			<IconButton
				icon={isSelected ? selectedIcon : unselectedIcon}
				onPress={onPress}
			/>
		</TouchableHighlight>
	);
};