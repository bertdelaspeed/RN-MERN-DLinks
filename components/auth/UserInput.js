import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const UserInput = ({
  name,
  value,
  setValue,

  autoCapitalize = "none",
  secureTextEntry = false,
  keyboardType = "default",
}) => {
  return (
    <View style={{ marginHorizontal: 30 }}>
      <Text>{name}</Text>
      <TextInput
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={styles.textinput}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

export default UserInput;

const styles = StyleSheet.create({
  textinput: {
    borderBottomWidth: 0.5,
    height: 24,
    borderBottomColor: "#2D2E31",
    marginBottom: 30,
  },
});
