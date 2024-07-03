import { View, Text, Animated, StyleSheet, Platform } from "react-native";
import React, { useState } from "react";

type LineTypes = "solid" | "dashed" | "dotted";

interface LineProps {
  lineType: LineTypes;
  disabledLineType: LineTypes;

  disabled?: boolean;
  restricted?: boolean;

  tintColor?: string;
  baseColor?: string;
  errorColor?: string;

  lineWidth?: number;
  activeLineWidth?: number;
  disabledLineWidth?: number;

  focusAnimation: Animated.Value;
}

const Line = ({
  lineType = "solid",
  disabledLineType = "dotted",
  disabled = false,
  restricted = false,
  tintColor,
  baseColor,
  errorColor,
  lineWidth = 1,
  activeLineWidth = 1,
  disabledLineWidth = 1,
  focusAnimation,
  ...props
}: LineProps) => {
  let borderStyle = disabled ? disabledLineType : lineType;

  let initialMaxLineWidth = Math.max(
    lineWidth,
    activeLineWidth,
    disabledLineWidth,
    1
  );
  const getDerivedStateFromProps = (props, state) => {
    let { lineWidth, activeLineWidth, disabledLineWidth } = props;

    let maxLineWidth = Math.max(
      lineWidth,
      activeLineWidth,
      disabledLineWidth,
      1
    );

    if (maxLineWidth !== state.maxLineWidth) {
      return { maxLineWidth };
    }

    return null;
  };

  const [maxLineWidth, setMaxLineWidth] = useState(1);
  if ("none" === borderStyle) {
    return null;
  }

  let [top, right, left] = Array.from(new Array(3), () => -1.5 * maxLineWidth);

  let lineStyle = {
    //...this.borderProps(),

    borderStyle,
    top,
    right,
    left,
  };

  if (disabled) {
    return {
      borderColor: baseColor,
      borderWidth: disabledLineWidth,
    };
  }

  if (restricted) {
    return {
      borderColor: errorColor,
      borderWidth: activeLineWidth,
    };
  }

  // return {
  //   borderColor: focusAnimation.interpolate({
  //     inputRange: [-1, 0, 1],
  //     outputRange: [errorColor, baseColor, tintColor],
  //   }),

  //   borderWidth: focusAnimation.interpolate({
  //     inputRange: [-1, 0, 1],
  //     outputRange: [activeLineWidth, lineWidth, activeLineWidth],
  //   }),
  // };

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View style={[styles.line, lineStyle]} />
    </View>
  );
};

export default Line;

const styles = StyleSheet.create({
  line: {
    position: "absolute",
    bottom: 0,

    ...Platform.select({
      android: { borderRadius: Number.EPSILON },
    }),
  },

  container: {
    ...StyleSheet.absoluteFillObject,

    overflow: "hidden",
  },
});
