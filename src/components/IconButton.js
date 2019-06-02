import React from "react";
import { Image, StyleSheet, TouchableHighlight } from "react-native";
import { color } from "./style/style";

const styles = StyleSheet.create({
	button: {
		width: 48,
		borderRadius: 24,
		height: 48
	}
});

IconButton.Search = "Search";
IconButton.Close = "Clear";

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
			case IconButton.Search:
				return require("../images/icon/Search.png");
			case IconButton.Close:
				return require("../images/icon/Clear.png");
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
