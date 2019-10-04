import React from "react";
import { Provider } from "react-redux";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { AppRegistry, YellowBox, StatusBar } from "react-native";
// eslint-disable-next-line import/no-unresolved
import AddFoodScreen from "./addfood/AddFoodScreen";
import SetupScreen from "./setup/SetupScreen";
import DailyTrackerScreen from "./dailytracker/DailyTrackerScreen";

import store from "./redux/redux";
import StartScreen from "./start/StartScreen";

const AppNavigator = createSwitchNavigator(
	{
		Start: StartScreen,
		Setup: SetupScreen,
		DailyTracker: DailyTrackerScreen,
		AddFood: AddFoodScreen
	},
	{
		defaultNavigationOptions: {
			header: null
		}
	}
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
	<Provider store={store}>
		<StatusBar backgroundColor="white" barStyle="dark-content" />
		<AppContainer />
	</Provider>
);

YellowBox.ignoreWarnings(["Require cycle:"]);

AppRegistry.registerComponent("fourdays", () => App);

export default App;
