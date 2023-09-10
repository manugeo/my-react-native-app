import { Keyboard, StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../theme";
import { useEffect, useRef } from "react";

const { colors, texts } = theme;

const inputTextStyles = StyleSheet.create({
  label: {
    marginBottom: 8,
    color: colors.textPrimary,
    ...texts.medium
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: colors.textPrimary,
    ...texts.medium
  }
});

const InputText = ({ value = null, label = '', style = null, onChange = () => { }, ...props }) => {
  const inputRef = useRef(null);
  const blurInput = () => {
    const currentTextInput = inputRef?.current || null;
    if (currentTextInput && currentTextInput.isFocused()) {
      console.log('Boom!');
      currentTextInput.blur();
    }
  };
  useEffect(() => {
    const keyboardSubscription = Keyboard.addListener('keyboardDidHide', blurInput);
    return () => keyboardSubscription.remove();
  }, []);

  return (
    <View style={style}>
      {label && <Text style={inputTextStyles.label}>{label}</Text>}
      <TextInput value={value} style={inputTextStyles.textInput} ref={inputRef} onChangeText={onChange} {...props} />
    </View>
  );
};

export default InputText;