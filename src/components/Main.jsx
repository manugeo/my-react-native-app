import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { defaultScreenOptions } from "../theme";
import Login from "./Login";
import SignUp from "./SignUp";
import useAuthUser from "../hooks/useAuthUser";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Home from "./Home";

const Stack = createNativeStackNavigator();

const Main = () => {
  const { currentUser, setCurrentUser, loading } = useAuthUser();

  return loading
    ? null
    : (
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={currentUser ? 'Home' : 'Login'} screenOptions={defaultScreenOptions}>
            {currentUser
              ? <>
                <Stack.Screen name='Home' component={Home} />
              </>
              : <>
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='SignUp' component={SignUp} options={{ title: 'Sign Up' }} />
              </>}
          </Stack.Navigator>
        </NavigationContainer>
      </CurrentUserContext.Provider>
    );
};

export default Main;