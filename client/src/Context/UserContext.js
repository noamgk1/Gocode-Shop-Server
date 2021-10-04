import { createContext, useState, useEffect } from "react";
// import axios from "axios";

export const UserContext = createContext();

const getUser = () => {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  console.log("h", user);
  return user ? user : null;
};

function UserContextProvider(props) {
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([false]);
  // async function guest() {
  //   const url = "/api/users/guest";
  //   const options = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };
  //   try {
  //     const user = await axios.post(url, options);
  //     localStorage.setItem("user", JSON.stringify(user.data));

  //     if (user.status === 200) {
  //       setUser(localStorage.getItem("user"));
  //     }
  //   } catch (err) {
  //     // throw Error(err);
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    if (getUser()) {
      setUser(getUser());
    } else {
      setAdmin(false);
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: null,
        })
      );
    }
  }, []);
  const value = ([user, setUser], [admin, setAdmin]);
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export default UserContextProvider;
