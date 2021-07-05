import React from "react";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import { green } from "@material-ui/core/colors";
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import useStyles from "./styles";

const Navbar = ({ user, authenticate, setUser, handleLogout }) => {
  const classes = useStyles();

  return (
    <AppBar
      children={setUser}
      className={classes.appBar}
      position="static"
      color="inherit"
    >
      <Link to={PATHS.HOBBIES_PAGE} className={classes.brandContainer}>
        <img
          src="https://res.cloudinary.com/dzxo1mr9i/image/upload/v1624559819/urban-hobbies/cobdvsrkfnqtjwvsxszv.jpg"
          alt="urban hobbies logo"
          width="100"
        />
      </Link>

      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <IconButton label="Urbbies" component={Link} to="/users">
              <PeopleIcon fontSize="large" style={{ color: green[400] }} />
              Urbbies
            </IconButton>

            <Avatar
              className={classes.green}
              alt={user.username}
              src={user.profilePic}
              component={Link}
              to="/profile"
            >
              {user.username.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.name}
            </Typography>

            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={handleLogout}
              startIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            className={classes.login}
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
