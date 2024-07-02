import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface CounterProps {
  count: number;
  limit: number;

  baseColor: string;
  errorColor: string;

  style: TextStyle;
}

const Counter = ({
  count,
  limit,
  baseColor,
  errorColor,
  style,
}: CounterProps) => {
  if (!limit) {
    return null;
  }

  let textStyle = {
    color: count > limit ? errorColor : baseColor,
  };

  return (
    <Text style={[styles.text, style, textStyle]}>
      {count} / {limit}
    </Text>
  );
};
export default Counter;
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "right",
    backgroundColor: "transparent",
    paddingVertical: 2,
    marginLeft: 8,
  },
});
