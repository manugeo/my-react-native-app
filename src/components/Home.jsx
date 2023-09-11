import { ScrollView, StyleSheet, Text, View } from "react-native";
import useCurrentUserFromContext from "../hooks/useCurrentUserFromContext";
import theme from "../theme";

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

const Home = () => {
  const { currentUser } = useCurrentUserFromContext();
  const { fullName } = currentUser;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} >
      <View style={styles.container}>
        <Text>{`Welcome ${fullName}!`}</Text>
      </View>
    </ScrollView>
  );
};

export default Home;