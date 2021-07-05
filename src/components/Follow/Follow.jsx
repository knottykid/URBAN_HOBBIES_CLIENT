import React, { useState, useEffect } from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONST from "../../utils/consts";

import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Button } from "@material-ui/core";

import useStyles from "./styles";

const Follow = ({ userId, user, setUser }) => {
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
        console.log("BASH", response);
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
        console.log("Are you?", response);
        setError(null);
        if (!response.status) {
          return setError(response);
        }
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
            className={classes.follow}
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
