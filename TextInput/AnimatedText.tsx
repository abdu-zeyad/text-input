import * as React from "react";
import { Animated, I18nManager, StyleSheet, TextStyle } from "react-native";

type Props<T> = React.ComponentPropsWithRef<typeof Animated.Text> & {
  /**
   * Variant defines appropriate text styles for type role and its size.
   * Available variants:
   *
   *  Display: `displayLarge`, `displayMedium`, `displaySmall`
   *
   *  Headline: `headlineLarge`, `headlineMedium`, `headlineSmall`
   *
   *  Title: `titleLarge`, `titleMedium`, `titleSmall`
   *
   *  Label:  `labelLarge`, `labelMedium`, `labelSmall`
   *
   *  Body: `bodyLarge`, `bodyMedium`, `bodySmall`
   */
  style?: TextStyle;
  /**
   * @optional
   */
};

/**
 * Animated text component which follows styles from the theme.
 *
 * @extends Text props https://reactnative.dev/docs/text#props
 */
function AnimatedText({
  style,

  ...rest
}: Props<never>) {
  const writingDirection = I18nManager.getConstants().isRTL ? "rtl" : "ltr";

  const font = "regular";
  const textStyle = {
    font,
    color: "red",
  };
  return (
    <Animated.Text
      {...rest}
      style={[
        styles.text,
        textStyle,
        {
          writingDirection,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
  },
});

export const customAnimatedText = <T,>() =>
  AnimatedText as (props: Props<T>) => JSX.Element;

export default AnimatedText;
