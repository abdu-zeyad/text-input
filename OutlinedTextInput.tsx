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
  TextStyle,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

interface OutlinedTextInputProps extends TextInputProps {}

const OutlinedTextInput = (props: OutlinedTextInputProps) => {
  const { style, ...others } = props;
  const [placeHolderDimension, setPlaceHolderDimension] =
    useState<LayoutRectangle | null>(null);
  const [textInputDimension, setTextInputDimension] =
    useState<LayoutRectangle | null>(null);

  const placeHolderHeight = placeHolderDimension?.height ?? 0;

  const translateY = useRef(new Animated.Value(placeHolderHeight / 2)).current;
  const translateX = useRef(new Animated.Value(placeHolderHeight / 2)).current;

  const parsedStyle = props.style?.valueOf() as TextStyle;

  const handleOnFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    props.onFocus && props.onFocus(e);

    Animated.timing(translateY, {
      toValue: -placeHolderHeight / 2,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const handleOnBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    props.onFocus && props.onFocus(e);
    Animated.timing(translateY, {
      toValue: placeHolderHeight / 2,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateX, {
      toValue: -placeHolderHeight / 2,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const padding = placeHolderHeight / 2;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: placeHolderHeight / 2,
      duration: 0,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateX, {
      toValue: placeHolderHeight / 2,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [placeHolderDimension]);

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "red",
        marginTop: 20,
        // padding: 10,
      }}
    >
      <Animated.Text
        onLayout={(e) => {
          setPlaceHolderDimension(e.nativeEvent.layout);
        }}
        style={{
          // position: "absolute",
          // top: 10,
          //  left: 10,
          zIndex: 1,
          backgroundColor: "blue",
          fontSize: parsedStyle.fontSize ?? 16,
          transform: [
            {
              translateY,
            },
            {
              translateX,
            },
            {
              scale: translateY.interpolate({
                inputRange: [0, placeHolderHeight / 2],
                outputRange: [0.5, 1],
                extrapolate: "clamp",
              }),
            },
          ],
          alignSelf: "flex-start",
        }}
      >
        {props.placeholder}
      </Animated.Text>
      <TextInput
        {...others}
        onLayout={(e) => {
          setTextInputDimension(e.nativeEvent.layout);
        }}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        style={[
          style,
          {
            // borderWidth: 1,
            padding,
            // paddingHorizontal: 10,
          },
        ]}
        placeholder=""
      />
    </View>
  );
};

export default OutlinedTextInput;
