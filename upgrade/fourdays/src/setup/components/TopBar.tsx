import React from "react";
import TopAppBar from "../../components/TopAppBar";
import TopSearchBar from "../../components/TopSearchBar";
import I18n from "../../translations/i18n";

interface TopBarProps {
	isSearchActive: boolean;
	onBackPress: () => void;
	onChangeText: (text: string) => void;
	buttons: React.ReactChild;
}

export const TopBar = ({
	isSearchActive,
	onBackPress,
	onChangeText,
	buttons
}: TopBarProps) => {
	return isSearchActive ? (
		<TopSearchBar onBackPress={onBackPress} onChangeText={onChangeText} />
	) : (
		<TopAppBar title={I18n.t("screen.setup.title")} buttons={buttons} />
	);
};
