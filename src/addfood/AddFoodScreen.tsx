import * as R from "ramda";
import React, { createRef } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
	Keyboard,
	KeyboardAvoidingView,
	StyleSheet,
	TextInput,
	View
} from "react-native";
import { EdgeInsets, SafeAreaConsumer } from "react-native-safe-area-context";
import { connect } from "react-redux";
// @ts-ignore
import TopAppBar from "../components/TopAppBar";
// @ts-ignore
import { style, color } from "../components/style/style";
import I18n from "../translations/i18n";
// @ts-ignore
import AcceptButton from "../components/AcceptButton";
// @ts-ignore
import IconButton, { IconButtonClear } from "../components/IconButton";
import AddFoodImageCard from "./AddFoodImageCard";
import InputField from "./InputField";
import { storeCustomFood } from "./actions";
import { FoodImage } from "./types";
import { NavigationScreenProp } from "react-navigation";

export interface Props {
	navigation: NavigationScreenProp<any, any>;
	groups: any[];
	storeCustomFood: (name: string, groupId: string, image: FoodImage) => void;
}

export interface State {
	newFoodGroupId: string;
	newFoodName?: string;
	newFoodImage?: FoodImage;
	isKeyboardOpen: boolean;
}

class AddFoodScreen extends React.Component<Props, State> {
	private foodNameRef = createRef<TextInput>();

	constructor(props: Props) {
		super(props);
		this.renderWithInsets = this.renderWithInsets.bind(this);
		this.onClosePressed = this.onClosePressed.bind(this);
		this.onChangeFoodName = this.onChangeFoodName.bind(this);
		this.onAcceptPress = this.onAcceptPress.bind(this);
		this.onImageSelect = this.onImageSelect.bind(this);
		Keyboard.addListener("keyboardDidShow", this.keyboardDidShow.bind(this));
		Keyboard.addListener("keyboardDidHide", this.keyboardDidHide.bind(this));

		const { groups, navigation } = this.props;
		this.state = {
			newFoodGroupId: groups[0].id,
			newFoodName: navigation.getParam("foodName", undefined),
			newFoodImage: undefined,
			isKeyboardOpen: false
		};
	}

	public render() {
		return <SafeAreaConsumer>{this.renderWithInsets}</SafeAreaConsumer>;
	}

	private renderWithInsets(insets: EdgeInsets | null) {
		const { groups } = this.props;
		const { newFoodName, newFoodImage, isKeyboardOpen } = this.state;

		const isAcceptButtonEnabled =
			newFoodName !== undefined && newFoodImage !== undefined;

		const topInset = insets === null ? 0 : insets.top;

		return (
			<View style={styles.container}>
				{this.renderTopBar()}
				{this.renderFoodGroupNameEditor(groups, topInset)}
				{this.renderFoodNameEditor()}
				{this.renderAddFoodImage(newFoodName, newFoodImage)}
				{this.renderAcceptButton(isAcceptButtonEnabled, isKeyboardOpen)}
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
			<InputField
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
					onChangeText={text => this.onChangeFoodName(text)}
					value={newFoodName}
				/>
			</InputField>
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

	private renderAcceptButton(isEnabled: boolean, isKeyboardOpen: boolean) {
		// Terrible hack, in my Samsung S9+, when the keyboard appears, the accept button is below it. That's why we
		// are listening to keyboard events and adding a bogus margin at the bottom.
		const marginBottom = isKeyboardOpen ? 24 : 0;

		return (
			<KeyboardAvoidingView
				style={{ ...styles.footer, marginBottom }}
				behavior="position"
			>
				<AcceptButton onPress={this.onAcceptPress} isEnabled={isEnabled} />
			</KeyboardAvoidingView>
		);
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

	private keyboardDidShow() {
		this.setState({ isKeyboardOpen: true });
	}

	private keyboardDidHide() {
		this.setState({ isKeyboardOpen: false });
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
		...style.largeRegularBlack
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
