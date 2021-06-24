import React, { useState, useEffect } from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONST from "../../utils/consts";
import * as USER_SERVICE from "../../services/user";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Button, makeStyles } from "@material-ui/core";
import { green, lightGreen } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 5),
    textTransform: "none",

    backgroundColor: green[500],
  },
}));

const Follow = (props) => {
  console.log("SEE:", props);
  const { userId, user, setUser } = props;
  const [error, setError] = useState(null);
  const [follow, setFollow] = useState([]);
  const classes = useStyles();

  // function followToggles(e) {
  //   e.preventDefault();
  //   setFollow(!follow);
  // }

  // let meFollow;

  // const handleChange = (e) => {
  //   setFollow({ ...follow, [e.target.name]: e.target.value });
  // };

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
        console.log("CALL?", response);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // if (user) {
  //   meFollow = user.following.some((e) => e._id === userId);
  //   console.log(user.following.some((e) => e._id === userId));
  //   console.log("YO", user.following);
  //   console.log("DE", userId);

  // const followTheLeader = (e) => {
  //   e.preventDefault();
  //   const accessToken = localStorage.getItem(CONST.ACCESS_TOKEN);

  //   if (!accessToken) {
  //     return;
  //   }

  //   if (user.following.filter((e) => e._id === userId).length < 1) {
  //     console.log(">>", user, ">>", userId);
  //     axios
  //       .put(
  //         `${CONST.SERVER_URL}${PATHS.USER}/${userId}${PATHS.FOLLOW_USER}`,
  //         { user },
  //         { headers: { authorization: accessToken } }
  //       )
  //       .then((response) => {
  //         console.log("|m|", response.data);
  //         setError(null);
  //         if (!response.status) {
  //           return setError(response);
  //         }
  //         console.log("TELL ME", response);
  //         setUser(response?.data?.user);
  //       })
  //       .catch((error) => {
  //         console.log("ERROR", error);
  //       });
  //   } else {
  //     axios
  //       .put(
  //         `${CONST.SERVER_URL}${PATHS.USER}/${userId}${PATHS.UNFOLLOW_USER}`,
  //         { user },
  //         { headers: { authorization: accessToken } }
  //       )
  //       .then((response) => {
  //         console.log("CALL?", response);
  //         setUser(response.data.user);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  return (
    <div>
      {/* {meFollow ? ( */}
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

      {/* <Button
            variant="contained"
            color="primary"
            // onClick={followTheLeader}
            startIcon={<PersonAddDisabledIcon />}
          >
            UnFollow
          </Button>
        {/* ) : ( */}
      {/* <Button
            variant="contained"
            color="primary"
            // onClick={followTheLeader}
            startIcon={<PersonAddIcon />}
          >
            Follow
          </Button> */}
      {/* )} */}
    </div>
  );
};
// };

export default Follow;
