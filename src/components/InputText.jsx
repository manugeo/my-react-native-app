import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../theme";
import { useEffect, useRef } from "react";

const { colors, texts } = theme;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingBottom: 24,
  },
  label: {
    marginBottom: 8,
    color: colors.textPrimary,
    ...texts.medium
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    color: colors.textPrimary,
    ...texts.medium
  },
  errorText: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 4,
    paddingLeft: 8,
    color: colors.textError,
    ...texts.small
  }
});

const InputText = ({ value = null, label = '', style = null, errorText = '', onChange = () => { }, ...props }) => {
  const inputRef = useRef(null);
  const blurInput = () => {
    const currentTextInput = inputRef?.current || null;
    if (currentTextInput && currentTextInput.isFocused()) {
      currentTextInput.blur();
    }
  };
  useEffect(() => {
    const keyboardSubscription = Keyboard.addListener('keyboardDidHide', blurInput);
    return () => keyboardSubscription.remove();
  }, []);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput value={value} style={styles.textInput} ref={inputRef} onChangeText={onChange} {...props} />
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

export default InputText;