import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as CONST from "../utils/consts";

const HobbiesPage = () => {
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

  return (
    <div>
      <Link to={PATHS.ADD_HOBBY}>Add One</Link>
      {listOfHobbies.map((hobby) => {
        return (
          <section key={hobby._id}>
            <Link to={`${PATHS.HOBBIES_PAGE}/${hobby._id}`} style={{}}>
              <h2>{hobby.name}</h2>
              <img src={hobby.image} alt="hobby" width="200" />
            </Link>
          </section>
        );
      })}
    </div>
  );
};

export default HobbiesPage;
