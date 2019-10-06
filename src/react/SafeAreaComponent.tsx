import React, { ReactNode } from "react";
import { EdgeInsets, SafeAreaConsumer } from "react-native-safe-area-context";

export default abstract class SafeAreaComponent<
	Props = {},
	State = {}
> extends React.Component<Props, State> {
	public abstract renderWithInsets(insets: EdgeInsets): ReactNode;

	render() {
		return (
			<SafeAreaConsumer>
				{insets => this.renderWithInsets(insets!)}
			</SafeAreaConsumer>
		);
	}
}
