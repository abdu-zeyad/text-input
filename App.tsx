import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextInput from "./TextInput/TextInput";

const App = () => {
  return (
    <View
      style={{
        padding: 100,
      }}
    >
      <TextInput label={"testtt"} />
      <TextInput label={"gggg"} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
