import React from "react";
import { Image, StyleSheet, TouchableHighlight } from "react-native";
import { color } from "./style/color";

export enum Icon {
	Search,
	Back,
	Clear,
	Settings,
	Share,
}

export interface Props {
	icon: Icon;
	onPress: () => void;
}

class IconButton extends React.PureComponent<Props> {
	public static getImageForIcon(icon: Icon) {
		switch (icon) {
			case Icon.Search:
				return require("../images/icon/Search.png");
			case Icon.Back:
				return require("../images/icon/Back.png");
			case Icon.Clear:
				return require("../images/icon/Clear.png");
			case Icon.Settings:
				return require("../images/icon/Settings.png");
			case Icon.Share:
				return require("../images/icon/Share.png");
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
