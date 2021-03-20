import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View, StyleProp, ViewStyle } from 'react-native';

export interface Props {
	style?: StyleProp<ViewStyle>;
}

const DismissKeyboardView: React.FC<React.PropsWithChildren<Props>> = (
  {children, ...props}
) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View {...props}>
        {children}
      </View>
    </TouchableWithoutFeedback>
)

export default DismissKeyboardView