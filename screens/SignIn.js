import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);

  const [state, setState] = useContext(AuthContext);
  // if (state) {
  //   navigation.navigate("Home");
  // }

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    console.log("attempt : " + email + " " + password);
    try {
      const { data } = await axios.post(`/Signin`, {
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
      alert("Sign in failed");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.containerStyle}>
      <View>
        <CircleLogo />
        <Text style={styles.title}>Sign In</Text>

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
          title="Sign In !"
          handleSubmit={handleSubmit}
          loading={Loading}
        />
        <Text style={{ textAlign: "center" }}>
          New here !?{" "}
          <Text
            onPress={() => navigation.navigate("Signup")}
            style={{ color: "#ff2222", fontWeight: "500" }}
          >
            Sign up
          </Text>
        </Text>
        <Text
          style={{
            color: "orange",
            fontWeight: "300",
            textAlign: "center",
            marginTop: 15,
          }}
        >
          Forgot password?
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;

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
