import { createContext, useState, useEffect } from "react";

export const UserCtx = createContext();

function getUser() {
  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);
  return user ? user.data.user : null;
}

export function UserContext({ children }) {
  const [user, setUser] = useState({ accessToken: null, user: null });

  useEffect(() => {
    console.log(user);
    if (user) {
      setUser(getUser());
    }
  }, []);

  return (
    <UserCtx.Provider value={[user, setUser]}>{children}</UserCtx.Provider>
  );
}
