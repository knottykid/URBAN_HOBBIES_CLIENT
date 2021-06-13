import axios from "axios";
import React, { useState, useEffect } from "react";
import * as HOBBIES_SERVICE from "../services/hobbies";
import * as CONST from "../utils/consts";
const JoinHobbyPage = ({ user, authenticate }) => {
  const [newHobby, setNewHobby] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get(`${CONST.SERVER_URL}/hobbies`)
  //       .then((response) => {
  //         setNewHobby(response.data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     return () => console.log("bye, bye");
  //   }, []);
  return (
    <div>
      {user.name}

      {/* {newHobby.map((hobby) => {
        return (
          <section key={hobby._id}>
            <li>{hobby.name}</li>
          </section>
        );
      })} */}
      <button>Join</button>
    </div>
  );
};

export default JoinHobbyPage;
