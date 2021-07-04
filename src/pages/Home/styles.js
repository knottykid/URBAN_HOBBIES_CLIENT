import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
export default makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/logo/brln.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "fixed",
    backgroundColor: "rgba(11, 156, 49, 0.4)",
    backgroundBlendMode: "darken",
  },
  text: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Nunito",
  },
  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
  colorText: {
    color: "#0b4e10",
  },
  container: {
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: "4.5rem",
  },
  button: {
    margin: theme.spacing(0, 5),
    textTransform: "none",

    backgroundColor: green[500],
  },
}));
