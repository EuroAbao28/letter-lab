import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const [gender, setGender] = useState(sessionStorage.getItem("gender"));

  useEffect(() => {
    // if there is no user in session storage, create one and store it
    if (!user) {
      let randomNumber = [];
      for (let i = 0; i < 8; i++) {
        const generate = Math.floor(Math.random() * 7);
        randomNumber.push(generate);
      }

      // return true if the number is devisible by 2
      const genderBoolean = Math.random() >= 0.5;

      sessionStorage.setItem("user", `Guest_${randomNumber.join("")}`);
      sessionStorage.setItem("gender", genderBoolean);

      setUser(`Guest_${randomNumber.join("")}`);
      setGender(genderBoolean);
    }
  }, []);

  // for updating the user
  const updateUser = (newUser) => {
    setUser(newUser);
    sessionStorage.setItem("user", newUser);
  };

  // for updating the user
  const updateGender = (newGender) => {
    setGender(newGender);
    sessionStorage.setItem("gender", newGender);
  };

  return (
    <UserContext.Provider value={{ user, gender, updateUser, updateGender }}>
      {children}
    </UserContext.Provider>
  );
};
