import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const CircleLogo = ({ children }) => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          height: 100,
          width: 100,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {children ? (
          children
        ) : (
          <Image
            source={require("../../assets/logo-signin.png")}
            style={{ width: 200, height: 200, marginVertical: 50 }}
          />
        )}
      </View>
    </View>
  );
};

export default CircleLogo;

const styles = StyleSheet.create({});
