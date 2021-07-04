import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    width: 180,
    height: 180,
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(0),
  },

  button: {
    margin: theme.spacing(1),

    alignItems: "center",
    justifyContent: "center",
    textTransform: "none",
  },
  container: {
    backgroundColor: theme.palette.grey[100],
  },
  cardContent: {
    textAlign: " flex",
  },
}));
