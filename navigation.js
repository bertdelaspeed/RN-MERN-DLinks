import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ScreensNav from "./components/nav/ScreensNav";
import { AuthProvider } from "./context/auth";

export default function RootNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AuthProvider>
        <ScreensNav />
      </AuthProvider>
    </NavigationContainer>
  );
}
