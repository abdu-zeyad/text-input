// import PropTypes from 'prop-types';
// import React, { PureComponent } from 'react';
// import { Animated } from 'react-native';

// import styles from './styles';

// export default class Label extends PureComponent {

//     if (null == label) {
//       return null;
//     }

//     let color = disabled?
//       baseColor:
//       restricted?
//         errorColor:
//         focusAnimation.interpolate({
//           inputRange: [-1, 0, 1],
//           outputRange: [errorColor, baseColor, tintColor],
//         });

//     let textStyle = {
//       lineHeight: fontSize,
//       fontSize,
//       color,
//     };

//     let { x0, y0, x1, y1 } = offset;

//     y0 += activeFontSize;
//     y0 += contentInset.label;
//     y0 += fontSize * 0.25;

//     let containerStyle = {
//       transform: [{
//         scale: labelAnimation.interpolate({
//           inputRange: [0, 1],
//           outputRange: [1, activeFontSize / fontSize],
//         }),
//       }, {
//         translateY: labelAnimation.interpolate({
//           inputRange: [0, 1],
//           outputRange: [y0, y1],
//         }),
//       }, {
//         translateX: labelAnimation.interpolate({
//           inputRange: [0, 1],
//           outputRange: [x0, x1],
//         }),
//       }],
//     };

//     return (
//       <Animated.View style={[styles.container, containerStyle]}>
//         <Animated.Text style={[styles.text, style, textStyle]} {...props}>
//           {label}
//         </Animated.Text>
//       </Animated.View>
//     );
//   }
// }

import { View, Text, Animated, TextStyle, StyleSheet } from "react-native";
import React from "react";

interface ContentInset {
  label?: number;
}

interface Offset {
  x0?: number;
  y0?: number;
  x1?: number;
  y1?: number;
}

interface LabelProps {
  numberOfLines?: number;
  disabled?: boolean;
  restricted?: boolean;
  fontSize: number;
  activeFontSize: number;
  baseColor: string;
  tintColor: string;
  errorColor: string;
  focusAnimation: Animated.Value;
  labelAnimation: Animated.Value;
  contentInset?: ContentInset;
  offset?: Offset;
  style?: TextStyle;
  label?: string;
}
const Label = ({
  numberOfLines = 1,
  disabled = false,
  restricted = false,
  fontSize,
  activeFontSize,
  baseColor,
  tintColor,
  errorColor,
  focusAnimation,
  labelAnimation,
  contentInset,
  offset,
  style,
  label,
  ...props
}: LabelProps) => {
  if (null == label) {
    return null;
  }

  let color = disabled
    ? baseColor
    : restricted
    ? errorColor
    : focusAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [errorColor, baseColor, tintColor],
      });

  let textStyle = {
    lineHeight: fontSize,
    fontSize,
    color,
  };

  let { x0, y0, x1, y1 } = offset;

  // y0 += activeFontSize;
  // y0 += contentInset.label;
  // y0 += fontSize * 0.25;

  let containerStyle = {
    transform: [
      {
        scale: labelAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, activeFontSize / fontSize],
        }),
      },
      {
        translateY: labelAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [y0, y1],
        }),
      },
      {
        translateX: labelAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [x0, x1],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.Text style={[styles.text, style, textStyle]} {...props}>
        {label}
      </Animated.Text>
    </Animated.View>
  );
};

export default Label;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "200%",
    paddingLeft: "50%",
  },

  text: {
    textAlign: "left",
    includeFontPadding: false,
    textAlignVertical: "top",
  },
});
