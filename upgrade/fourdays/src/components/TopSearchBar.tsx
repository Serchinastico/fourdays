import React, { createRef } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import SafeAreaPureComponent from "../react/SafeAreaPureComponent";
import I18n from "../translations/i18n";
import IconButton, { Icon } from "./IconButton";
import { color } from "./style/color";
import { textStyle } from "./style/font";
import { shadow } from "./style/shadow";

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
		this.onChangeText = this.onChangeText.bind(this);
		this.state = { currentSearch: "" };
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
				autoFocus={true}
				placeholder={I18n.t("common.search.placeholder")}
				placeholderTextColor={color.black50}
				onChangeText={this.onChangeText}
				value={currentSearch}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: color.white,
		left: 0,
		padding: 8,
		position: "absolute",
		right: 0,
		top: 0,
		...shadow.regular,
	},
	innerContainer: {
		alignItems: "center",
		flexDirection: "row",
		paddingBottom: 10,
		/* Weird spacing to make it look the same height in Android with no notch.
			 In iOS with notch is still noticeable a different height but it looks
			 good enough for now
		 */
		paddingTop: 11,
	},
	textInput: {
		...textStyle.extraLargeRegularNeutral,
		flex: 1,
		marginBottom: -4,
		textAlignVertical: "center",
	},
});

export default TopSearchBar;
