import React, { useState, createContext } from "react";
import userService from "../services/userService";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(props.initialUserProfile ? true : false);
  console.log(props)
  const [userProfile, setUserProfile] = useState(props.initialUserProfile ? props.initialUserProfile : {});

  const signIn = (user, rm) => {
    if (rm) {
      localStorage.setItem('userProfile', JSON.stringify(user));
    }
    else {
      sessionStorage.setItem('userProfile', JSON.stringify(user));
    }

    setIsAuthenticated(true);

    setUserProfile(user)
  }
  const handleSetUserProfile = (user) => {
    userService.create(user).then((response) => {
      if (localStorage.getItem('userProfile')) {
        console.log(JSON.parse(localStorage.getItem('userProfile')))
        if (JSON.parse(localStorage.getItem('userProfile')).id === userProfile.id) {
          console.log('update local storage');
          localStorage.setItem('userProfile', JSON.stringify(user));
        }
      }
      setUserProfile(user)
      /* eslint-disable no-restricted-globals */
      location.reload()
      /* eslint-disable no-restricted-globals */

    }).catch((error) => {
      console.log(error)
    });

  }

  const signOut = () => {
    localStorage.removeItem('userProfile');
    sessionStorage.removeItem('userProfile');
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        userProfile,
        handleSetUserProfile
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;