import { StatusBar } from "expo-status-bar";
import { createRef } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  // const fieldRef = createRef();

  // const onSubmit = () => {
  //   let { current: field } = fieldRef;

  //   console.log(field.value());
  // };

  // const formatText = (text: string) => {
  //   return text.replace(/[^+\d]/g, "");
  // };
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
