import React, { useState, useEffect } from "react";
import {
  makeStyles,
  CssBaseline,
  Typography,
  Button,
  Collapse,
} from "@material-ui/core";
import CollectionsIcon from "@material-ui/icons/Collections";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import HobbiesPage from "./HobbiesPage";
import { Link } from "react-router-dom";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
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

function HomePage() {
  const [checked, setChecked] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="home">
      <CssBaseline />
      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br />
            Urban-<span className={classes.colorText}>Hobbies.</span>
          </h1>
          <Typography className={classes.icon}>
            Connect with <span style={{ color: "#fdee00" }}>People</span> in
            your <span style={{ color: "#fdee00" }}>Community</span>
          </Typography>
          <h4 style={{ color: "#fff", fontSize: "20px" }}>
            <p>
              Check the
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/hobbies"
                className={classes.button}
                startIcon={<CollectionsIcon />}
              >
                Hobbies
              </Button>{" "}
              or just
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/auth/signup"
                className={classes.button}
                startIcon={<TagFacesIcon />}
              >
                Sign Up
              </Button>
            </p>
          </h4>
        </div>
      </Collapse>
    </div>
  );
}

export default HomePage;
