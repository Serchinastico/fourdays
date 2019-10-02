import React from "react";
import {
	SafeAreaView,
	TextInput,
	StyleSheet,
	Keyboard,
	View
} from "react-native";
import I18n from "../translations/i18n";
import IconButton, { IconButtonBack, IconButtonClear } from "./IconButton";
import { color, style, shadow } from "./style/style";

const styles = StyleSheet.create({
	container: {
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
	pickerItem: {
		...style.extraLargeRegularNeutral,
		marginBottom: -4,
		textAlignVertical: "center",
		flex: 1
	}
});

class TopSearchBar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.renderBackIcon = this.renderBackIcon.bind(this);
		this.onBackPressed = this.onBackPressed.bind(this);
		this.onSearchPressed = this.onSearchPressed.bind(this);
		this.onClearPressed = this.onClearPressed.bind(this);
		this.state = { currentSearch: "" };
	}

	onBackPressed() {
		const { onBackPress } = this.props;
		this.textInput.clear();
		Keyboard.dismiss();
		this.onChangeText("");
		onBackPress();
	}

	onSearchPressed() {
		this.textInput.focus();
	}

	onClearPressed() {
		this.textInput.clear();
		this.onChangeText("");
	}

	onChangeText(text) {
		const { onChangeText } = this.props;
		this.setState({ currentSearch: text });
		onChangeText(text);
	}

	isSearchEmpty() {
		const { currentSearch } = this.state;
		return currentSearch.length === 0;
	}

	renderBackIcon() {
		return <IconButton icon={IconButtonBack} onPressed={this.onBackPressed} />;
	}

	renderClearIcon() {
		if (this.isSearchEmpty()) {
			return null;
		}

		return (
			<IconButton icon={IconButtonClear} onPressed={this.onClearPressed} />
		);
	}

	render() {
		const { currentSearch } = this.state;

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.innerContainer}>
					{this.renderBackIcon()}
					<TextInput
						ref={input => (this.textInput = input)}
						style={styles.textInput}
						autoFocus
						placeholder={I18n.t("common.search.placeholder")}
						placeholderTextColor={color.black50}
						onChangeText={text => this.onChangeText(text)}
						value={currentSearch}
					/>
					{this.renderClearIcon()}
				</View>
			</SafeAreaView>
		);
	}
}
export default TopSearchBar;
