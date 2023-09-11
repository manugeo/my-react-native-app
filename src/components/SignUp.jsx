import { ScrollView, StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import { useState } from "react";
import InputText from "./InputText";
import InputButton from "./InputButton";
import { isValidEmail, showToast } from "../utils";
import useUserService from "../hooks/useUserService";

const { colors, texts } = theme;

const SIGN_UP_INPUTS = [
  { id: 'fullName', label: 'Full Name', placeholder: 'John Doe', isPassword: false },
  { id: 'email', label: 'Email', placeholder: 'example@email.com', isPassword: false },
  { id: 'password', label: 'Password', placeholder: 'Atleast 8 characters', isPassword: true },
  { id: 'confirmPassword', label: 'Confirm Password', placeholder: 'Re-enter your password', isPassword: true },
];

const initialValue = {
  fullName: { value: '', isTouched: false, errorText: 'Full Name is required.' },
  email: { value: '', isTouched: false, errorText: 'Email is required.' },
  password: { value: '', isTouched: false, errorText: 'Password is required.' },
  confirmPassword: { value: '', isTouched: false, errorText: 'Confirm Password is required.' }
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

const SignUp = ({ navigation }) => {
  const [signUpInputs, setSignUpInputs] = useState(initialValue);
  const [isTriedSubmitting, setIsTriedSubmitting] = useState(false);
  const { loading, setCurrentUser, createUser } = useUserService();

  const isUserDetailsValid = () => {
    const fullName = signUpInputs.fullName.value;
    const email = signUpInputs.email.value;
    const password = signUpInputs.password.value;
    const confirmPassword = signUpInputs.confirmPassword.value;
    if (!fullName || !email || !password || !confirmPassword) return false;
    if (!isValidEmail(email)) return false;
    if (password.length < 8) return false;
    if (password !== confirmPassword) return false;
    return true;
  };

  // Note: Accepts an inputs object. Updates the error-texts for the same. 
  const updateInputErrorTexts = (inputs) => {
    for (const { id, label } of SIGN_UP_INPUTS) {
      const input = inputs[id];
      const inputValue = input.value;
      const passwordValue = inputs['password'].value;
      let errorText = '';
      if (!inputValue) {
        errorText = `${label} is required.`;
      }
      else {
        switch (id) {
          case 'email':
            if (!isValidEmail(inputValue)) errorText = `Invalid email.`;
            break;
          case 'password':
            if (inputValue.length < 8) errorText = `Password should be atleast 8 characters long.`;
            break;
          case 'confirmPassword':
            if (inputValue !== passwordValue) errorText = 'Passwords do not match.';
            break;
        }
      }
      input.errorText = errorText;
    }
  };

  const onInputChange = (id, value) => {
    const newInputs = { ...signUpInputs, [id]: { ...signUpInputs[id], value: value } };
    updateInputErrorTexts(newInputs);
    setSignUpInputs(newInputs);
  };
  const onInputBlur = (id) => setSignUpInputs({ ...signUpInputs, [id]: { ...signUpInputs[id], isTouched: true } });
  const onSignUpPress = async () => {
    if (!isTriedSubmitting) setIsTriedSubmitting(true);
    if (!isUserDetailsValid()) return;
    const fullName = signUpInputs.fullName.value.trim();
    const email = signUpInputs.email.value.trim();
    const password = signUpInputs.password.value;
    const response = await createUser({ fullName, email, password });
    if (!response || response.error) {
      showToast(response.error)
      return;
    }
    const newUser = response.user;
    setCurrentUser(newUser);
    showToast('Signed up successfully.');
    setSignUpInputs(initialValue);
    setIsTriedSubmitting(false);
  };

  const onLoginHelperTextPress = () => navigation.navigate('Login')

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} >
      <View style={styles.container}>
        {SIGN_UP_INPUTS.map(({ id, label, placeholder, isPassword }) => {
          const { value, isTouched, errorText } = signUpInputs[id];
          return (
            <InputText key={id} value={value} label={label} secureTextEntry={isPassword} placeholder={placeholder}
              errorText={(isTouched || isTriedSubmitting) ? errorText : ''} onChange={(v) => onInputChange(id, v)} onBlur={() => onInputBlur(id)} />
          );
        }
        )}

        <InputButton title="Sign Up" style={{ marginTop: 12 }} disabled={loading} onPress={onSignUpPress} />

        <View style={styles.helperTextContainer}>
          <Text style={styles.helperText}>{"Already have an account?"}</Text>
          <InputButton title="Login" type="compact" onPress={onLoginHelperTextPress} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;