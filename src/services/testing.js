import React, { useState, useEffect } from "react";
import axios from "axios";
import * as PATHS from "../utils/paths";
import * as CONST from "../utils/consts";

export function Testing() {
  const [listOfHobbies, setListOfHobbies] = useState([]);

  useEffect(() => {
    axios
      .get(`${CONST.SERVER_URL}/hobbies`)
      .then((response) => {
        setListOfHobbies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => console.log("adios");
  }, []);
  return listOfHobbies.map((hobby) => (
    <section key={hobby._id}>
      <h3>{hobby.name}</h3>
    </section>
  ));
}
