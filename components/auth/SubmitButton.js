import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const SubmitButton = ({ title, handleSubmit, loading }) => {
  return (
    <TouchableOpacity
      onPress={handleSubmit}
      style={{
        backgroundColor: "#ff9900",
        height: 45,
        marginBottom: 20,
        justifyContent: "center",
        marginHorizontal: 15,
        borderRadius: 24,
      }}
    >
      <Text style={{ fontWeight: "500", textAlign: "center" }}>
        {loading ? "Please wait ..." : title}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;
