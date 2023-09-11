import { useEffect, useState } from "react";
import AuthStorage from "../authStorage";

const authStorage = new AuthStorage();

const useAuthUser = () => {
  const [currentUser, setCurrentUserToState] = useState(null);

  useEffect(() => {
    const initializeCurrentUserFromAuthStorage = async () => {
      const currentUserFromAuthStorage = await authStorage.getUser();
      if (currentUserFromAuthStorage) {
        setCurrentUserToState(currentUserFromAuthStorage);
      }
    };
    initializeCurrentUserFromAuthStorage();
  }, []);

  const setCurrentUser = async (user) => {
    // Note: Handling logout, when currentUser is 'null'.
    if (user == null) {
      await authStorage.removeUser();
      setCurrentUserToState(null);
      return;
    }
    await authStorage.setUser(user);
    setCurrentUserToState(user);
  };

  return { currentUser, setCurrentUser };
};

export default useAuthUser;