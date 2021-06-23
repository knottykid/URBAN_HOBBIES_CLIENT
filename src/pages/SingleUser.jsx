import React, { useState, useEffect } from "react";
import axios from "axios";
import * as CONST from "../utils/consts";
import * as USERS_SERVICE from "../services/user";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import Follow from "../components/users/Follow";
const SingleUser = (props) => {
  const { user, authenticate, setUser } = props;
  const [dynamicUser, setDynamicUser] = useState({});

  useEffect(() => {
    axios
      .get(`${CONST.SERVER_URL}/users/${props.match.params.userId}`, {
        headers: { authorization: localStorage.getItem(CONST.ACCESS_TOKEN) },
      })
      .then((response) => {
        console.log("RESPUESTA", response);
        setDynamicUser(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [props.match.params.userId]);

  return (
    <div>
      <img src={dynamicUser.profilePic} alt="pic of the user" width="200" />
      <h2>{dynamicUser.username}</h2>
      <h3>{dynamicUser.neighborhood}</h3>
      <h3>{dynamicUser.postalCode}</h3>
      <h3>{dynamicUser.location}</h3>

      <h3>{dynamicUser.hobbies?.join(", ")}</h3>

      <Follow userId={dynamicUser._id} user={user} setUser={setUser} />
    </div>
  );
};

export default SingleUser;
