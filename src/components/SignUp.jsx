import { ScrollView, StyleSheet, View } from "react-native";
import theme from "../theme";
import { useState } from "react";
import InputText from "./InputText";
import InputButton from "./InputButton";
import { isValidEmail, showToast } from "../utils";
import useUserService from "../hooks/useUserService";

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
    backgroundColor: theme.colors.backgroundPrimary
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  }
});

const SignUp = () => {
  const [inputDetails, setInputDetails] = useState(initialValue);
  const [isTriedSubmitting, setIsTriedSubmitting] = useState(false);
  const { loading, setCurrentUser, createUser } = useUserService();

  const isUserDetailsValid = () => {
    const fullName = inputDetails.fullName.value;
    const email = inputDetails.email.value;
    const password = inputDetails.password.value;
    const confirmPassword = inputDetails.confirmPassword.value;
    if (!fullName || !email || !password || !confirmPassword) return false;
    if (!isValidEmail(email)) return false;
    if (password.length < 8) return false;
    if (password !== confirmPassword) return false;
    return true;
  };

  // Note: Accepts an input details object. Updates the error-texts for the same. 
  const updateInputErrorTexts = (inputDetails) => {
    for (const { id, label } of SIGN_UP_INPUTS) {
      const input = inputDetails[id];
      const inputValue = input.value;
      const passwordValue = inputDetails['password'].value;
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
    const newInputDetails = { ...inputDetails, [id]: { ...inputDetails[id], value: value } };
    updateInputErrorTexts(newInputDetails);
    setInputDetails(newInputDetails);
  };
  const onInputBlur = (id) => setInputDetails({ ...inputDetails, [id]: { ...inputDetails[id], isTouched: true } });
  const onSignUpPress = async () => {
    if (!isTriedSubmitting) setIsTriedSubmitting(true);
    if (!isUserDetailsValid()) return;
    const fullName = inputDetails.fullName.value.trim();
    const email = inputDetails.email.value.trim();
    const password = inputDetails.password.value;
    const response = await createUser({ fullName, email, password });
    if (!response || response.error) {
      showToast(response.error)
      return;
    }
    const newUser = response.user;
    setCurrentUser(newUser);
    showToast('Signed up successfully.');
    setInputDetails(initialValue);
    setIsTriedSubmitting(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} >
      <View style={styles.container}>
        {SIGN_UP_INPUTS.map(({ id, label, placeholder, isPassword }) => {
          const { value, isTouched, errorText } = inputDetails[id];
          return (
            <InputText key={id} value={value} label={label} secureTextEntry={isPassword} placeholder={placeholder}
              errorText={(isTouched || isTriedSubmitting) ? errorText : ''} onChange={(v) => onInputChange(id, v)} onBlur={() => onInputBlur(id)} />
          );
        }
        )}
        <InputButton title="Sign Up" style={{ marginTop: 12 }} disabled={loading} onPress={onSignUpPress} />
      </View>
    </ScrollView>
  );
};

export default SignUp;