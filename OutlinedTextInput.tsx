import {
  View,
  Text,
  TextInput,
  TextInputProps,
  LayoutChangeEvent,
  LayoutRectangle,
  Animated,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";

interface OutlinedTextInputProps extends TextInputProps {}

const OutlinedTextInput = (props: OutlinedTextInputProps) => {
  const { style, ...others } = props;
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const onLayout = (event: LayoutChangeEvent) => {
    setLayout(event.nativeEvent.layout);
  };
  const translateY = useRef(new Animated.Value(10)).current;

  const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    props.onFocus && props.onFocus(e);
    Animated.timing(translateY, {
      toValue: layout?.height ? -(layout?.height / 2) : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    props.onFocus && props.onFocus(e);
    Animated.timing(translateY, {
      toValue: layout?.height ? layout?.height / 2 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "red",
        marginTop: 20,

        // padding: 10,
      }}
    >
      <Pressable></Pressable>
      <Animated.Text
        onLayout={onLayout}
        style={{
          position: "absolute",
          // top: 10,
          left: 10,
          zIndex: 1,
          backgroundColor: "white",
          transform: [
            {
              translateY,
            },
          ],
        }}
      >
        {props.placeholder}
      </Animated.Text>
      <TextInput
        {...others}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        style={{
          borderWidth: 1,
          padding: 10,

          // minimum
          // margin: 10, // minimum
        }}
        placeholder=""
      />
    </View>
  );
};

export default OutlinedTextInput;
