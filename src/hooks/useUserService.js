import { useState } from "react";
import { createUserAsync } from "../mockApi";
import useCurrentUserFromContext from "./useCurrentUserFromContext";

const useUserService = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useCurrentUserFromContext();

  const createUser = async (userDetails) => {
    setLoading(true);
    const response = await createUserAsync(userDetails);
    setLoading(false);
    return response;
  };

  return { loading, currentUser, setCurrentUser, createUser };
};

export default useUserService;