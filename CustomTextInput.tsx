import {
  Animated,
  LayoutRectangle,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import React, { useRef, useState } from "react";

interface CustomTextInputProps extends TextInputProps {}
const SCALE = 0.7;

const CustomTextInput = (inputProps: CustomTextInputProps) => {
  const { style, ...props } = inputProps;

  const [value, setValue] = useState(props.value);

  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(1)).current;
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  const textInputRef = useRef<TextInput>(null);

  const focus = () => {
    Animated.timing(scale, {
      toValue: SCALE,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: -boxHeight / 2 - textHeight * SCALE,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateX, {
      toValue: -textWidth * SCALE * 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const blur = () => {
    if (value) {
      return;
    }

    Animated.timing(scale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateX, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const styles = style?.valueOf() as TextStyle | undefined;

  return (
    <View
      style={{
        marginBottom: styles?.marginBottom,
      }}
    >
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          padding: 15,
          zIndex: 1,
          justifyContent: "center",
        }}
        pointerEvents="none"
        onLayout={(e) => {
          const dim = e.nativeEvent.layout;
          setBoxHeight(dim.height);
          setBoxWidth(dim.width);
        }}
      >
        {props.placeholder && (
          <Animated.Text
            onLayout={(e) => {
              const dim = e.nativeEvent.layout;
              setTextWidth(dim.width);
              setTextHeight(dim.height);
            }}
            style={{
              transform: [
                {
                  scale,
                },
                {
                  translateY,
                },
                {
                  translateX,
                },
              ],
              alignSelf: "flex-start",
              backgroundColor: "white",
              justifyContent: "center",
              paddingHorizontal: 5,
            }}
          >
            {props.placeholder}
          </Animated.Text>
        )}
      </View>

      <TextInput
        {...props}
        style={[
          style,
          {
            padding: 15,
            margin: 0,
            marginBottom: 0,
            marginVertical: 0,
            marginTop: 0,
            borderWidth: 1,
          },
        ]}
        value={props.value ?? value}
        onChangeText={(t) => {
          props.onChangeText && props.onChangeText(t);
          setValue(t);
        }}
        onFocus={(e) => {
          focus();
          props.onFocus && props.onFocus(e);
        }}
        onBlur={(e) => {
          blur();
          props.onBlur && props.onBlur(e);
        }}
        placeholder=""
        ref={textInputRef}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({});
