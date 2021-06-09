import React from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import {
  Input,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import NeighborhoodForm from "./NeighborhoodForm";
import HobbiesForm from "./HobbiesForm";

const defaultValues = {
  Neighborhood: "",
  gender: "",
  hobbies: "",
  RadioGroup: "",
};

const ProfileForm = () => {
  const { control, handleSubmit, setValue, register } = useForm({
    defaultValues,
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="location"
        control={control}
        defaultValue=""
        render={({ field }) => <Input {...field} />}
      />
      <section>
        <label>Radio Group</label>
        <Controller
          render={({ field }) => (
            <RadioGroup aria-label="gender" {...field}>
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          )}
          name="RadioGroup"
          control={control}
        />
      </section>
      <label>Search your hobby</label>
      <Controller
        name="hobbies"
        control={control}
        render={({ field }) => (
          <Autocomplete {...field}>
            <HobbiesForm />
          </Autocomplete>
        )}
      ></Controller>
      <section></section>
      <Controller
        name="neighborhood"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              {
                value: "Charlottenburg-Wilmersdorf",
                label: "Charlottenburg-Wilmersdorf",
              },
              {
                value: "Friedrichshain-Kreuzberg",
                label: "Friedrichshain-Kreuzberg",
              },
              { value: "Lichtenberg", label: "Lichtenberg" },
              { value: "Mitte", label: "Mitte" },
              { value: "Neukölln", label: "Neukölln" },
              { value: "Pankow", label: "Pankow" },
              { value: "Reinickendorf", label: "Reinickendorf" },
              { value: "Spandau", label: "Spandau" },
              { value: "Steglitz-Zehlendorf", label: "Steglitz-Zehlendorf" },
              { value: "Tempelhof-Schöneberg", label: "Tempelhof-Schöneberg" },
              { value: "Treptow-Köpenick", label: "Treptow-Köpenick" },
            ]}
          />
        )}
      />
      <input type="submit" />
    </form>
  );
};

export default ProfileForm;
