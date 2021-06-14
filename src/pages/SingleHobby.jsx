import React, { useState, useEffect } from "react";
import axios from "axios";
import * as CONST from "../utils/consts";
import * as HOBBIES_SERVICE from "../services/hobbies";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
const SingleHobby = (props) => {
  const { user, authenticate } = props;
  const [hobby, setHobby] = useState({});

  //   const showHobby = (hob) => {
  //     setHobby(hob);
  //   };

  useEffect(() => {
    axios
      .get(`${CONST.SERVER_URL}/hobbies/${props.match.params.hobbyId}`)
      .then((response) => {
        console.log("response", response);
        setHobby(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [props.match.params.hobbyId]);

  useEffect(() => {
    axios
      .post(`${CONST.SERVER_URL}/hobbies/${props.match.params.hobbyId}/join`, {
        user,
      })
      .then((response) => {
        console.log("WHATDUP:", response.data.user);
        setHobby(response.data.user);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [props.match.params.hobbyId, user]);

  const handleSubmission = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem(CONST.ACCESS_TOKEN);
    HOBBIES_SERVICE.JOIN_HOBBY(hobby, accessToken)
      .then((response) => {
        console.log("response:", response);
        authenticate(response.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <img src={hobby.image} alt="hobby" />
      <h1>{hobby.name}</h1>
      <h3>{hobby.description}</h3>
      <button onSubmit={handleSubmission} onClick={() => hobby}>
        Join
      </button>

      {/* <ul>
        <li>{hobby.members}</li>
      </ul> */}
    </div>
  );
};

export default SingleHobby;
