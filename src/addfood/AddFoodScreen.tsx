import * as R from "ramda";
import React, { createRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { EdgeInsets } from "react-native-safe-area-context";
import { NavigationScreenProp } from "react-navigation";
import { connect } from "react-redux";
import AcceptButton from "../components/AcceptButton";
import IconButton, { Icon } from "../components/IconButton";
import { color } from "../components/style/color";
import { textStyle } from "../components/style/font";
import TopAppBar from "../components/TopAppBar";
import SafeAreaComponent from "../react/SafeAreaComponent";
import I18n from "../translations/i18n";
import { storeCustomFood } from "./actions";
import AddFoodImageCard from "./AddFoodImageCard";
import InputFieldDecorator from "./InputFieldDecorator";
import { FoodImage } from "./types";

export interface Props {
	navigation: NavigationScreenProp<any, any>;
	groups: any[];
	store: (name: string, groupId: string, image: FoodImage) => void;
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
		this.onClosePress = this.onClosePress.bind(this);
		this.onFoodNameChange = this.onFoodNameChange.bind(this);
		this.onPickerValueChange = this.onPickerValueChange.bind(this);
		this.onAcceptPress = this.onAcceptPress.bind(this);
		this.onImageSelect = this.onImageSelect.bind(this);

		const { groups, navigation } = this.props;
		this.state = {
			newFoodGroupId: groups[0].id,
			newFoodImage: undefined,
			newFoodName: navigation.getParam("foodName", undefined)
		};
	}

	public renderWithInsets(insets: EdgeInsets) {
		const { groups } = this.props;
		const { newFoodName, newFoodImage } = this.state;

		const isAcceptButtonEnabled =
			newFoodName !== undefined && newFoodImage !== undefined;

		return (
			<View style={styles.container}>
				{this.renderTopBar()}
				{this.renderFoodGroupNameEditor(groups, insets.top)}
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
		return <IconButton icon={Icon.Clear} onPress={this.onClosePress} />;
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
					onValueChange={this.onPickerValueChange}
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
					onChangeText={this.onFoodNameChange}
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

	private onClosePress() {
		const { navigation } = this.props;
		navigation.goBack();
	}

	private onFoodNameChange(text: string) {
		this.setState({ newFoodName: text });
	}

	private onPickerValueChange(value: string) {
		this.setState({ newFoodGroupId: value });
	}

	private onAcceptPress() {
		const { navigation, store } = this.props;
		const { newFoodGroupId, newFoodName, newFoodImage } = this.state;

		if (!newFoodName) {
			return;
		}

		if (!newFoodImage) {
			return;
		}

		store(newFoodName, newFoodGroupId, newFoodImage);
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
		backgroundColor: color.white,
		flex: 1,
		paddingTop: 88 + 16
	},
	footer: {
		bottom: 0,
		left: 0,
		position: "absolute",
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
		left: 0,
		position: "absolute",
		right: 0,
		top: 0
	}
});

function mapStateToProps(state: any) {
	return { groups: state.setup.groups };
}

export default connect(
	mapStateToProps,
	{ store: storeCustomFood }
)(AddFoodScreen);
