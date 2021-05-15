import React, { createRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
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
import { storeCustomGroup } from "./actions";
import InputFieldDecorator from "../components/InputFieldDecorator";
import DismissKeyboardView from "../components/DismissKeyboardView";

export interface Props {
	navigation: NavigationScreenProp<any, any>;
	groups: any[];
	store: (groupName: string) => void;
}

export interface State {
	newGroupName?: string;
}

class CreateGroupScreen extends SafeAreaComponent<Props, State> {
	private foodNameRef = createRef<TextInput>();

	constructor(props: Props) {
		super(props);
		this.renderWithInsets = this.renderWithInsets.bind(this);
		this.onClosePress = this.onClosePress.bind(this);
		this.onGroupNameChange = this.onGroupNameChange.bind(this);
		this.onAcceptPress = this.onAcceptPress.bind(this);

		this.state = {
			newGroupName: undefined
		};
	}

	public renderWithInsets(_: EdgeInsets) {
		const { newGroupName } = this.state;

		const isAcceptButtonEnabled = newGroupName !== undefined;

		return (
			<DismissKeyboardView style={styles.container}>
				{this.renderTopBar()}
				{this.renderGroupNameEditor()}
				{this.renderAcceptButton(isAcceptButtonEnabled)}
			</DismissKeyboardView>
		);
	}

	private renderTopBar() {
		return (
			<TopAppBar
				title={I18n.t("screen.createGroup.title")}
				buttons={this.renderTopAppBarButtons()}
			/>
		);
	}

	private renderTopAppBarButtons() {
		return <IconButton icon={Icon.Clear} onPress={this.onClosePress} />;
	}

	private renderGroupNameEditor() {
		const { newGroupName } = this.state;

		return (
			<InputFieldDecorator
				style={styles.textInputContainer}
				headerText={I18n.t("screen.createGroup.groupNameHeader")}
			>
				<TextInput
					ref={this.foodNameRef}
					style={styles.textInput}
					placeholder={I18n.t("screen.createGroup.groupNamePlaceholder")}
					placeholderTextColor={color.black50}
					onChangeText={this.onGroupNameChange}
					value={newGroupName}
				/>
			</InputFieldDecorator>
		);
	}

	private renderAcceptButton(isEnabled: boolean) {
		return <AcceptButton onPress={this.onAcceptPress} isEnabled={isEnabled} />;
	}

	private onClosePress() {
		const { navigation } = this.props;
		navigation.goBack();
	}

	private onGroupNameChange(text: string) {
		this.setState({ newGroupName: text });
	}

	private onAcceptPress() {
		const { navigation, store } = this.props;
		const { newGroupName } = this.state;

		if (!newGroupName) {
			return;
		}

		store(newGroupName);
		navigation.goBack();
	}
}

const styles = StyleSheet.create({
	addFood: {
		flex: 1,
		marginBottom: 64
	},
	container: {
		backgroundColor: color.cloud,
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

export default connect(mapStateToProps, { store: storeCustomGroup })(
	CreateGroupScreen
);
