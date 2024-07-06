import { Animated, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import CustomTextInput from "./CustomTextInput";
import TextInput from "./TextInput/TextInput";
import Ionicons from "@expo/vector-icons/Ionicons";

const App = () => {
  const [value, setValue] = useState("");
  const [shown, setShown] = useState(true);
  return (
    <View
      style={{
        padding: 100,
      }}
    >
      <TextInput
        // placeholder="test"
        style={{ marginBottom: 20, borderRadius: 5 }}
        value={value}
        onChangeText={setValue}
        secureTextEntry={shown}
        multiline
        label={"test"}
      />
      <TextInput
        // placeholder="test"
        style={{ marginBottom: 20, borderRadius: 5 }}
        value={value}
        onChangeText={setValue}
        secureTextEntry={shown}
        multiline
        label={"test"}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
