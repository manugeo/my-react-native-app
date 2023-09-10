const USERS = [];

const createUser = (user) => {
  const { fullName, email, password } = user;
  if (!fullName) return { error: 'fullName is required.' }
  if (!email) return { error: 'email is required.' }
  if (!password) return { error: 'password is required.' }
  const newUser = { fullName, email, password, id: randomId() };
  USERS.push(newUser);
  return newUser;
};

const randomId = function (length = 8) {
  return Math.random().toString(36).substring(2, length + 2);
};

const createUserAsync = (user) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(createUser(user)), 1200);
  });
};

export default { createUserAsync };