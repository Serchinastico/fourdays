import React, { createRef } from "react";
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
import AddFoodImageCard from "./AddFoodImageCard";
import InputField from "./InputField";

export interface Props {}

export interface State {
	newFoodGroupName: string;
	newFoodName: string;
}

class AddFoodScreen extends React.Component<Props, State> {
	private groupNameRef = createRef<TextInput>();
	private foodNameRef = createRef<TextInput>();

	constructor(props: Props) {
		super(props);
		this.state = {
			newFoodGroupName: "",
			newFoodName: ""
		};
	}

	public render() {
		const { newFoodName } = this.state;

		return (
			<View style={styles.container}>
				{this.renderTopBar()}
				{this.renderFoodGroupNameEditor()}
				{this.renderFoodNameEditor()}
				{this.renderAddFoodImage(newFoodName)}
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
					ref={this.groupNameRef}
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
					ref={this.foodNameRef}
					style={styles.textInput}
					placeholder={I18n.t("screen.addFood.foodNamePlaceholder")}
					placeholderTextColor={color.black50}
					onChangeText={text => this.onChangeText(text)}
					value={newFoodName}
				/>
			</InputField>
		);
	}

	private renderAddFoodImage(name: string) {
		return (
			<AddFoodImageCard
				name={name}
				style={styles.addFood}
				onPressed={this.onLoadImagePressed}
			/>
		);
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

	private onLoadImagePressed() {}
}

const styles = StyleSheet.create({
	addFood: {
		flex: 1,
		margin: 16,
		marginBottom: 64 /* Accept button */ + 16 /* Regular margin */
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
