import * as R from "ramda";
import React, { createRef } from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, TextInput, View } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";
import TopAppBar from "../components/TopAppBar";
// @ts-ignore
import { color } from "../components/style/color";
import I18n from "../translations/i18n";
// @ts-ignore
import AcceptButton from "../components/AcceptButton";
// @ts-ignore
import IconButton, { IconButtonClear } from "../components/IconButton";
import AddFoodImageCard from "./AddFoodImageCard";
import InputFieldDecorator from "./InputFieldDecorator";
import { storeCustomFood } from "./actions";
import { FoodImage } from "./types";
import { NavigationScreenProp } from "react-navigation";
import { textStyle } from "../components/style/font";
import SafeAreaComponent from "../react/SafeAreaComponent";

export interface Props {
	navigation: NavigationScreenProp<any, any>;
	groups: any[];
	storeCustomFood: (name: string, groupId: string, image: FoodImage) => void;
}

export interface State {
	newFoodGroupId: string;
	newFoodName?: string;
	newFoodImage?: FoodImage;
}

class AddFoodScreen extends SafeAreaComponent<Props, State> {
	private foodNameRef = createRef<TextInput>();

	constructor(props: Props) {
		super(props);
		this.renderWithInsets = this.renderWithInsets.bind(this);
		this.onClosePressed = this.onClosePressed.bind(this);
		this.onChangeFoodName = this.onChangeFoodName.bind(this);
		this.onAcceptPress = this.onAcceptPress.bind(this);
		this.onImageSelect = this.onImageSelect.bind(this);

		const { groups, navigation } = this.props;
		this.state = {
			newFoodGroupId: groups[0].id,
			newFoodName: navigation.getParam("foodName", undefined),
			newFoodImage: undefined
		};
	}

	renderWithInsets(insets: EdgeInsets) {
		const { groups } = this.props;
		const { newFoodName, newFoodImage } = this.state;

		const isAcceptButtonEnabled =
			newFoodName !== undefined && newFoodImage !== undefined;

		const topInset = insets === null ? 0 : insets.top;

		return (
			<View style={styles.container}>
				{this.renderTopBar()}
				{this.renderFoodGroupNameEditor(groups, topInset)}
				{this.renderFoodNameEditor()}
				{this.renderAddFoodImage(newFoodName, newFoodImage)}
				{this.renderAcceptButton(isAcceptButtonEnabled)}
			</View>
		);
	}

	private renderTopBar() {
		return (
			<TopAppBar
				title={I18n.t("screen.addFood.title")}
				buttons={this.renderTopAppBarButtons()}
			/>
		);
	}

	private renderTopAppBarButtons() {
		return (
			<IconButton icon={IconButtonClear} onPressed={this.onClosePressed} />
		);
	}

	private renderFoodGroupNameEditor(groups: any[], topInset: number) {
		const { newFoodGroupId } = this.state;

		const pickerValues = R.map(
			group => ({ label: group.name, value: group.id }),
			groups
		);

		return (
			<InputFieldDecorator
				style={[styles.textInputContainer, { marginTop: topInset }]}
				headerText={I18n.t("screen.addFood.groupNameHeader")}
			>
				<RNPickerSelect
					style={styles.textInput}
					value={newFoodGroupId}
					placeholder={{}}
					onValueChange={value => this.setState({ newFoodGroupId: value })}
					items={pickerValues}
				/>
			</InputFieldDecorator>
		);
	}

	private renderFoodNameEditor() {
		const { newFoodName } = this.state;

		return (
			<InputFieldDecorator
				style={styles.textInputContainer}
				headerText={I18n.t("screen.addFood.foodNameHeader")}
			>
				<TextInput
					ref={this.foodNameRef}
					style={styles.textInput}
					placeholder={I18n.t("screen.addFood.foodNamePlaceholder")}
					placeholderTextColor={color.black50}
					onChangeText={text => this.onChangeFoodName(text)}
					value={newFoodName}
				/>
			</InputFieldDecorator>
		);
	}

	private renderAddFoodImage(name?: string, image?: FoodImage) {
		return (
			<AddFoodImageCard
				name={name || ""}
				image={image}
				style={styles.addFood}
				onImageSelect={this.onImageSelect}
			/>
		);
	}

	private renderAcceptButton(isEnabled: boolean) {
		return <AcceptButton onPress={this.onAcceptPress} isEnabled={isEnabled} />;
	}

	private onClosePressed() {
		const { navigation } = this.props;
		navigation.goBack();
	}

	private onChangeFoodName(text: string) {
		this.setState({ newFoodName: text });
	}

	private onAcceptPress() {
		const { navigation, storeCustomFood } = this.props;
		const { newFoodGroupId, newFoodName, newFoodImage } = this.state;

		if (!newFoodName) {
			return;
		}

		if (!newFoodImage) {
			return;
		}

		storeCustomFood(newFoodName, newFoodGroupId, newFoodImage);
		navigation.goBack();
	}

	private onImageSelect(data: FoodImage) {
		this.setState({ newFoodImage: data });
	}
}

const styles = StyleSheet.create({
	addFood: {
		flex: 1,
		marginBottom: 64
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
		...textStyle.largeRegularBlack
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

function mapStateToProps(state: any) {
	return { groups: state.setup.groups };
}

export default connect(
	mapStateToProps,
	{ storeCustomFood }
)(AddFoodScreen);
