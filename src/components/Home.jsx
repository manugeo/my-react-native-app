import { ScrollView, StyleSheet, Text, View } from "react-native";
import useCurrentUserFromContext from "../hooks/useCurrentUserFromContext";
import theme from "../theme";
import { useLayoutEffect, useState } from "react";
import InputButton from "./InputButton";
import { showToast } from "../utils";

const { colors, texts } = theme;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: colors.backgroundPrimary
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center'
  },
  welcomeText: {
    ...texts.large,
    color: colors.textPrimary
  },
  fullNameText: {
    marginTop: 20,
    ...texts.medium,
    color: colors.textPrimary
  },
  emailText: {
    marginTop: 6,
    ...texts.medium,
    color: colors.textPrimary
  },
  detailsButton: {
    marginTop: 6
  }
});

const Home = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useCurrentUserFromContext();
  const { fullName } = currentUser;
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <InputButton title="Log Out" onPress={onLogOutPress} />
      )
    });
  }, []);

  const onLogOutPress = () => {
    setCurrentUser(null);
    showToast('Logged out successfully.');
  }

  const onDetailsButtonPress = () => setIsDetailsVisible(!isDetailsVisible);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent} >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>{`Welcome ${fullName.split(' ')[0]}!`}</Text>
        {isDetailsVisible && <>
          <Text style={styles.fullNameText}>Your Full Name: Manu Thomas</Text>
          <Text style={styles.emailText}>Your Email: manugeo13@gmail.com</Text>
        </>}
        <InputButton title={isDetailsVisible ? 'Hide details' : 'Show details'} type="compact" style={styles.detailsButton}
          onPress={onDetailsButtonPress} />
      </View>
    </ScrollView>
  );
};

export default Home;