import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "../../screens/Signup";
import SignIn from "../../screens/SignIn";
import Home from "../../screens/Home";
import { AuthContext } from "../../context/auth";
import { useContext } from "react";
import HeaderTabs from "./HeaderTabs";
import Account from "../../screens/Account";
import Links from "../../screens/Links";
import Post from "../../screens/Post";

const Stack = createNativeStackNavigator();
export default function ScreensNav() {
  const [state, setState] = useContext(AuthContext);

  const authenticated = state && state.token !== "" && state.user !== null;
  // console.log("authenticated ", authenticated);

  return (
    <Stack.Navigator
      initialRouteName="Signin"
      // screenOptions={{ headerShown: false }}
    >
      {authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Links Daily",
              headerRight: () => <HeaderTabs />,
            }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{ headerBackTitle: "" }}
          />
          <Stack.Screen
            name="Links"
            component={Links}
            options={{ headerBackTitle: "" }}
          />
          <Stack.Screen
            name="Post"
            component={Post}
            options={{ headerBackTitle: "" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signin"
            component={SignIn}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
