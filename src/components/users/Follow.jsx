import React, { useState, useEffect } from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONST from "../../utils/consts";
import * as USER_SERVICE from "../../services/user";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Button, makeStyles } from "@material-ui/core";
import { green, orange } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 5),
    textTransform: "none",

    backgroundColor: green[500],
  },
  unFollow: {
    textTransform: "none",

    backgroundColor: orange[500],
  },
}));

const Follow = (props) => {
  console.log("SEE:", props);
  const { userId, user, setUser } = props;
  const [error, setError] = useState(null);
  const [follow, setFollow] = useState([]);
  const classes = useStyles();

  const handleFollow = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem(CONST.ACCESS_TOKEN);
    axios
      .put(
        `${CONST.SERVER_URL}${PATHS.USER}/${userId}${PATHS.FOLLOW_USER}`,
        { user },
        { headers: { authorization: accessToken } }
      )
      .then((response) => {
        setError(null);
        if (!response.status) {
          return setError(response);
        }

        setUser(response?.data);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  const handleUnFollow = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem(CONST.ACCESS_TOKEN);
    axios
      .put(
        `${CONST.SERVER_URL}${PATHS.USER}/${userId}${PATHS.UNFOLLOW_USER}`,
        { user },
        { headers: { authorization: accessToken } }
      )
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {user.following[0] === userId ? (
        <form onSubmit={handleUnFollow}>
          <Button
            className={classes.unFollow}
            variant="contained"
            color="secondary"
            type="submit"
            startIcon={<PersonAddDisabledIcon />}
          >
            UnFollow
          </Button>
        </form>
      ) : (
        <form onSubmit={handleFollow}>
          <Button
            className={classes.root}
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<PersonAddIcon />}
          >
            Follow
          </Button>
        </form>
      )}
    </div>
  );
};

export default Follow;
