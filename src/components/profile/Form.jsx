import { Grid } from "@material-ui/core";
import React from "react";
import * as PROFILE_SERVICE from "../../services/profile";
import * as CONSTS from "../../utils/consts";
// import Control from "react-select/src/components/Control";
import Controls from "../controls/Controls";

import { useForm, ProForm } from "../forms/useForm";
import * as neighborhoods from "../../services/neighborhoods";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "Female", title: "Female" },
  { id: "other", title: "Other" },
];

const initialValues = {
  fullName: "",
  email: "",
  gender: "",
  age: Number,
  location: "",
  postalCode: Number,
  neighborhood: "",
  hobbies: "",
  contacts: [],
  //   isMember: false,
};

const Form = ({ user, authenticate }) => {
  const { values, handleInputChange } = useForm(initialValues);
  function handleSubmit(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    PROFILE_SERVICE.FILL_FORM(values, accessToken)
      .then((response) => {
        console.log("response:", response);
        authenticate(response.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <ProForm onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Full Name"
            value={values.fullName}
            onChange={handleInputChange}
          />
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="age"
            label="Age"
            value={values.age}
            onChange={handleInputChange}
          />
          <Controls.Input
            name="postalCode"
            label="Postal Code"
            value={values.postalCode}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Select
            name="neighborhood"
            label="Neighborhood"
            value={values.neighborhood}
            onChange={handleInputChange}
            options={neighborhoods.getNeighborhoods()}
          />
          <Controls.AutoComplete
            name="hobbies"
            label="Hobbies"
            value={values.hobbies}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" />
          </div>
        </Grid>
      </Grid>
    </ProForm>
  );
};

export default Form;
