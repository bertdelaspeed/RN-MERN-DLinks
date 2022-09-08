import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);

  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    console.log("attempt : " + name + " " + email + " " + password);
    try {
      console.log("before post request " + name + " " + email + " " + password);
      const { data } = await axios.post(`/signup`, {
        name,
        email,
        password,
      });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        // save in context
        setState(data);
        // save response in async storage
        await AsyncStorage.setItem("@auth", JSON.stringify(data));
        console.log("sign in success", data);
        setLoading(false);
        navigation.navigate("Home");
      }
    } catch (error) {
      alert("Sign up failed");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.containerStyle}>
      <View>
        <CircleLogo />
        <Text style={styles.title}>Sign up</Text>
        <UserInput
          name="Name"
          value={name}
          setValue={setName}
          autoCapitalize="words"
        />
        <UserInput
          name="Email"
          value={email}
          setValue={setEmail}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <UserInput
          name="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
          autoCompleteType="password"
        />
        <SubmitButton
          title="Sign up !"
          handleSubmit={handleSubmit}
          loading={Loading}
        />
        <Text style={{ textAlign: "center" }}>
          Already Joined ?{" "}
          <Text
            onPress={() => navigation.navigate("Signin")}
            style={{ color: "#ff2222", fontWeight: "500" }}
          >
            Sign in
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    // marginTop: 50,
    marginBottom: 30,
  },
});
