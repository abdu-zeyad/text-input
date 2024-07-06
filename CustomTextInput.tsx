import {
  Animated,
  LayoutRectangle,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useRef, useState } from "react";

const CustomTextInput = () => {
  const scale = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(1)).current;
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  console.log(textHeight);

  const SCALE = 0.7;

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
      toValue: -textWidth * SCALE,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const blur = () => {
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

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "red",
        marginBottom: 20,
      }}
    >
      <View
        style={{
          borderWidth: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          padding: 15,
          zIndex: 1,
        }}
        pointerEvents="none"
        onLayout={(e) => {
          const dim = e.nativeEvent.layout;
          setBoxHeight(dim.height);
          setBoxWidth(dim.width);
        }}
      >
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
            //borderWidth: 1,
            backgroundColor: "white",
            paddingHorizontal: 5,
          }}
        >
          tst
        </Animated.Text>
      </View>

      <TextInput
        style={{
          borderWidth: 1,
          padding: 15,
        }}
        onFocus={(e) => {
          focus();
        }}
        onBlur={(e) => {
          blur();
        }}
      />
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({});
