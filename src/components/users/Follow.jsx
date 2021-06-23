import React, { useState, useEffect } from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONST from "../../utils/consts";
import * as USER_SERVICE from "../../services/user";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { IconButton, Tooltip } from "@material-ui/core";
const Follow = (props) => {
  console.log("SEE:", props);
  const { userId, user, setUser } = props;
  const [error, setError] = useState(null);
  const [follow, setFollow] = useState(false);

  function followToggles() {
    setFollow(!follow);
  }

  //   const handleFollowChange = (e) => {
  //     setFollow({ ...follow, [e.target.name]: e.target.value });
  //   };

  //   const handleFollowSubmit = (e) => {
  //     e.preventDefault();
  //     const accessToken = localStorage.getItem(CONST.ACCESS_TOKEN);
  //     USER_SERVICE.FOLLOW_USER(follow, accessToken)
  //       .then((response) => {
  //         console.log("WAIT", response);
  //         setUser(response.data.user);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  let userFollows;
  if (user) {
    userFollows = user.following.some((e) => e._id === userId);

    const followTheLeader = (e) => {
      e.preventDefault();
      const accessToken = localStorage.getItem(CONST.ACCESS_TOKEN);

      if (!accessToken) {
        return;
      }

      if (user.following.filter((e) => e._id === userId).length < 1) {
        console.log(">>", user, ">>", userId);
        axios
          .put(
            `${CONST.SERVER_URL}${PATHS.USER}/${userId}${PATHS.FOLLOW_USER}`,
            { user },
            { headers: { authorization: accessToken } }
          )
          .then((response) => {
            console.log("|m|", response.data);
            setError(null);
            if (!response.status) {
              return setError(response);
            }
            console.log("TELL ME", response);
            setUser(response?.data?.user);
          })
          .catch((error) => {
            console.log("ERROR", error);
          });
      } else {
        axios
          .put(
            `${CONST.SERVER_URL}${PATHS.USER}/${userId}${PATHS.UNFOLLOW_USER}`,
            { user },
            { headers: { authorization: accessToken } }
          )
          .then((response) => {
            setUser(response.data.user);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    return (
      <div>
        {/* <button onChange={handleFollowChange} onClick={handleFollowSubmit}>
        Follow
      </button> */}
        <Tooltip title="Follow">
          <IconButton aria-label="Follow" onClick={followToggles}>
            <PersonAddIcon fontSize="large" onClick={followTheLeader} />
          </IconButton>
        </Tooltip>

        {/* {userFollows ? (
          <button onClick={followTheLeader}>UnFollow</button>
        ) : (
          <button onClick={followTheLeader}>Follow</button>
        )} */}
      </div>
    );
  }
};

export default Follow;
