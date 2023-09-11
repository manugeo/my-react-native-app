import { useEffect, useState } from "react";
import AuthStorage from "../authStorage";

const authStorage = new AuthStorage();

const useAuthUser = () => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUserToState] = useState(null);

  useEffect(() => {
    const initializeCurrentUserFromAuthStorage = async () => {
      setLoading(true);
      const currentUserFromAuthStorage = await authStorage.getUser();
      if (currentUserFromAuthStorage) {
        setCurrentUserToState(currentUserFromAuthStorage);
      }
      setLoading(false);
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

  return { currentUser, setCurrentUser, loading };
};

export default useAuthUser;