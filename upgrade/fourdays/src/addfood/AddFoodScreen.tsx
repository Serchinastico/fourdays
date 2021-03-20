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
import InputFieldDecorator from "../components/InputFieldDecorator";
import { Base64Image, FoodImage } from "./types";
import { Dialog } from "react-native-popup-dialog/src";
import Button from "react-native-button";
import { ImagePickerError, showImagePicker } from "./Camera";
import Toast from "react-native-toast-message";

export interface Props {
	navigation: NavigationScreenProp<any, any>;
	groups: any[];
	store: (name: string, groupId: string, image: FoodImage) => void;
}

export interface State {
	newFoodGroupId: string;
	newFoodName?: string;
	newFoodImage?: FoodImage;
	isShowingImageSourcePicker: boolean;
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
		this.showImageSourcePicker = this.showImageSourcePicker.bind(this);
		this.hideImageSourcePicker = this.hideImageSourcePicker.bind(this);
		this.onPickImageFromCamera = this.onPickImageFromCamera.bind(this);
		this.onPickImageFromGallery = this.onPickImageFromGallery.bind(this);
		this.onImagePickerError = this.onImagePickerError.bind(this);

		const { groups, navigation } = this.props;
		this.state = {
			newFoodGroupId: groups[0].id,
			newFoodImage: undefined,
			newFoodName: navigation.getParam("foodName", undefined),
			isShowingImageSourcePicker: false
		};
	}

	public renderWithInsets(insets: EdgeInsets) {
		const { groups } = this.props;
		const { newFoodName, newFoodImage } = this.state;

		const isAcceptButtonEnabled =
			newFoodName !== undefined &&
			newFoodName.length > 0 &&
			newFoodImage !== undefined;

		return (
			<View style={styles.container}>
				{this.renderTopBar()}
				{this.renderFoodGroupNameEditor(groups, insets.top)}
				{this.renderFoodNameEditor()}
				{this.renderAddFoodImage(newFoodName, newFoodImage)}
				{this.renderAcceptButton(isAcceptButtonEnabled)}
				{this.renderImageSourcePicker()}
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
				onClick={this.showImageSourcePicker}
			/>
		);
	}

	private renderAcceptButton(isEnabled: boolean) {
		return <AcceptButton onPress={this.onAcceptPress} isEnabled={isEnabled} />;
	}

	private renderImageSourcePicker() {
		const { isShowingImageSourcePicker } = this.state;

		return (
			<Dialog
				visible={isShowingImageSourcePicker}
				width="0.8"
				onTouchOutside={this.hideImageSourcePicker}
			>
				<View style={styles.imageSourcePickerContainer}>
					<Button
						style={styles.imageSourcePickerButton}
						color={color.white}
						onPress={this.onPickImageFromCamera}
					>
						{I18n.t("screen.addFood.imagePicker.fromCamera")}
					</Button>
					<Button
						style={styles.imageSourcePickerButton}
						color={color.white}
						onPress={this.onPickImageFromGallery}
					>
						{I18n.t("screen.addFood.imagePicker.fromGallery")}
					</Button>
				</View>
			</Dialog>
		);
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

	private showImageSourcePicker() {
		this.setState({ isShowingImageSourcePicker: true });
	}

	private hideImageSourcePicker() {
		this.setState({ isShowingImageSourcePicker: false });
	}

	private onImagePickerError(error: ImagePickerError) {
		const toastOptions = {
			type: "error",
			visibilityTime: 4000,
			position: "top" as const,
			autoHide: true
		};

		switch (error) {
			case "CAMERA_UNAVAILABLE":
				Toast.show({
					...toastOptions,
					text1: I18n.t("screen.addFood.error.cameraUnavailable")
				});
				break;
			case "UNKNOWN":
				Toast.show({
					...toastOptions,
					text1: I18n.t("screen.common.error.unknown")
				});
				break;
		}
	}

	private onPickImageFromCamera() {
		this.hideImageSourcePicker();
		showImagePicker(
			"CAMERA",
			(response: Base64Image) => {
				if (response) {
					this.onImageSelect({
						data: { uri: `data:image/png;base64,${response}` },
						type: "Base64"
					});
				}
			},
			this.onImagePickerError
		);
	}

	private onPickImageFromGallery() {
		this.hideImageSourcePicker();
		showImagePicker(
			"GALLERY",
			(response: Base64Image) => {
				if (response) {
					this.onImageSelect({
						data: { uri: `data:image/png;base64,${response}` },
						type: "Base64"
					});
				}
			},
			this.onImagePickerError
		);
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
	},
	imageSourcePickerContainer: {
		backgroundColor: color.white
	},
	imageSourcePickerButton: {
		color: color.black,
		padding: 16,
		minWidth: 100,
		alignItems: "center",
		fontWeight: "400"
	}
});

function mapStateToProps(state: any) {
	return { groups: state.setup.groups };
}

export default connect(mapStateToProps, { store: storeCustomFood })(
	AddFoodScreen
);
