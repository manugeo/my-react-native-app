import { ScrollView, StyleSheet, View } from "react-native";
import theme from "../theme";
import { useState } from "react";
import InputText from "./InputText";
import InputButton from "./InputButton";

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: theme.colors.backgroundPrimary
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  }
});

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSignUpPress = () => {
    console.log("Button pressed!");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} >
      <View style={styles.container}>
        <InputText value={fullName} label="Full Name" onChange={setFullName} />
        <InputText value={email} label="Email" keyboardType="email-address" style={{ marginTop: 20 }} onChange={setEmail} />
        <InputText value={password} label="Password" secureTextEntry style={{ marginTop: 20 }} onChange={setPassword} />
        <InputText value={confirmPassword} label="Confirm Password" secureTextEntry style={{ marginTop: 20 }} onChange={setConfirmPassword} />
        <InputButton title="Sign Up" style={{ marginTop: 60 }} onPress={onSignUpPress} />
      </View>
    </ScrollView>
  );
};

export default SignUp;