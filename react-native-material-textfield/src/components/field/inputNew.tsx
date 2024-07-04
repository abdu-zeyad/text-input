import {
  View,
  Text,
  I18nManager,
  Animated,
  TextInput,
  Platform,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { TextInputProps, TextStyle, ViewStyle, StyleSheet } from "react-native";
import Line from "../line";
import Label from "../label";
import Affix from "../affix";
import Helper from "../helper";
import Counter from "../counter";

interface CustomTextInputProps extends TextInputProps {
  animationDuration?: number;
  fontSize?: number;
  labelFontSize?: number;
  contentInset?: {
    top?: number;
    label?: number;
    input?: number;
    left?: number;
    right?: number;
  };
  labelOffset?: {
    x0?: number;
    y0?: number;
    x1?: number;
    y1?: number;
  }; // Assuming Label.propTypes.offset has this shape
  labelTextStyle?: TextStyle;
  titleTextStyle?: TextStyle;
  affixTextStyle?: TextStyle;
  tintColor?: string;
  textColor?: string;
  baseColor?: string;
  label?: string;
  title?: string;
  characterRestriction?: number;
  error?: string;
  errorColor?: string;
  lineWidth?: number;
  activeLineWidth?: number;
  disabledLineWidth?: number;
  lineType?: "solid" | "dotted" | "dashed"; // Assuming these are the possible values for Line.propTypes.lineType
  disabledLineType?: "solid" | "dotted" | "dashed";
  disabled?: boolean;
  formatText?: (text: string) => string;
  renderLeftAccessory?: () => React.ReactNode;
  renderRightAccessory?: () => React.ReactNode;
  prefix?: string;
  suffix?: string;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
}

function startAnimation(
  animation: Animated.Value | Animated.ValueXY,
  options: Animated.TimingAnimationConfig,
  callback: () => void
) {
  Animated.timing(animation, options).start(callback);
}

function labelStateFromProps(
  props: {
    placeholder: string;
    defaultValue: string;
  },
  state: {
    text: string;
    receivedFocus: boolean;
  }
) {
  let { placeholder, defaultValue } = props;
  let { text, receivedFocus } = state;

  return !!(placeholder || text || (!receivedFocus && defaultValue));
}

function errorStateFromProps(
  props: {
    error: any;
  },
  state?: any
) {
  let { error } = props;

  return !!error;
}

const Field = ({
  underlineColorAndroid = "transparent",
  disableFullscreenUI = true,
  autoCapitalize = "sentences",
  editable = true,
  animationDuration = 225,
  fontSize = 16,
  labelFontSize = 12,
  tintColor = "rgb(0, 145, 234)",
  textColor = "rgba(0, 0, 0, .87)",
  baseColor = "rgba(0, 0, 0, .38)",
  errorColor = "rgb(213, 0, 0)",
  lineWidth = StyleSheet.hairlineWidth,
  activeLineWidth = 2,
  disabledLineWidth = 1,
  lineType = "solid",
  disabledLineType = "dotted",
  disabled = false,
  contentInset = { top: 0, label: 0, input: 0, left: 0, right: 0 },
  labelOffset = { x0: 0, y0: 0, x1: 0, y1: 0 },
  labelTextStyle,
  titleTextStyle,
  affixTextStyle,
  label,
  title,
  characterRestriction,
  error,
  formatText,
  renderLeftAccessory,
  renderRightAccessory,
  prefix,
  suffix,
  containerStyle,
  inputContainerStyle,
  ...props
}: CustomTextInputProps) => {
  inputContainerStyle = styles.inputContainer;

  contentInset = {
    top: 16,
    label: 4,
    input: 8,
    left: 0,
    right: 0,
  };

  labelOffset = {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 0,
  };

  const getDerivedStateFromProps = ({ error }, state) => {
    /* Keep last received error in state */
    if (error && error !== state.error) {
      return { error };
    }

    return null;
  };

  const inputRef = useRef<TextInput>(null);
  const [text, setText] = useState(props.value || "");
  const [focusAnimation] = useState(
    new Animated.Value(errorStateFromProps(props) ? -1 : 0)
  );
  const [labelAnimation] = useState(
    new Animated.Value(labelStateFromProps(props, { text }) ? 1 : 0)
  );
  const [receivedFocus, setReceivedFocus] = useState(false);
  const [height, setHeight] = useState(fontSize * 1.5);
  const [focused, setFocused] = useState(false);
  const [mounted, setMounted] = useState(false);

  const createGetter = (name: string) => {
    return () => {
      const value = props[name];
      const defaultValue = (Field as any)[name];

      return { ...defaultValue, ...value };
    };
  };

  const contentInsetGetter = createGetter("contentInset");
  const labelOffsetGetter = createGetter("labelOffset");

  const focusState = useCallback(() => {
    if (errorStateFromProps(props)) {
      return -1;
    }
    return focused ? 1 : 0;
  }, [props, focused]);

  const labelState = useCallback(() => {
    if (labelStateFromProps(props, { text })) {
      return 1;
    }
    return focused ? 1 : 0;
  }, [props, text, focused]);

  const onFocus = useCallback(
    (event: any) => {
      const { onFocus, clearTextOnFocus } = props;

      if (typeof onFocus === "function") {
        onFocus(event);
      }

      if (clearTextOnFocus) {
        clear();
      }

      setFocused(true);
      startFocusAnimation();
      startLabelAnimation();

      if (!receivedFocus) {
        setReceivedFocus(true);
        setText(value());
      }
    },
    [props, clearTextOnFocus, receivedFocus, setText, value]
  );

  const onBlur = useCallback(
    (event: any) => {
      const { onBlur } = props;

      if (typeof onBlur === "function") {
        onBlur(event);
      }

      setFocused(false);
      startFocusAnimation();
      startLabelAnimation();
    },
    [props]
  );

  const onChange = useCallback(
    (event: any) => {
      const { onChange } = props;

      if (typeof onChange === "function") {
        onChange(event);
      }
    },
    [props]
  );

  const onChangeText = useCallback(
    (text: string) => {
      const { onChangeText, formatText } = props;

      if (typeof formatText === "function") {
        text = formatText(text);
      }

      setText(text);

      if (typeof onChangeText === "function") {
        onChangeText(text);
      }
    },
    [props]
  );

  const onContentSizeChange = useCallback(
    (event: any) => {
      const { onContentSizeChange, fontSize } = props;
      const { height } = event.nativeEvent.contentSize;

      if (typeof onContentSizeChange === "function") {
        onContentSizeChange(event);
      }

      setHeight(
        Math.max(
          fontSize * 1.5,
          Math.ceil(height) + Platform.select({ ios: 4, android: 1 })
        )
      );
    },
    [props]
  );

  const onFocusAnimationEnd = useCallback(() => {
    const { error } = props;

    if (mounted && !error && text) {
      setText("");
    }
  }, [props, mounted, text]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    startFocusAnimation();
    startLabelAnimation();
  }, [focusState, labelState]);

  const startFocusAnimation = () => {
    startAnimation(
      focusAnimation,
      {
        toValue: focusState(),
        duration: animationDuration,
        useNativeDriver: false,
      },
      onFocusAnimationEnd
    );
  };

  const startLabelAnimation = () => {
    startAnimation(labelAnimation, {
      toValue: labelState(),
      useNativeDriver: true,
      duration: animationDuration,
    });
  };

  const setNativeProps = (props: any) => {
    const input = inputRef.current;
    if (input) {
      input.setNativeProps(props);
    }
  };

  const focus = useCallback(() => {
    if (!disabled && editable) {
      inputRef.current?.focus();
    }
  }, [disabled, editable]);

  const blur = () => {
    inputRef.current?.blur();
  };

  const clear = () => {
    const input = inputRef.current;

    input?.clear();
    onChangeText("");
  };

  const value = () => {
    if (isDefaultVisible()) {
      return props.defaultValue || "";
    }
    return text;
  };

  const setValue = (text: string) => {
    setText(text);
  };

  const isFocused = () => {
    return inputRef.current?.isFocused() || false;
  };

  const isRestricted = () => {
    const { characterRestriction: limit } = props;
    return limit && text.length > limit;
  };

  const isErrored = () => {
    return errorStateFromProps(props);
  };

  const isDefaultVisible = () => {
    const { defaultValue } = props;
    return !receivedFocus && !text && defaultValue;
  };

  const isPlaceholderVisible = () => {
    const { placeholder } = props;
    return placeholder && !focused && !value();
  };

  const isLabelActive = () => {
    return labelState() === 1;
  };

  const inputHeight = () => {
    const { multiline, height = height, fontSize } = props;
    return multiline ? height : fontSize * 1.5;
  };

  const inputContainerHeight = () => {
    const { labelFontSize, multiline } = props;
    const inset = contentInsetGetter();

    if (Platform.OS === "web" && multiline) {
      return "auto";
    }

    return (
      inset.top + labelFontSize + inset.label + inputHeight() + inset.input
    );
  };

  const inputProps = () => {
    let store: any = {};
    for (let key in TextInput.propTypes) {
      if (key !== "defaultValue" && key in props) {
        store[key] = props[key];
      }
    }
    return store;
  };

  const inputStyle = () => {
    const { disabled, textColor, baseColor, multiline, fontSize } = props;

    const color = disabled || isDefaultVisible() ? baseColor : textColor;

    let style: TextStyle = {
      fontSize,
      color,
      height: inputHeight(),
    };

    if (multiline) {
      const lineHeight = fontSize * 1.5;
      const offset = Platform.OS === "ios" ? 2 : 0;

      style.height! += lineHeight;
      style.transform = [{ translateY: lineHeight + offset }];
    }

    return style;
  };

  const renderLabel = () => {
    const offset = labelOffsetGetter();

    return (
      <Label
        fontSize={fontSize}
        activeFontSize={labelFontSize}
        offset={offset}
        label={label}
        style={labelTextStyle}
      />
    );
  };

  const renderLine = () => <Line />;

  const renderAccessory = (prop: string) => {
    const renderAccessory = props[prop];
    return typeof renderAccessory === "function" ? renderAccessory() : null;
  };

  const renderAffix = (type: string) => {
    const {
      [type]: affix,
      fontSize,
      baseColor: color,
      affixTextStyle: style,
    } = props;

    if (affix == null) {
      return null;
    }

    return (
      <Affix
        type={type}
        style={style}
        color={color}
        fontSize={fontSize}
        labelAnimation={labelAnimation}
      >
        {affix}
      </Affix>
    );
  };

  const renderHelper = () => {
    const { error, focusAnimation } = state;
    const {
      title,
      disabled,
      baseColor,
      errorColor,
      titleTextStyle: style,
      characterRestriction: limit,
    } = props;

    const { length: count } = value();
    const contentInset = contentInsetGetter();

    const containerStyle = {
      paddingLeft: contentInset.left,
      paddingRight: contentInset.right,
    };

    const styleProps = {
      style,
      baseColor,
      errorColor,
    };

    const counterProps = {
      ...styleProps,
      limit,
      count,
    };

    const helperProps = {
      ...styleProps,
      title,
      error,
      disabled,
      focusAnimation,
    };

    return (
      <View style={[styles.helperContainer, containerStyle]}>
        <Helper {...helperProps} />
        <Counter {...counterProps} />
      </View>
    );
  };

  const renderInput = () => {
    const { disabled, editable, tintColor, style: inputStyleOverrides } = props;

    const inputPropsData = inputProps();
    const inputStyleData = inputStyle();

    return (
      <TextInput
        selectionColor={tintColor}
        {...inputPropsData}
        style={[styles.input, inputStyleData, inputStyleOverrides]}
        editable={!disabled && editable}
        onChange={onChange}
        onChangeText={onChangeText}
        onContentSizeChange={onContentSizeChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value()}
        ref={inputRef}
      />
    );
  };

  return (
    <View>
      <Text>Field</Text>
    </View>
  );
};

export default Field;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  input: {
    top: 2,
    padding: 0,
    paddingTop: 0 /* XXX: iOS has paddingTop set for multiline input */,
    margin: 0,
    flex: 1,

    textAlign: I18nManager.isRTL ? "right" : "left",

    includeFontPadding: false,
    textAlignVertical: "top",
  },

  helperContainer: {
    minHeight: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },

  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },

  stack: {
    flex: 1,
    alignSelf: "stretch",
  },

  flex: {
    flex: 1,
  },
});
