import { StatusBar } from "expo-status-bar";
import { createRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TextInput from "./OutlinedTextInput";

export default function App() {
  // const fieldRef = createRef();

  // const onSubmit = () => {
  //   let { current: field } = fieldRef;

  //   console.log(field.value());
  // };

  // const formatText = (text: string) => {
  //   return text.replace(/[^+\d]/g, "");
  // };
  const [value, setValue] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={
          {
            // borderWidth: 1,
          }
        }
      />
      <TextInput
        style={{
          // borderWidth: 1,
          fontSize: 30,
        }}
        placeholder="test"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 100,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
