import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextInput from "./TextInput/TextInput";
import { configureFonts } from "react-native-paper";

const App = () => {
  return (
    <View
      style={{
        padding: 100,
      }}
    >
      <TextInput label={"testtt"} mode="outlined" multiline />
      <TextInput label={"gggg"} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
