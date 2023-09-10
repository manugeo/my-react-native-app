import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import theme from './src/theme';

const Stack = createNativeStackNavigator();
const { colors } = theme;

export default function App() {
  const screenOptions = {
    headerTitleAlign: 'center',
    headerTintColor: colors.textPrimary,
    headerStyle: { backgroundColor: colors.backgroundPrimary }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignUp' screenOptions={screenOptions}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} options={{ title: 'Sign Up' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
