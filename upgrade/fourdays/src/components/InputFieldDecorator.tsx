import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { color } from "./style/color";
import { textStyle } from "./style/font";

export interface Props {
	headerText: string;
	style?: StyleProp<ViewStyle>;
}

class InputFieldDecorator extends React.PureComponent<Props> {
	private static renderHeader(text: string) {
		return <Text style={styles.header}>{text}</Text>;
	}

	private static renderBottomLine() {
		return <View style={styles.bottomLine} />;
	}
	public render() {
		const { headerText, style, children } = this.props;

		return (
			<View style={[styles.container, style]}>
				{InputFieldDecorator.renderHeader(headerText)}
				<View style={styles.childrenContainer}>{children}</View>
				{InputFieldDecorator.renderBottomLine()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bottomLine: {
		backgroundColor: color.black20,
		height: 0.5
	},
	childrenContainer: {
		flex: 1,
		justifyContent: "center"
	},
	container: {
		flexDirection: "column",
		height: 68
	},
	header: {
		...textStyle.h3
	}
});

export default InputFieldDecorator;
