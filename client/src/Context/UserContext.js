import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState({
    accessToken: null,
    user: null,
    admin: null,
  });

  const getUser = () => {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    console.log("1", user);
    return user ? user : null;
  };

  useEffect(() => {
    if (user) {
      setUser(getUser());
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
