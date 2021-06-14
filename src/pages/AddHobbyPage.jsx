import React, { useState } from "react";
import * as CONST from "../utils/consts";
import * as PATHS from "../utils/paths";
import * as HOBBIES_SERVICE from "../services/hobbies";

const primaryValues = [
  {
    name: "",
    description: "",
    image: "",
    neighborhood: "",
    postalCode: "",
  },
];

const AddHobbyPage = (props) => {
  const [newHobby, setNewHobby] = useState(primaryValues);

  const handleChange = (e) => {
    setNewHobby({ ...newHobby, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem(CONST.ACCESS_TOKEN);
    HOBBIES_SERVICE.ADD_HOBBY(newHobby, accessToken)
      .then((response) => {
        console.log("response:", response);
        props.history.push(
          `${PATHS.HOBBIES_PAGE}/${response.data.hobbies._id}`
        );
      })
      .catch((error) => {
        console.log("JOJO:", error.response);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Hobby</label>
        <input
          name={newHobby.name}
          placeholder="New Hobby"
          value={newHobby.name}
          onChange={handleChange}
        />
        <br />
        <label>Description</label>
        <input
          name={newHobby.description}
          placeholder="what is it about?"
          value={newHobby.description}
          onChange={handleChange}
        />
        <label>Image</label>
        <input
          name={newHobby.image}
          placeholder="One image say more than 1000 words"
          type="file"
          value={newHobby.image}
          onChange={handleChange}
        />
        <br />
        <label>Neighborhood</label>
        <input
          name={newHobby.neighborhood}
          placeholder="Boyz in Da Hood"
          value={newHobby.neighborhood}
          onChange={handleChange}
        />
        <br />
        <label>Postal Code</label>
        <input
          name={newHobby.postalCode}
          placeholder="PLZ"
          value={newHobby.postalCode}
          onChange={handleChange}
        />
        <br />
        <button>Add Me!</button>
      </form>
    </div>
  );
};

export default AddHobbyPage;
