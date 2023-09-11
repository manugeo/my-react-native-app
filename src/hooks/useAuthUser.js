import { useState } from "react";

const useAuthUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  return { currentUser, setCurrentUser };
};

export default useAuthUser;