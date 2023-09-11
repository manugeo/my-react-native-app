import { ScrollView, StyleSheet, Text, View } from "react-native";
import useCurrentUserFromContext from "../hooks/useCurrentUserFromContext";
import theme from "../theme";
import { useLayoutEffect } from "react";
import InputButton from "./InputButton";
import { showToast } from "../utils";

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

const Home = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useCurrentUserFromContext();
  const { fullName } = currentUser;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <InputButton title="Log Out" type="compact" onPress={onLogOutPress} />
      )
    });
  }, []);

  const onLogOutPress = () => {
    setCurrentUser(null);
    showToast('Logged out successfully.');
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} >
      <View style={styles.container}>
        <Text>{`Welcome ${fullName}!`}</Text>
      </View>
    </ScrollView>
  );
};

export default Home;