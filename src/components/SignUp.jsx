import { ScrollView, StyleSheet, View } from "react-native";
import theme from "../theme";
import { useState } from "react";
import InputText from "./InputText";
import InputButton from "./InputButton";
import { isValidEmail, showToast } from "../utils";
import useUserService from "../hooks/useUserService";

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
  const [isTriedSubmitting, setIsTriedSubmitting] = useState(false);
  const { createUser, loading } = useUserService();

  const isUserDetailsValid = () => {
    console.log({ fullName, email, password, confirmPassword });

    if (!fullName || !email || !password || !confirmPassword) return false;
    if (!isValidEmail(email)) return false;
    if (password.length < 8) return false;
    if (password !== confirmPassword) return false;
    return true;
  };
  const resetPage = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsTriedSubmitting(false);
  };

  const onSignUpPress = async () => {
    if (!isTriedSubmitting) setIsTriedSubmitting(true);
    if (!isUserDetailsValid()) return;
    const response = await createUser({ fullName, email, password });
    if (!response || response.error) {
      showToast(response.error)
      return;
    }
    showToast('Signed up successfully.');
    resetPage();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} >
      <View style={styles.container}>
        <InputText value={fullName} label="Full Name" onChange={setFullName} />
        <InputText value={email} label="Email" keyboardType="email-address" style={{ marginTop: 20 }} onChange={setEmail} />
        <InputText value={password} label="Password" secureTextEntry style={{ marginTop: 20 }} onChange={setPassword} />
        <InputText value={confirmPassword} label="Confirm Password" secureTextEntry style={{ marginTop: 20 }} onChange={setConfirmPassword} />
        <InputButton title="Sign Up" style={{ marginTop: 60 }} disabled={loading} onPress={onSignUpPress} />
      </View>
    </ScrollView>
  );
};

export default SignUp;