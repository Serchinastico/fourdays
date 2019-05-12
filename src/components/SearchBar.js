import React from "react";
import { Image, TextInput, StyleSheet, View } from "react-native";
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
	icon: {
		width: 24,
		height: 24,
		marginLeft: 16
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
	render() {
		const { onChangeText, style } = this.props;
		return (
			<View style={style}>
				<View style={styles.shadowContainer}>
					<Image
						style={styles.icon}
						source={require("../images/icon/Search.png")}
					/>
					<TextInput
						style={styles.textInput}
						placeholder={I18n.t("common.search.placeholder")}
						placeholderTextColor={color.black50}
						onChangeText={text => onChangeText(text)}
					/>
				</View>
			</View>
		);
	}
}
export default SearchBar;
