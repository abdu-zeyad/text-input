import PropTypes from "prop-types";
import React, { PureComponent, useState } from "react";
import { Animated, StyleSheet, TextStyle } from "react-native";

interface HelperProps {
  title: string;
  error: string;

  disabled: boolean;

  style: TextStyle;

  baseColor: string;
  errorColor: string;

  focusAnimation: Animated.Value;
}

const Helper = ({
  title,
  error,
  disabled,
  style,
  baseColor,
  errorColor,
  focusAnimation,
}: HelperProps) => {
  let opacityInitial = focusAnimation.interpolate({
    inputRange: [-1, -0.5, 0],
    outputRange: [1, 0, 1],
    extrapolate: "clamp",
  });

  const [errored, setErrored] = useState(!!error);
  const [opacity, setOpacity] = useState(opacityInitial);

  // const onAnimation = ({ value }) => {
  //   if (animationValue > -0.5 && value <= -0.5) {
  //     this.setState({ errored: true });
  //   }

  //   if (this.animationValue < -0.5 && value >= -0.5) {
  //     this.setState({ errored: false });
  //   }

  //   this.animationValue = value;
  // };

  let text = errored ? error : title;

  if (null == text) {
    return null;
  }

  let textStyle = {
    opacity,

    color: !disabled && errored ? errorColor : baseColor,
  };
  return (
    <Animated.Text style={[styles.text, style, textStyle]}>
      {text}
    </Animated.Text>
  );
};

export default Helper;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    backgroundColor: "transparent",
    paddingVertical: 2,
    textAlign: "left",
  },
});
