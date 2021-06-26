import React, { useState, useEffect } from "react";
import { makeStyles, CssBaseline, Typography, Button } from "@material-ui/core";
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
  const classes = useStyles();
  return (
    <div className={classes.root} id="home">
      <CssBaseline />

      <div className={classes.container}>
        <h1 className={classes.title}>
          Welcome to <br />
          Urban-<span className={classes.colorText}>Hobbies.</span>
        </h1>
        <Typography className={classes.icon}>
          Connect with people in your community
        </Typography>
        <h4 style={{ color: "white", fontSize: "20px" }}>
          {" "}
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
          or
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
        </h4>
      </div>

      {/* <div>
        <HobbiesPage />{" "}
      </div> */}
    </div>
  );
}

export default HomePage;
