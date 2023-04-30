import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions";

const InitialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const displayAlert = () => {
    //displays the alert when there are empty text fields
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };
  const clearAlert = () => {
    //CLEARS the alert after 3 seconds!
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, InitialState, useAppContext };
