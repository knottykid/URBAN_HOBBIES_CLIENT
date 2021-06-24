import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 5),
    backgroundColor: green[500],
  },
  label: { textTransform: "none" },
}));
const Button = ({ text, size, color, variant, onClick, ...other }) => {
  const classes = useStyles();
  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
