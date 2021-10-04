import { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

function AdminContextProvider(props) {
  const [admin, setAdmin] = useState(false);

  const getUser = () => {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString);
    return user ? user : null;
  };

  function checkAdmin() {
    const token = getUser() ? getUser().token : null;

    if (token) {
      fetch("/api/users/admin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ token: token }),
      })
        .then((res) => res.json())
        .then((a) => setAdmin(a.admin));
    }
  }

  checkAdmin();
  useEffect(() => {
    if (getUser()) {
      checkAdmin();
    }
  }, []);

  return (
    <AdminContext.Provider value={[admin, setAdmin]}>
      {props.children}
    </AdminContext.Provider>
  );
}
export default AdminContextProvider;
