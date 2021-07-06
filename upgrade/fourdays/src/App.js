import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import {
	createStackNavigator,
	createAppContainer,
	createBottomTabNavigator
} from "react-navigation";
import { AppRegistry, YellowBox, StatusBar } from "react-native";
// eslint-disable-next-line import/no-unresolved
import AddFoodScreen from "./addfood/AddFoodScreen";
import CreateGroupScreen from "./creategroup/CreateGroupScreen";
import SetupScreen from "./setup/SetupScreen";
import DailyTrackerScreen from "./dailytracker/DailyTrackerScreen";

import store from "./redux/redux";
import StartScreen from "./start/StartScreen";
import Toast from "react-native-toast-message";
import { BottomNavigation } from "./components/BottomNavigation";

const AppNavigator = createBottomTabNavigator(
	{
		Start: StartScreen,
		Setup: createStackNavigator(
			{
				Setup: SetupScreen,
				CreateGroup: CreateGroupScreen,
				AddFood: AddFoodScreen
			},
			{
				mode: "modal",
				defaultNavigationOptions: {
					header: null
				}
			}
		),
		DailyTracker: createStackNavigator(
			{
				Tracker: DailyTrackerScreen,
				AddFood: AddFoodScreen
			},
			{
				mode: "modal",
				defaultNavigationOptions: {
					header: null
				}
			}
		)
	},
	{
		defaultNavigationOptions: {
			tabBarVisible: false,
		},
	}
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
	<Provider store={store}>
		<StatusBar backgroundColor="white" barStyle="dark-content" />
		<SafeAreaProvider>
			<AppContainer />
			<Toast ref={ref => Toast.setRef(ref)} />
		</SafeAreaProvider>
	</Provider>
);

YellowBox.ignoreWarnings(["Require cycle:"]);

AppRegistry.registerComponent("fourdays", () => App);

export default App;
