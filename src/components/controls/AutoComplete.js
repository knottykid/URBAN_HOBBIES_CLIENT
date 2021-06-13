import React, { useState, useEffect } from "react";
import { Autocomplete } from "@material-ui/lab/";
import axios from "axios";
import * as CONST from "../../utils/consts";
import { TextField } from "@material-ui/core";

const HobbiesForm = () => {
  const [allHobbies, setAllHobbies] = useState([]);

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

  return (
    <div>
      <Autocomplete
        multiple
        id="urban-hobbies"
        freeSolo
        options={allHobbies.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Hobbies"
            margin="normal"
            variant="outlined"
          />
        )}
      />
    </div>
  );
};

export default HobbiesForm;
