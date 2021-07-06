import React, { useState } from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONST from "../../utils/consts";

import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Button } from "@material-ui/core";

import useStyles from "./styles";

const Follow = ({ userId, user, setUser }) => {
  const [error, setError] = useState(null);

  const classes = useStyles();

  const handleFollow = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = localStorage.getItem(CONST.ACCESS_TOKEN);
        const url = `${CONST.SERVER_URL}${PATHS.USER}/${userId}${PATHS.FOLLOW_USER}`;
        const response = await axios.put(
          url,
          { user },
          { headers: { authorization: accessToken } }
        );

        setError(null);
        if (!response.status) throw response;

        setUser(response.data);
        resolve();
      } catch (err) {
        setError(err.response.data);
        console.log("ERROR", err);
        reject(err);
      }
    });
  };

  // try catch blocks are easier to troubleshoot with promises
  const handleUnFollow = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const accessToken = localStorage.getItem(CONST.ACCESS_TOKEN);
        const url = `${CONST.SERVER_URL}${PATHS.USER}/${userId}${PATHS.UNFOLLOW_USER}`;
        const response = await axios.put(
          url,
          { user },
          { headers: { authorization: accessToken } }
        );

        if (!response.status) throw response;

        setError(null);
        setUser(response.data);
        resolve();
      } catch (err) {
        console.error(err);
        setError(err.response.data);
        reject(err);
      }
    });
  };

  const hasUserId = user.following[0] === userId;
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (hasUserId) {
            await handleUnFollow();
          } else {
            await handleFollow();
          }
        }}
      >
        <Button
          className={hasUserId ? classes.unFollow : classes.follow}
          variant="contained"
          color={hasUserId ? "secondary" : "primary"}
          type="submit"
          startIcon={hasUserId ? <PersonAddDisabledIcon /> : <PersonAddIcon />}
        >
          {hasUserId ? "UnFollow" : "Follow"}
        </Button>
      </form>
    </div>
  );
};

export default Follow;
