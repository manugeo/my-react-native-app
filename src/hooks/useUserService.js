import dummyApi from "../dummyApi";

const { createUserAsync } = dummyApi;

const useUserService = () => {
  const createUser = async (userDetails) => {
    const newUser = await createUserAsync(userDetails);
    if (!newUser || newUser.error) {
      console.log(newUser.error);
      return null;
    }
    console.log('New user created!', newUser);
    return newUser;
  };

  return { createUser };
};

export default useUserService;