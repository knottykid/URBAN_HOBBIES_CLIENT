import React, { useState, useEffect } from "react";
import axios from "axios";
import * as CONST from "../utils/consts";

const SingleHobby = (props) => {
  const [hobby, setHobby] = useState({});

  //   const showHobby = (hob) => {
  //     setHobby(hob);
  //   };

  useEffect(() => {
    axios
      .get(`${CONST.SERVER_URL}/hobbies/${props.match.params.hobbyId}`)
      .then((hobby) => {
        console.log("response", hobby);
        setHobby(hobby.data);
      })
      .catch(
        (err) => {
          console.log(err.response);
        },
        [props.match.params.hobbyId]
      );
  });

  return (
    <div>
      <img src={hobby.image} alt="hobby" />
      <h1>{hobby.name}</h1>
      <h3>{hobby.description}</h3>
      <ul>
        <lil>{hobby.members}</lil>
      </ul>
    </div>
  );
};

export default SingleHobby;