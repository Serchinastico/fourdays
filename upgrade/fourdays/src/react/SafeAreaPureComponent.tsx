import React, { ReactNode } from "react";
import {
	EdgeInsets,
	SafeAreaInsetsContext
} from "react-native-safe-area-context";

export default abstract class SafeAreaComponent<
	Props = {},
	State = {}
> extends React.PureComponent<Props, State> {
	public abstract renderWithInsets(insets: EdgeInsets): ReactNode;

	public render() {
		return (
			<SafeAreaInsetsContext.Consumer>
				{insets => this.renderWithInsets(insets!)}
			</SafeAreaInsetsContext.Consumer>
		);
	}
}
