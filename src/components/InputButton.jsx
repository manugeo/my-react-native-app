import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../theme";

const { colors, texts } = theme;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.textPrimary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: colors.textLight,
    ...texts.medium
  }
});

const InputButton = ({ title = '', style = null, onPress = () => { } }) => {
  const pressableStyles = [styles.container, style];
  return (
    <Pressable style={pressableStyles} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default InputButton;