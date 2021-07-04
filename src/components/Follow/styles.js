import { makeStyles } from "@material-ui/core";
import { green, orange } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  follow: {
    textTransform: "none",

    backgroundColor: green[500],
  },
  unFollow: {
    margin: theme.spacing(0, 5),
    textTransform: "none",

    backgroundColor: orange[500],
  },
}));
