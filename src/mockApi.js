const USERS = [];

const createUser = (data) => {
  const { fullName, email, password } = data;
  if (!fullName) return { error: 'Full Name is required.' }
  if (!email) return { error: 'Email is required.' }
  if (!password) return { error: 'Password is required.' }
  if (USERS.some(user => (user.email === email))) return { error: 'User already exists.' }

  const newUser = { fullName, email, password, id: randomId() };
  USERS.push(newUser);
  return { user: newUser };
};

const randomId = function (length = 8) {
  return Math.random().toString(36).substring(2, length + 2);
};

export const createUserAsync = (user) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(createUser(user)), 3000);
  });
};