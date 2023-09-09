import { Button, StyleSheet, Text, View } from "react-native";

const Login = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center'
    }
  });

  return (
    <View style={styles.container}>
      <Text>Login Page!</Text>
      <Button title="Go to Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

export default Login;