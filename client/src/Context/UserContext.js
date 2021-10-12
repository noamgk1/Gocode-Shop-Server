import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const getUser = () => {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  return user ? user : null;
};

function UserContextProvider(props) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (getUser()) {
      setUser(getUser());
    } else {
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: null,
          admin: null,
        })
      );
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
