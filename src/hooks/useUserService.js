import { useState } from "react";
import { createUserAsync, loginUserAsync } from "../mockApi";
import useCurrentUserFromContext from "./useCurrentUserFromContext";

const useUserService = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useCurrentUserFromContext();

  const login = async ({ email, password }) => {
    setLoading(true);
    const response = await loginUserAsync({ email, password });
    setLoading(false);
    return response;
  };

  const createUser = async (userDetails) => {
    setLoading(true);
    const response = await createUserAsync(userDetails);
    setLoading(false);
    return response;
  };

  return { loading, currentUser, setCurrentUser, login, createUser };
};

export default useUserService;