import React, { useState, useEffect } from "react";
import { Autocomplete } from "@material-ui/lab/";
import axios from "axios";
import * as CONST from "../../utils/consts";

import { TextField } from "@material-ui/core";

const HobbiesForm = ({ onChange }) => {
  const [allHobbies, setAllHobbies] = useState([]);
  const [newHobbies, setNewHobbies] = useState([]);

  useEffect(() => {
    axios
      .get(`${CONST.SERVER_URL}/hobbies`)
      .then((response) => {
        console.log("PARAMS:", response.data);
        setAllHobbies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => console.log("Schuss");
  }, []);

  const handleChange = (e, newValue) => {
    console.dir(e);
    console.log(newValue);
    setNewHobbies(newValue);
    onChange(newValue);
  };

  console.log("NEW STATE: ", newHobbies);

  return (
    <Autocomplete
      debug={true}
      multiple
      id="urban-hobbies"
      freeSolo
      onChange={handleChange}
      options={allHobbies.map((option) => option.name)}
      renderInput={(params) => (
        <TextField
          {...params}
          name="hobbies"
          label="Hobbies"
          margin="normal"
          variant="outlined"
        />
      )}
    />
  );
};

export default HobbiesForm;
