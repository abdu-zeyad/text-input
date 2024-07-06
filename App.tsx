import { Animated, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import CustomTextInput from "./CustomTextInput";
// import { TextInput } from "react-native-paper";
// import TextInput from "./TextInput/TextInput";

const App = () => {
  const [value, setValue] = useState("");

  return (
    <View
      style={{
        padding: 100,
      }}
    >
      <CustomTextInput
        placeholder="test"
        style={{ marginBottom: 20, borderRadius: 5 }}
        value={value}
        onChangeText={setValue}
      />
      <CustomTextInput />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
