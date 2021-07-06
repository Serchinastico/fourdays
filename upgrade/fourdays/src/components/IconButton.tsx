import React from 'react';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';

import { color } from './style/color';

export enum Icon {
	Search,
	Add,
	Back,
	Clear,
	Settings,
	Share,
	TrackerUnselected,
	TrackerSelected,
	SettingsSelected,
	SettingsUnselected,
	StatsSelected,
	StatsUnselected,
}

export interface Props {
	icon: Icon;
	onPress: () => void;
}

class IconButton extends React.PureComponent<Props> {
	public static getImageForIcon(icon: Icon) {
		switch (icon) {
			case Icon.Search:
				return require('../images/icon/Search.png');
			case Icon.Add:
				return require('../images/icon/AddThin.png');
			case Icon.Back:
				return require('../images/icon/Back.png');
			case Icon.Clear:
				return require('../images/icon/Clear.png');
			case Icon.Settings:
				return require('../images/icon/Settings.png');
			case Icon.Share:
				return require('../images/icon/Share.png');
			case Icon.TrackerUnselected:
				return require('../images/icon/HouseUnselected.png');
			case Icon.TrackerSelected:
				return require('../images/icon/HouseSelected.png');
			case Icon.SettingsUnselected:
				return require('../images/icon/SettingsUnselected.png');
			case Icon.SettingsSelected:
				return require('../images/icon/SettingsSelected.png');
			case Icon.StatsUnselected:
				return require('../images/icon/StatsUnselected.png');
			case Icon.StatsSelected:
				return require('../images/icon/StatsSelected.png');
		}
	}
	constructor(props: Props) {
		super(props);
		this.onButtonPress = this.onButtonPress.bind(this);
	}

	public onButtonPress() {
		const { onPress } = this.props;
		onPress();
	}

	public render() {
		const { icon } = this.props;
		return (
			<TouchableHighlight
				underlayColor={color.black05}
				style={styles.button}
				onPress={this.onButtonPress}
			>
				<Image source={IconButton.getImageForIcon(icon)} />
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 24,
		height: 48,
		width: 48,
	},
});

export default IconButton;
