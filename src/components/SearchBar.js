import React from "react";
import {
	Image,
	TextInput,
	TouchableHighlight,
	StyleSheet,
	Keyboard,
	View
} from "react-native";
import I18n from "../translations/i18n";
import { color, style } from "./style/style";

const styles = StyleSheet.create({
	shadowContainer: {
		elevation: 2,
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 8,
		borderColor: "#EBEBEB",
		borderWidth: 1,
		shadowRadius: 2,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 1 },
		backgroundColor: color.white,
		height: 48
	},
	searchIcon: {
		width: 24,
		height: 24,
		marginLeft: 16
	},
	clearIcon: {
		width: 24,
		height: 24,
		marginRight: 16
	},
	textInput: {
		...style.extraLargeRegularNeutral,
		marginLeft: 16,
		marginBottom: -4,
		textAlignVertical: "center",
		flex: 1
	}
});

class SearchBar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.renderSearchIcon = this.renderSearchIcon.bind(this);
		this.onBackPressed = this.onBackPressed.bind(this);
		this.onSearchPressed = this.onSearchPressed.bind(this);
		this.onClearPressed = this.onClearPressed.bind(this);
		this.state = { currentSearch: "" };
	}

	onBackPressed() {
		this.textInput.clear();
		Keyboard.dismiss();
		this.onChangeText("");
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

	renderSearchIcon() {
		if (this.isSearchEmpty()) {
			return (
				<TouchableHighlight
					underlayColor={color.black05}
					style={styles.searchIcon}
					onPress={this.onSearchPressed}
				>
					<Image source={require("../images/icon/Search.png")} />
				</TouchableHighlight>
			);
		} else {
			return (
				<TouchableHighlight
					underlayColor={color.black05}
					style={styles.searchIcon}
					onPress={this.onBackPressed}
				>
					<Image source={require("../images/icon/Back.png")} />
				</TouchableHighlight>
			);
		}
	}

	renderClearIcon() {
		if (this.isSearchEmpty()) {
			return null;
		} else {
			return (
				<TouchableHighlight
					underlayColor={color.black05}
					style={styles.clearIcon}
					onPress={this.onClearPressed}
				>
					<Image
						style={styles.clearIcon}
						source={require("../images/icon/Clear.png")}
					/>
				</TouchableHighlight>
			);
		}
	}

	render() {
		const { style } = this.props;
		const { currentSearch } = this.state;
		return (
			<View style={style}>
				<View style={styles.shadowContainer}>
					{this.renderSearchIcon()}
					<TextInput
						ref={input => (this.textInput = input)}
						style={styles.textInput}
						placeholder={I18n.t("common.search.placeholder")}
						placeholderTextColor={color.black50}
						onChangeText={text => this.onChangeText(text)}
						value={currentSearch}
					/>
					{this.renderClearIcon()}
				</View>
			</View>
		);
	}
}
export default SearchBar;
