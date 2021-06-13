import { TextField } from "@material-ui/core";
import React from "react";

export default function Input({ name, label, value, error = null, onChange }) {
  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
}
