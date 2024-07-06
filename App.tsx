import { Animated, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef, useState } from "react";
import CustomTextInput from "./CustomTextInput";
// import { TextInput } from "react-native-paper";
// import TextInput from "./TextInput/TextInput";
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
      <CustomTextInput
        placeholder="test"
        style={{ marginBottom: 20, borderRadius: 5 }}
        value={value}
        onChangeText={setValue}
        secureTextEntry={shown}
        multiline
        right={() => {
          return (
            <Ionicons
              name={shown ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="black"
              onPress={() => {
                setShown(!shown);
              }}
            />
          );
        }}
      />
      <CustomTextInput />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
