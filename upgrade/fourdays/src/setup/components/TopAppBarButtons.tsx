import React from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import IconButton, { Icon } from "../../components/IconButton";

interface TopAppBarButtonsProps {
	navigation: NavigationScreenProp<{}>;
	onSearchPress: () => void;
	onAddPress: () => void;
	onClosePress: () => void;
}

export const TopAppBarButtons = ({
	navigation,
	onSearchPress,
	onAddPress,
	onClosePress
}: TopAppBarButtonsProps) => {
	const isModalNavigation = navigation.getParam("isModalNavigation") ?? false;

	if (isModalNavigation) {
		return (
			<View style={{ flexDirection: "row" }}>
				<IconButton icon={Icon.Search} onPress={onSearchPress} />
				<IconButton icon={Icon.Add} onPress={onAddPress} />
				<IconButton icon={Icon.Clear} onPress={onClosePress} />
			</View>
		);
	} else {
		return (
			<View style={{ flexDirection: "row" }}>
				<IconButton icon={Icon.Search} onPress={onSearchPress} />
				<IconButton icon={Icon.Add} onPress={onAddPress} />
			</View>
		);
	}
};
