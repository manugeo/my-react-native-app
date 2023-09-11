import * as SecureStore from 'expo-secure-store';

class AuthStorage {
  constructor(namespace = 'my-react-native-app-auth') {
    this.namespace = namespace;
  }

  async getUser() {
    const user = await SecureStore.getItemAsync(`${this.namespace}-user`);
    return user ? JSON.parse(user) : null;
  }

  async setUser(user) {
    await SecureStore.setItemAsync(`${this.namespace}-user`, JSON.stringify(user));
  }

  async removeUser() {
    await SecureStore.deleteItemAsync(`${this.namespace}-user`);
  }
}

export default AuthStorage;