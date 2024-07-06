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
import React, { ReactElement, useEffect, useRef, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

interface CustomTextInputProps extends TextInputProps {
  right?: () => React.JSX.Element;
}
const SCALE = 0.7;

const CustomTextInput = (inputProps: CustomTextInputProps) => {
  const { style, ...props } = inputProps;
  const styles = style?.valueOf() as TextStyle | undefined;

  const [value, setValue] = useState(props.value);
  const textInputRef = useRef<TextInput>(null);

  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(1)).current;
  const [boxHeight, setBoxHeight] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  const [isActive, setIsActive] = useState(false);

  // console.log(textWidth, textHeight, "text");
  // console.log(boxHeight, "box");

  const focus = (duration = 200) => {
    if (boxHeight && textHeight) {
      // Ensure dimensions are set before performing the animation
      Animated.timing(scale, {
        toValue: SCALE,
        duration,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateY, {
        toValue: -(boxHeight / 2 + textHeight * SCALE),
        duration,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateX, {
        toValue: -(textWidth * (1 - SCALE) * SCALE),
        duration,
        useNativeDriver: true,
      }).start();
      setIsActive(true);
    }
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
    setIsActive(false);
  };

  useEffect(() => {
    // Use a timeout to ensure that dimensions are fully set before focusing
    if (value) {
      setTimeout(() => {
        focus(0);
      }, 0.1); // Adjust the delay if necessary
    }
  }, [boxHeight, textHeight]); // Adding boxHeight and textHeight as dependencies

  return (
    <View
      style={{
        marginBottom: styles?.marginBottom,
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        borderColor: isActive ? "blue" : "black",
      }}
    >
      {/* fot the text input */}
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            padding: 10,
            zIndex: 1,
            justifyContent: "center",
            //backgroundColor: "blue",
          }}
          pointerEvents="none"
          onLayout={(e) => {
            const dim = e.nativeEvent.layout;
            setBoxHeight(dim.height);
          }}
        >
          {props.placeholder && (
            <Animated.View
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
                // color: isActive ? "blue" : "black",
              }}
            >
              <Text>{props.placeholder}</Text>
            </Animated.View>
          )}
        </View>

        <TextInput
          {...props}
          style={[
            style,
            {
              padding: 10,
              margin: 0,
              marginBottom: 0,
              marginVertical: 0,
              marginTop: 0,
              // borderWidth: 1,
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

      <View style={{ paddingHorizontal: 5 }}>
        {props.right && props.right()}
      </View>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({});
