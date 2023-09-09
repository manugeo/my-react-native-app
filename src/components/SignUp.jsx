import { Button, StyleSheet, Text, View } from "react-native";

const SignUp = ({ navigation }) => {
  const styles = StyleSheet.create({
    container: { }
  });

  return (
    <View style={styles.container}>
      <Text>Sign Up Page!</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignUp;