import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import * as PROFILE_SERVICE from "../../services/profile";
import * as CONSTS from "../../utils/consts";
import Controls from "../controls/Controls";

import { useForm, ProForm } from "../forms/useForm";
import * as neighborhoods from "../../services/neighborhoods";

const Form = (props) => {
  const genderItems = [
    { id: "male", title: "Male" },
    { id: "female", title: "Female" },
    { id: "other", title: "Other" },
  ];
  const { user, authenticate } = props;
  const initialValues = {
    username: user.username,
    gender: user.gender || "other",
    age: "" || user.age,
    postalCode: user.postalCode || "",
    neighborhood: user.neighborhood || "",
    hobbies: user?.hobbies?.length ? user.hobbies : [],
  };
  const [newForm, setNewForm] = useState(initialValues);

  const resetForm = () => {
    setNewForm(initialValues);
  };
  function handleChange(event) {
    //  /console.log(">> " + event.target.name + ">>" + event.target.value);
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    PROFILE_SERVICE.UPDATE_PROFILE(newForm, accessToken)
      .then((response) => {
        authenticate(response.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
    resetForm();
  }

  return (
    <ProForm onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="username"
            label="username"
            value={newForm.username}
            onChange={handleChange}
            // error={errors.userName}
          />

          <Controls.Input
            name="age"
            label="Age"
            value={newForm.age}
            onChange={handleChange}
          />
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={newForm.gender}
            onChange={handleChange}
            items={genderItems}
          />
          <Controls.Select
            name="neighborhood"
            label="Neighborhood"
            value={newForm.neighborhood}
            onChange={handleChange}
            options={neighborhoods.getNeighborhoods()}
            // error={errors.neighborhood}
          />
          <Controls.Input
            name="postalCode"
            label="Postal Code"
            value={newForm.postalCode}
            onChange={handleChange}
          />

          <Controls.AutoComplete
            name="hobbies"
            label="Hobbies"
            value={newForm.hobbies}
            onChange={(e) => setNewForm({ ...newForm, hobbies: e })}

            // error={errors.hobbies}
          />

          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </ProForm>
  );
};

export default Form;
