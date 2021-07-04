import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  root: {
    width: 180,
    height: 180,
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  container: {
    backgroundColor: theme.palette.grey[100],
  },
  inline: {
    display: "column",
  },
  follows: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    display: "flex",
  },
  button: {
    width: 200,

    margin: theme.spacing(2),
    paddingTop: theme.spacing(1),
  },
  cardContent: {
    textAlign: " flex",
  },
}));
