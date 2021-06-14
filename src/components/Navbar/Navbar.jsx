import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to={PATHS.HOMEPAGE} className={classes.brandContainer}>
        {CONSTS.CAPITALIZED_APP}
      </Link>
      <Toolbar className={classes.toolbar}>
        {props.user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={props.user?.username}
              src={props.user?.profilePic}
              component={Link}
              to="/profile"
            >
              {props.user?.username.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {props.user?.username}
            </Typography>

            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={props.handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth/login"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
