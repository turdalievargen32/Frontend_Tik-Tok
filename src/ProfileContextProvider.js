import React, { createContext } from 'react';


export const profileContext = createContext();
export const useProfile = () => useContext(profileContext);

const ProfileContextProvider = ({ children }) => {
  return (
    <profileContext.Provider
      value={{}}
    >
      {children}
    </profileContext.Provider>
  );
};

export default ProfileContextProvider;