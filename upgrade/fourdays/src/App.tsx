import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AppRegistry, StatusBar, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-unresolved
import AddFoodScreen from './addfood/AddFoodScreen';
import { BottomNavigation } from './components/BottomNavigation';
import CreateGroupScreen from './creategroup/CreateGroupScreen';
import DailyTrackerScreen from './dailytracker/DailyTrackerScreen';
import store from './redux/redux';
import SetupScreen from './setup/SetupScreen';
import StartScreen from './start/StartScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const AppNavigator = createBottomTabNavigator(
// 	{
// 		Start: StartScreen,
// 		Setup: createStackNavigator(
// 			{
// 				Setup: SetupScreen,
// 				CreateGroup: CreateGroupScreen,
// 				AddFood: AddFoodScreen,
// 			},
// 			{
// 				mode: 'modal',
// 				defaultNavigationOptions: {
// 					header: null,
// 				},
// 			},
// 		),
// 		DailyTracker: createStackNavigator(
// 			{
// 				Tracker: DailyTrackerScreen,
// 				AddFood: AddFoodScreen,
// 			},
// 			{
// 				mode: 'modal',
// 				defaultNavigationOptions: {
// 					header: null,
// 				},
// 			},
// 		),
// 	},
// 	{
// 		tabBarComponent: BottomNavigation,
// 	},
// );

// const AppContainer = createAppContainer(AppNavigator);

const App = () => (
	<Provider store={store}>
		<StatusBar backgroundColor="white" barStyle="dark-content" />
		<SafeAreaProvider>
			<NavigationContainer>
				<Tab.Navigator tabBar={props => <BottomNavigation {...props} />}>
					<Tab.Screen name="Start" component={StartScreen} />
					<Tab.Screen name="Setup" component={SetupScreen} />
					<Tab.Screen name="DailyTracker" component={DailyTrackerScreen} />
				</Tab.Navigator>
				<Toast ref={ref => Toast.setRef(ref)} />
			</NavigationContainer>
		</SafeAreaProvider>
	</Provider>
);

LogBox.ignoreLogs(['Require cycle:']);

AppRegistry.registerComponent('fourdays', () => App);

export default App;
