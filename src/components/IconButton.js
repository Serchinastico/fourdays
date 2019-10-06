import React from "react";
import { Image, StyleSheet, TouchableHighlight } from "react-native";
import { color } from "./style/color";

const styles = StyleSheet.create({
	button: {
		width: 48,
		height: 48,
		borderRadius: 24
	}
});

export const IconButtonSearch = "Search";
export const IconButtonBack = "Back";
export const IconButtonClear = "Clear";
export const IconButtonSettings = "Settings";
export const IconButtonShare = "Share";

class IconButton extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onButtonPressed = this.onButtonPressed.bind(this);
	}

	onButtonPressed() {
		const { onPressed } = this.props;
		onPressed();
	}

	static getImageForIcon(icon) {
		switch (icon) {
			case IconButtonSearch:
				return require("../images/icon/Search.png");
			case IconButtonBack:
				return require("../images/icon/Back.png");
			case IconButtonClear:
				return require("../images/icon/Clear.png");
			case IconButtonSettings:
				return require("../images/icon/Settings.png");
			case IconButtonShare:
				return require("../images/icon/Share.png");
		}
	}

	render() {
		const { icon } = this.props;
		return (
			<TouchableHighlight
				underlayColor={color.black05}
				style={styles.button}
				onPress={this.onButtonPressed}
			>
				<Image source={IconButton.getImageForIcon(icon)} />
			</TouchableHighlight>
		);
	}
}

export default IconButton;
