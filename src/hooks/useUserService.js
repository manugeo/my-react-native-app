import { useState } from "react";
import { createUserAsync } from "../mockApi";

const useUserService = () => {
  const [loading, setLoading] = useState(false);
  const createUser = async (userDetails) => {
    setLoading(true);
    const response = await createUserAsync(userDetails);
    setLoading(false);
    return response;
  };

  return { createUser, loading };
};

export default useUserService;