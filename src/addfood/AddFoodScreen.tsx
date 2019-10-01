import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { connect } from "react-redux";
// @ts-ignore
import TopAppBar from "../components/TopAppBar";
// @ts-ignore
import { style, color } from "../components/style/style";
// @ts-ignore
import I18n from "../translations/i18n";
// @ts-ignore
import AcceptButton from "../components/AcceptButton";
// @ts-ignore
import IconButton, { IconButtonClear } from "../components/IconButton";
import AddFoodImageView from "./AddFoodImageView";
import InputField from "./InputField";

export interface Props {}

export interface State {
	newFoodGroupName: string;
	newFoodName: string;
}

class AddFoodScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			newFoodGroupName: "",
			newFoodName: ""
		};
	}

	public render() {
		return (
			<View style={styles.container}>
				{this.renderTopBar()}
				{this.renderFoodGroupNameEditor()}
				{this.renderFoodNameEditor()}
				{this.renderAddFoodImage()}
				{this.renderAcceptButton()}
			</View>
		);
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
			<IconButton icon={IconButtonClear} onPressed={this.onClosePressed()} />
		);
	}

	private renderFoodGroupNameEditor() {
		const { newFoodGroupName } = this.state;

		return (
			<InputField
				style={styles.textInputContainer}
				headerText={I18n.t("screen.addFood.groupNameHeader")}
			>
				<TextInput
					style={styles.textInput}
					onChangeText={text => this.onChangeText(text)}
					value={newFoodGroupName}
				/>
			</InputField>
		);
	}

	private renderFoodNameEditor() {
		const { newFoodName } = this.state;

		return (
			<InputField
				style={styles.textInputContainer}
				headerText={I18n.t("screen.addFood.foodNameHeader")}
			>
				<TextInput
					style={styles.textInput}
					placeholder={I18n.t("screen.addFood.foodNamePlaceholder")}
					placeholderTextColor={color.black50}
					onChangeText={text => this.onChangeText(text)}
					value={newFoodName}
				/>
			</InputField>
		);
	}

	private renderAddFoodImage() {
		return <AddFoodImageView style={styles.addFood} />;
	}

	private renderAcceptButton() {
		return (
			<SafeAreaView style={styles.footer}>
				<AcceptButton onPress={this.onAcceptPress} />
			</SafeAreaView>
		);
	}

	private onClosePressed() {}

	private onChangeText(text: string) {}

	private onAcceptPress() {}
}

const styles = StyleSheet.create({
	addFood: {
		flex: 1,
		margin: 16
	},
	container: {
		flex: 1,
		backgroundColor: color.white,
		paddingTop: 88 + 16
	},
	footer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0
	},
	textInput: {
		...style.extraLargeRegularNeutral,
		textAlignVertical: "center"
	},
	textInputContainer: {
		marginLeft: 16,
		marginRight: 16,
		marginTop: 16
	},
	topBarContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0
	}
});

function mapStateToProps(_: any) {
	return {};
}

export default connect(mapStateToProps)(AddFoodScreen);
