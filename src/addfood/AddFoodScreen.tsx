import React, { createRef } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	SafeAreaView,
	StyleSheet,
	TextInput,
	View
} from "react-native";
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
import GroupNamePicker from "./GroupNamePicker";
import { Base64Image } from "./Camera";

export interface Props {
	groups: any[];
}

export interface State {
	newFoodGroupName: string;
	newFoodName?: string;
	newFoodImage?: Base64Image;
	isKeyboardOpen: boolean;
}

class AddFoodScreen extends React.Component<Props, State> {
	private foodNameRef = createRef<TextInput>();

	constructor(props: Props) {
		super(props);
		this.onClosePressed = this.onClosePressed.bind(this);
		this.onChangeFoodName = this.onChangeFoodName.bind(this);
		this.onAcceptPress = this.onAcceptPress.bind(this);
		this.onImageSelect = this.onImageSelect.bind(this);
		Keyboard.addListener("keyboardDidShow", this.keyboardDidShow.bind(this));
		Keyboard.addListener("keyboardDidHide", this.keyboardDidHide.bind(this));
		this.state = {
			newFoodGroupName: "",
			newFoodName: undefined,
			newFoodImage: undefined,
			isKeyboardOpen: false
		};
	}

	public render() {
		const { groups } = this.props;
		const { newFoodName, newFoodImage, isKeyboardOpen } = this.state;

		const isAcceptButtonEnabled =
			newFoodName !== undefined && newFoodImage !== undefined;

		return (
			<View style={styles.container}>
				{this.renderTopBar()}
				{this.renderFoodGroupNameEditor(groups)}
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
			<IconButton icon={IconButtonClear} onPressed={this.onClosePressed()} />
		);
	}

	private renderFoodGroupNameEditor(groups: any[]) {
		const { newFoodGroupName } = this.state;

		return (
			<InputField
				style={styles.textInputContainer}
				headerText={I18n.t("screen.addFood.groupNameHeader")}
			>
				<GroupNamePicker
					groups={groups}
					selectedGroupName={newFoodGroupName}
					onValueChange={(itemValue: string) =>
						this.setState({ newFoodGroupName: itemValue })
					}
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

	private renderAddFoodImage(name?: string, image?: Base64Image) {
		return (
			<AddFoodImageCard
				name={name || ""}
				image={image}
				style={{ flex: 1 }}
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
				<SafeAreaView>
					<AcceptButton onPress={this.onAcceptPress} isEnabled={isEnabled} />
				</SafeAreaView>
			</KeyboardAvoidingView>
		);
	}

	private onClosePressed() {}

	private onChangeFoodName(text: string) {
		this.setState({ newFoodName: text });
	}

	private onAcceptPress() {}

	private onImageSelect(data: Base64Image) {
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
		flex: 1
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

function mapStateToProps(state: any) {
	return { groups: state.setup.groups };
}

export default connect(mapStateToProps)(AddFoodScreen);
