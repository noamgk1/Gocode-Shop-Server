import { useContext } from "react";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@material-ui/core/IconButton";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

function Logout() {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  async function logout(e) {
    console.log("11211", user);
    e.preventDefault();

    const url = "/api/users/logout";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const user1 = await axios.post(url, user, options);

      if (user1.status === 200) {
        localStorage.removeItem("user");

        setUser({
          accessToken: null,
          user: null,
          admin: null,
        });
        return history.go("/");
      }
    } catch (err) {
      // throw Error(err);
      console.log(err);
    }
  }

  return (
    <React.Fragment key={"right"}>
      <IconButton onClick={(e) => logout(e)}>
        <StyledBadge>
          <LogoutIcon variant="outlined" />
        </StyledBadge>
        <h6> Logout</h6>
      </IconButton>
    </React.Fragment>
  );
}

export default Logout;
