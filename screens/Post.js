import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import FooterTabs from "../components/nav/FooterTabs";

const Post = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
};

export default Post;

const styles = StyleSheet.create({});
