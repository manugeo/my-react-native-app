const USERS = [];

const loginUser = (data) => {
  const { email, password } = data;
  if (!email) return { error: 'Email is required.' }
  if (!password) return { error: 'Password is required.' }

  const existingUser = USERS.find(user => ((user.email === email) && (user.password === password)));
  if (!existingUser) return { error: 'Invalid email or password. Please try again.' };
  return { user: existingUser };
};

const createUser = (data) => {
  const { fullName, email, password } = data;
  if (!fullName) return { error: 'Full Name is required.' }
  if (!email) return { error: 'Email is required.' }
  if (!password) return { error: 'Password is required.' }
  if (USERS.some(user => (user.email === email))) return { error: 'A user with the same email address already exists.' }

  const newUser = { fullName, email, password, id: randomId() };
  USERS.push(newUser);
  return { user: newUser };
};

const randomId = function (length = 8) {
  return Math.random().toString(36).substring(2, length + 2);
};

export const loginUserAsync = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(loginUser(data)), 3000);
  });
};

export const createUserAsync = (user) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(createUser(user)), 3000);
  });
};