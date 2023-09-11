import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const useCurrentUserFromContext = () => {
  return useContext(CurrentUserContext);
};

export default useCurrentUserFromContext;