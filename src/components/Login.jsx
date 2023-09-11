import { ScrollView, StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import { useState } from "react";
import InputText from "./InputText";
import InputButton from "./InputButton";
import useUserService from "../hooks/useUserService";
import { showToast } from "../utils";

const { colors, texts } = theme;

const LOGIN_INPUTS = [
  { id: 'email', label: 'Email', placeholder: '', isPassword: false },
  { id: 'password', label: 'Password', placeholder: '', isPassword: true }
];

const initialValue = {
  email: { value: '', isTouched: false, errorText: 'Email is required.' },
  password: { value: '', isTouched: false, errorText: 'Password is required.' }
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: colors.backgroundPrimary
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  helperTextContainer: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: "flex-end",
    alignItems: 'center'
  },
  helperText: { ...texts.small, color: colors.textPrimary }
});

const Login = ({ navigation }) => {
  const [loginInputs, setLoginInputs] = useState(initialValue);
  const [isTriedSubmitting, setIsTriedSubmitting] = useState(false);
  const { loading, setCurrentUser, login } = useUserService();

  const isUserDetailsValid = () => {
    const email = loginInputs.email.value;
    const password = loginInputs.password.value;
    if (!email || !password) return false;
    return true;
  };

  // Note: Accepts an inputs object. Updates the error-texts for the same. 
  const updateInputErrorTexts = (inputs) => {
    for (const { id, label } of LOGIN_INPUTS) {
      const input = inputs[id];
      const inputValue = input.value;
      input.errorText = (!inputValue) ? `${label} is required.` : '';
    }
  };

  const onInputChange = (id, value) => {
    const newInputs = { ...loginInputs, [id]: { ...loginInputs[id], value: value } };
    updateInputErrorTexts(newInputs);
    setLoginInputs(newInputs);
  };
  const onInputBlur = (id) => setLoginInputs({ ...loginInputs, [id]: { ...loginInputs[id], isTouched: true } });
  const onLoginPress = async () => {
    if (!isTriedSubmitting) setIsTriedSubmitting(true);
    if (!isUserDetailsValid()) return;
    const email = loginInputs.email.value.trim();
    const password = loginInputs.password.value;

    const response = await login({ email, password });
    if (!response || response.error) {
      showToast(response.error)
      return;
    }
    const existingUser = response.user;
    setCurrentUser(existingUser);
    showToast('Logged in successfully.');
    setLoginInputs(initialValue);
    setIsTriedSubmitting(false);
  };
  const onSignUpHelperTextPress = () => navigation.navigate('SignUp');

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} >
      <View style={styles.container}>
        {LOGIN_INPUTS.map(({ id, label, placeholder, isPassword }) => {
          const { value, isTouched, errorText } = loginInputs[id];
          return (
            <InputText key={id} value={value} label={label} secureTextEntry={isPassword} placeholder={placeholder}
              errorText={(isTouched || isTriedSubmitting) ? errorText : ''} onChange={(v) => onInputChange(id, v)} onBlur={() => onInputBlur(id)} />
          );
        }
        )}

        <InputButton title="Login" style={{ marginTop: 12 }} disabled={loading} onPress={onLoginPress} />

        <View style={styles.helperTextContainer}>
          <Text style={styles.helperText}>{"Don't have an account?"}</Text>
          <InputButton title="Sign up" type="compact" style={{ marginLeft: 4 }} onPress={onSignUpHelperTextPress} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;