import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
// @ts-ignore
import TopAppBar from "../components/TopAppBar";
// @ts-ignore
import { style, color } from "../components/style/style";
// @ts-ignore
import I18n from "../translations/i18n";
// @ts-ignore
import IconButton, { IconButtonClose } from "../components/IconButton";

class AddFoodScreen extends React.Component {
	public render() {
		return <View style={styles.container}>{this.renderTopBar()}</View>;
	}

	private renderTopBar() {
		const topBar = (
			<TopAppBar
				title={I18n.t("screen.addFood.title")}
				buttons={this.renderTopAppBarButtons()}
			/>
		);

		return <View style={styles.topBarContainer}>{topBar}</View>;
	}

	private renderTopAppBarButtons() {
		return (
			<IconButton icon={IconButtonClose} onPressed={this.onClosePressed()} />
		);
	}

	private onClosePressed() {}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: color.white
	},
	topBarContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0
	}
});

function mapStateToProps(state: any) {
	return {};
}

export default connect(mapStateToProps)(AddFoodScreen);
