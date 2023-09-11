import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../theme";

const { colors, texts } = theme;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundDarker,
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

const InputButton = ({ title = '', style = null, disabled = false, type = 'primary', onPress = () => { }, ...props }) => {
  const getPressableStyle = ({ pressed }) => {
    return [styles.container, (disabled && { opacity: 0.5 }), ((type === 'compact') && { backgroundColor: colors.backgroundLighter, padding: 8 }), style,
    (pressed && { opacity: 0.5 })]
  };
  const textStyles = [styles.text, ((type === 'compact') && { ...texts.small, color: colors.textPrimary })];

  return (
    <Pressable style={getPressableStyle} disabled={disabled} onPress={onPress} {...props}>
      <Text style={textStyles}>{title}</Text>
    </Pressable>
  );
};

export default InputButton;