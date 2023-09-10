import { StyleSheet, Text, TextInput, View } from "react-native";
import theme from "../theme";

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
  return (
    <View style={style}>
      {label && <Text style={inputTextStyles.label}>{label}</Text>}
      <TextInput value={value} style={inputTextStyles.textInput} onChangeText={onChange} {...props} />
    </View>
  );
};

export default InputText;