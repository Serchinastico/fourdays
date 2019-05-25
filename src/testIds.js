import { Platform } from "react-native";

const getPlatformTestId = id =>
	Platform.OS === "ios"
		? { testID: id }
		: { accessible: true, accessibilityLabel: id };

/**
 * Adds a testID to the views on Android and iOS in their specific ways. On Android,
 * this will result in a ContentDescription on Debug builds (and no changes on live builds).
 */
const setTestId = id => (__DEV__ ? getPlatformTestId(id) : null);

export default setTestId;
