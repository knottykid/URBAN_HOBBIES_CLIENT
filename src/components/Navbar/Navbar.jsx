import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import UserPage from "../../pages/UserPage";

const Navbar = (props) => {
  const [noUser, setNoUser] = useState(false);
  const { user, authenticate, setUser } = props;
  const classes = useStyles();

  return (
    <AppBar
      children={setUser}
      className={classes.appBar}
      position="static"
      color="inherit"
    >
      <Link to={PATHS.HOMEPAGE} className={classes.brandContainer}>
        {CONSTS.CAPITALIZED_APP}
      </Link>
      {/* <Link to={PATHS.SINGLE_USER}>Users</Link> */}
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
              {props.user?.name}
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
