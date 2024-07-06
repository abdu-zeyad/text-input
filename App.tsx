import { Animated, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef } from "react";
import CustomTextInput from "./CustomTextInput";
// import { TextInput } from "react-native-paper";
// import TextInput from "./TextInput/TextInput";

const App = () => {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <View
      style={{
        padding: 100,
      }}
    >
      <CustomTextInput
        placeholder="test"
        style={{ marginBottom: 20, borderRadius: 5 }}
        value="sadas"
      />
      <CustomTextInput />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
