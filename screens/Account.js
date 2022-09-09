import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import axios from "axios";
import CircleLogo from "../components/auth/CircleLogo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/auth";
import { useEffect } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";

const Account = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [Loading, setLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState("");
  const [image, setImage] = useState({
    // url: "https://cdn.pixabay.com/photo/2021/02/25/14/12/rinnegan-6049194_960_720.png",
    public_id: "",
  });

  const [state, setState] = useContext(AuthContext);

  useEffect(() => {
    if (state) {
      const { name, email, image, role } = state.user;
      setName(name);
      setEmail(email);
      setRole(role);
      setImage(image);
    }
  }, []);

  const handleSubmit = async () => {
    console.log("password before sending : ", password);
    setLoading(true);
    //api request
    try {
      const { data } = await axios.post("/update-password", { password });
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        alert("Password updated 👍");
        setPassword("");
        setLoading(false);
      }
    } catch (error) {
      alert("Password update failed");
      console.log(error);
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    // console.log(permissionResult);
    if (permissionResult.granted === false) {
      alert("Camera access required");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });
    if (pickerResult.cancelled === true) {
      return;
    }

    // save to state for preview
    let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
    setUploadImage(base64Image);

    // save to backend for upload to cloudinary
    const { data } = await axios.post("/upload-image", { image: base64Image });
    console.log("uploaded response", data);

    // update async storage
    const as = JSON.parse(await AsyncStorage.getItem("@auth"));
    as.user = data;
    await AsyncStorage.setItem("@auth", JSON.stringify(as));

    //update context
    setState({ ...state, user: data });
    setImage(data.image);
    alert("👍 Image saved 🌩️");
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.containerStyle}>
      <View style={{ marginVertical: 50 }}>
        <TouchableOpacity onPress={handleUpload}>
          <CircleLogo>
            {image && image.url ? (
              <Image
                source={{ uri: image.url }}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              />
            ) : uploadImage ? (
              <Image
                source={{ uri: uploadImage }}
                style={{
                  height: 130,
                  width: 130,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 20,
                }}
              />
            ) : (
              <FontAwesome5 name="camera" size={50} color="orange" />
            )}
          </CircleLogo>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUpload}>
          {image && image.url ? (
            <FontAwesome5
              name="camera"
              size={20}
              color="black"
              style={{ marginTop: -65, marginLeft: 210, marginBottom: 30 }}
            />
          ) : (
            <></>
          )}
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.roles}>{role}</Text>
        <View>
          <UserInput
            name="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            autoCompleteType="password"
          />
          <SubmitButton
            title="Update Password "
            handleSubmit={handleSubmit}
            loading={Loading}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Account;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    // marginTop: 50,
    marginBottom: 10,
  },
  email: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 3,
  },
  roles: {
    fontWeight: "300",
    textAlign: "center",
    marginBottom: 50,
  },
});
