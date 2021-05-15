import React from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleProp,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
	ViewStyle
} from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import SafeAreaPureComponent from "../react/SafeAreaPureComponent";
import setTestId from "../testIds";
import I18n from "../translations/i18n";
import { color } from "./style/color";
import { textStyle } from "./style/font";
import { shadow } from "./style/shadow";

interface Props {
	onPress: () => void;
	isEnabled: boolean;
	style?: StyleProp<ViewStyle>;
	text?: string;
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

	public getContainerStyleWithInsets(
		style: StyleProp<ViewStyle>,
		insets: EdgeInsets
	) {
		return [styles.container, style, { marginBottom: insets.bottom + 24 }];
	}

	public keyboardDidHide() {
		this.setState({ isKeyboardOpen: false });
	}

	public keyboardDidShow() {
		this.setState({ isKeyboardOpen: true });
	}

	public renderButtonContent() {
		const { text } = this.props;

		return (
			<Text style={styles.text}>{text ?? I18n.t("common.accept.text")}</Text>
		);
	}

	public renderEnabledButton(
		style: StyleProp<ViewStyle>,
		onPress: () => void,
		insets: EdgeInsets
	) {
		return (
			<TouchableHighlight
				{...setTestId("acceptSetupButton")}
				underlayColor={color.seafoamGreen}
				style={this.getContainerStyleWithInsets(style, insets)}
				onPress={onPress}
			>
				<View style={styles.background}>{this.renderButtonContent()}</View>
			</TouchableHighlight>
		);
	}

	public renderDisabledButton(style: StyleProp<ViewStyle>, insets: EdgeInsets) {
		return (
			<View style={this.getContainerStyleWithInsets(style, insets)}>
				<View style={styles.disabledBackground}>
					{this.renderButtonContent()}
				</View>
			</View>
		);
	}

	public renderWithInsets(insets: EdgeInsets) {
		const { onPress, isEnabled, style } = this.props;
		const { isKeyboardOpen } = this.state;

		const buttonContents = isEnabled
			? this.renderEnabledButton(style, onPress, insets)
			: this.renderDisabledButton(style, insets);

		// Terrible hack, in my Samsung S9+, when the keyboard appears, the accept button is below it. That's why we
		// are listening to keyboard events and adding a bogus margin at the bottom.
		const marginBottom = isKeyboardOpen && Platform.OS === "android" ? 24 : 0;

		return (
			<KeyboardAvoidingView
				behavior="position"
				style={[styles.keyboardAvoidingView, { bottom: marginBottom }]}
			>
				{buttonContents}
			</KeyboardAvoidingView>
		);
	}
}

const sharedBackgroundStyle: StyleProp<ViewStyle> = {
	borderRadius: 32,
	flex: 1,
	flexDirection: "column",
	justifyContent: "center"
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: color.grass,
		...shadow.grass,
		...sharedBackgroundStyle
	},
	container: {
		alignSelf: "center",
		borderRadius: 32,
		height: 64,
		width: 128
	},
	disabledBackground: {
		backgroundColor: color.clearGrass,
		...sharedBackgroundStyle
	},
	keyboardAvoidingView: {
		alignSelf: "center",
		backgroundColor: color.transparent,
		position: "absolute"
	},
	text: {
		...textStyle.button,
		color: color.white,
		textAlign: "center"
	}
});

export default AcceptButton;
