import React, { createRef } from "react";
import { TextInput, StyleSheet, Keyboard, View } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import I18n from "../translations/i18n";
// @ts-ignore
import IconButton, { Icon } from "./IconButton";
import { color } from "./style/color";
import { textStyle } from "./style/font";
import { shadow } from "./style/shadow";
import SafeAreaPureComponent from "../react/SafeAreaPureComponent";

interface Props {
	onBackPress: () => void;
	onChangeText: (text: string) => void;
}

interface State {
	currentSearch: string;
}

class TopSearchBar extends SafeAreaPureComponent<Props, State> {
	private textInputRef = createRef<TextInput>();

	constructor(props: Props) {
		super(props);
		this.renderBackIcon = this.renderBackIcon.bind(this);
		this.onBackPress = this.onBackPress.bind(this);
		this.onSearchPress = this.onSearchPress.bind(this);
		this.onClearPress = this.onClearPress.bind(this);
		this.state = { currentSearch: "" };
	}

	private onTextInput(block: (textInput: TextInput) => void) {
		const textInput = this.textInputRef.current;
		if (textInput) {
			block(textInput);
		}
	}

	private onBackPress() {
		const { onBackPress } = this.props;
		this.onTextInput(input => input.clear());
		Keyboard.dismiss();
		this.onChangeText("");
		onBackPress();
	}

	private onSearchPress() {
		this.onTextInput(input => input.focus());
	}

	private onClearPress() {
		this.onTextInput(input => input.clear());
		this.onChangeText("");
	}

	private onChangeText(text: string) {
		const { onChangeText } = this.props;
		this.setState({ currentSearch: text });
		onChangeText(text);
	}

	private isSearchEmpty() {
		const { currentSearch } = this.state;
		return currentSearch.length === 0;
	}

	private renderBackIcon() {
		return <IconButton icon={Icon.Back} onPress={this.onBackPress} />;
	}

	private renderClearIcon() {
		if (this.isSearchEmpty()) {
			return null;
		}

		return <IconButton icon={Icon.Clear} onPress={this.onClearPress} />;
	}

	private renderTextInput(currentSearch: string) {
		return (
			<TextInput
				ref={this.textInputRef}
				style={styles.textInput}
				autoFocus
				placeholder={I18n.t("common.search.placeholder")}
				placeholderTextColor={color.black50}
				onChangeText={text => this.onChangeText(text)}
				value={currentSearch}
			/>
		);
	}

	public renderWithInsets(insets: EdgeInsets) {
		const { currentSearch } = this.state;

		return (
			<View style={[styles.container, { paddingTop: insets.top }]}>
				<View style={styles.innerContainer}>
					{this.renderBackIcon()}
					{this.renderTextInput(currentSearch)}
					{this.renderClearIcon()}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: color.white,
		padding: 8,
		...shadow.regular
	},
	innerContainer: {
		flexDirection: "row",
		alignItems: "center",
		/* Weird spacing to make it look the same height in Android with no notch.
			 In iOS with notch is still noticeable a different height but it looks
			 good enough for now
		 */
		paddingTop: 11,
		paddingBottom: 10
	},
	textInput: {
		...textStyle.extraLargeRegularNeutral,
		marginBottom: -4,
		textAlignVertical: "center",
		flex: 1
	}
});

export default TopSearchBar;
