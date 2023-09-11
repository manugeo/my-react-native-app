import AsyncStorage from '@react-native-async-storage/async-storage';

const NAMESPACE = 'my-react-native-app-api';
const getUsersFromStorage = async () => {
  const users = await AsyncStorage.getItem(
    `${NAMESPACE}:users`,
  );
  return users ? JSON.parse(users) : [];
};
const addUserToStorage = async (user) => {
  const currentUsers = await getUsersFromStorage();
  const newUsers = [...currentUsers, user];
  await AsyncStorage.setItem(
    `${this.namespace}:users`,
    JSON.stringify(newUsers),
  );
}

export const loginUserAsync = async (data) => {
  const { email, password } = data;
  if (!email) return { error: 'Email is required.' }
  if (!password) return { error: 'Password is required.' }

  const users = await getUsersFromStorage();
  const existingUser = users.find(user => ((user.email === email) && (user.password === password)));
  if (!existingUser) return { error: 'Invalid email or password. Please try again.' };
  return { user: existingUser };
};

export const createUserAsync = async (data) => {
  const { fullName, email, password } = data;
  if (!fullName) return { error: 'Full Name is required.' }
  if (!email) return { error: 'Email is required.' }
  if (!password) return { error: 'Password is required.' }

  const users = await getUsersFromStorage();
  if (users.some(user => (user.email === email))) return { error: 'A user with the same email address already exists.' };

  const newUser = { fullName, email, password, id: randomId() };
  await addUserToStorage(newUser);
  return { user: newUser };
};

const randomId = function (length = 8) {
  return Math.random().toString(36).substring(2, length + 2);
};