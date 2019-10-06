import React from "react";
import {
	TouchableHighlight,
	StyleSheet,
	Text,
	View,
	Platform,
	KeyboardAvoidingView,
	Keyboard,
	StyleProp,
	ViewStyle
} from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
// @ts-ignore
import setTestId from "../testIds";
import I18n from "../translations/i18n";
import { color } from "./style/color";
import { textStyle } from "./style/font";
import { shadow } from "./style/shadow";
import SafeAreaPureComponent from "../react/SafeAreaPureComponent";

interface Props {
	onPress: () => void;
	isEnabled: boolean;
	style: StyleProp<ViewStyle>;
}

interface State {
	isKeyboardOpen: boolean;
}

class AcceptButton extends SafeAreaPureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		Keyboard.addListener("keyboardDidShow", this.keyboardDidShow.bind(this));
		Keyboard.addListener("keyboardDidHide", this.keyboardDidHide.bind(this));
		this.state = { isKeyboardOpen: false };
	}

	getContainerStyleWithInsets(style: StyleProp<ViewStyle>, insets: EdgeInsets) {
		return [styles.container, style, { marginBottom: insets.bottom + 24 }];
	}

	keyboardDidHide() {
		this.setState({ isKeyboardOpen: false });
	}

	keyboardDidShow() {
		this.setState({ isKeyboardOpen: true });
	}

	renderButtonContent() {
		return <Text style={styles.text}>{I18n.t("common.accept.text")}</Text>;
	}

	renderEnabledButton(
		style: StyleProp<ViewStyle>,
		onPress: () => void,
		insets: EdgeInsets
	) {
		return (
			<TouchableHighlight
				{...setTestId("acceptSetupButton")}
				underlayColor={color.seafoamGreen}
				style={this.getContainerStyleWithInsets(style, insets)}
				onPress={() => onPress()}
			>
				<View style={styles.background}>{this.renderButtonContent()}</View>
			</TouchableHighlight>
		);
	}

	renderDisabledButton(style: StyleProp<ViewStyle>, insets: EdgeInsets) {
		return (
			<View style={this.getContainerStyleWithInsets(style, insets)}>
				<View style={styles.disabledBackground}>
					{this.renderButtonContent()}
				</View>
			</View>
		);
	}

	renderWithInsets(insets: EdgeInsets) {
		let { onPress, isEnabled, style } = this.props;
		const { isKeyboardOpen } = this.state;

		const buttonContents =
			isEnabled === undefined || isEnabled
				? this.renderEnabledButton(style, onPress, insets)
				: this.renderDisabledButton(style, insets);

		// Terrible hack, in my Samsung S9+, when the keyboard appears, the accept button is below it. That's why we
		// are listening to keyboard events and adding a bogus margin at the bottom.
		const marginBottom = isKeyboardOpen && Platform.OS === "android" ? 24 : 0;

		return (
			<KeyboardAvoidingView
				behavior="position"
				style={{
					backgroundColor: color.transparent,
					position: "absolute",
					alignSelf: "center",
					bottom: marginBottom
				}}
			>
				{buttonContents}
			</KeyboardAvoidingView>
		);
	}
}

const sharedBackgroundStyle: StyleProp<ViewStyle> = {
	flex: 1,
	borderRadius: 32,
	justifyContent: "center",
	flexDirection: "column"
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: color.grass,
		...shadow.grass,
		...sharedBackgroundStyle
	},
	container: {
		height: 64,
		width: 128,
		borderRadius: 32,
		alignSelf: "center"
	},
	disabledBackground: {
		backgroundColor: color.clearGrass,
		...sharedBackgroundStyle
	},
	text: {
		...textStyle.largeMediumBlack,
		color: color.white,
		textAlign: "center"
	}
});

export default AcceptButton;
