import React, { useState } from "react";
import * as CONST from "../utils/consts";
import * as HOBBIES_SERVICE from "../services/hobbies";

const AddHobbyPage = ({ user, authenticate }) => {
  const [myHobbies, setMyHobbies] = useState([user.hobbies]);

  const handleChange = (e) => {
    setMyHobbies({ ...myHobbies, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem(CONST.ACCESS_TOKEN);
    HOBBIES_SERVICE.ADD_HOBBY(myHobbies, accessToken)
      .then((response) => {
        console.log("RESP", response);
        authenticate(response.data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Hobby</label>
        <input
          name={myHobbies.name}
          placeholder="New Hobby"
          value={myHobbies.name}
          onChange={handleChange}
        />
        <br />
        <label>Description</label>
        <input
          name={myHobbies.description}
          placeholder="what is it about?"
          value={myHobbies.description}
          onChange={handleChange}
        />
        <br />
        <label>Neighborhood</label>
        <input
          name={myHobbies.neighborhood}
          placeholder="Boyz in Da Hood"
          value={myHobbies.neighborhood}
          onChange={handleChange}
        />
        <br />
        <label>Postal Code</label>
        <input
          name={myHobbies.postalCode}
          placeholder="PLZ"
          value={myHobbies.postalCode}
          onChange={handleChange}
        />
        <br />
        <button>Add Me!</button>
      </form>
    </div>
  );
};

export default AddHobbyPage;
