import React, { useState, useEffect } from "react";
import axios from "axios";
import * as CONST from "../utils/consts";
import * as USERS_SERVICE from "../services/user";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import Follow from "../components/users/Follow";
import LoadingComponent from "../components/Loading";
const SingleUser = (props) => {
  const { user, authenticate, setUser } = props;
  const [dynamicUser, setDynamicUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.match.params.userId]);

  if (isLoading) {
    return <LoadingComponent />;
  }
  console.log("NIRVANA", dynamicUser.followers);
  console.log("AIC", dynamicUser.followers[0].username);
  return (
    <div>
      <img src={dynamicUser.profilePic} alt="pic of the user" width="200" />
      <h2>{dynamicUser.username}</h2>
      <h3>{dynamicUser.neighborhood}</h3>
      <h3>{dynamicUser.postalCode}</h3>
      <h3>{dynamicUser.location}</h3>

      <h3>{dynamicUser.hobbies?.join(", ")}</h3>
      <br />

      <Follow userId={dynamicUser._id} user={user} setUser={setUser} />
      <h3>Following: </h3>
      {dynamicUser.following.map((e) => {
        return (
          <div key={e._id}>
            <img src={e.profilePic} alt="following" width="50" />
            <br />
            {e.username?.split(", ")}
          </div>
        );
      })}
      <>
        <h3>Followers: </h3>
        {dynamicUser.followers.map((e) => {
          return (
            <div key={e._id}>
              <img src={e.profilePic} alt="followers" width="50" />
              <br />
              {e.username}
            </div>
          );
        })}
      </>
      {/* <h4>Followers: {JSON.stringify(dynamicUser.followers.username)}</h4> */}
      {/* 
      <i>Followers: {JSON.stringify(dynamicUser.name)}</i> */}
      <br />

      {/* <i>Following: {dynamicUser.following[0].username}</i> */}
    </div>
  );
};

export default SingleUser;
