import {
  View,
  Text,
  TextProps,
  Animated,
  StyleSheet,
  ViewProps,
  TextStyle,
  ViewStyle,
} from "react-native";
import React from "react";
import { type PropsWithChildren } from "react";

interface AffixProps {
  numberOfLines: number;
  style: TextStyle;
  color: string;
  fontSize: number;
  type: "prefix" | "suffix";
  labelAnimation: Animated.Value;
}

const Affix = ({
  numberOfLines = 1,
  style,
  color,
  fontSize,
  children,
  type,
  labelAnimation,
}: PropsWithChildren<AffixProps>) => {
  let containerStyle: ViewStyle = {
    height: fontSize * 1.5,
    opacity: labelAnimation,
  };

  let textStyle: TextStyle = {
    includeFontPadding: false,
    textAlignVertical: "top",

    fontSize,
    color,
  };

  switch (type) {
    case "prefix":
      containerStyle.paddingRight = 8;
      textStyle.textAlign = "left";
      break;

    case "suffix":
      containerStyle.paddingLeft = 8;
      textStyle.textAlign = "right";
      break;
  }

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.Text style={[style, textStyle]}>{children}</Animated.Text>
    </Animated.View>
  );
};

export default Affix;
const styles = StyleSheet.create({
  container: {
    top: 2,
    justifyContent: "center",
  },
});
