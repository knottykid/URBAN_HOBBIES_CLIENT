import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as CONST from "../utils/consts";
import * as PATHS from "../utils/paths";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const UserPage = (props) => {
  const { user, setUser, authenticate } = props;
  const [allUser, setAllUser] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`${CONST.SERVER_URL}/users`, {
        headers: { authorization: localStorage.getItem(CONST.ACCESS_TOKEN) },
      })
      .then((response) => {
        console.log("NOM", response);
        setAllUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => console.log("au revoir");
  }, []);

  return (
    //!need to add the filter method before the map
    <div>
      {allUser.map((users) => (
        <Grid key={users._id} item xs={12} sm={12} md={3} lg={3}>
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  component={Link}
                  to={`${PATHS.USER}/${users._id}`}
                  variant="rounded"
                  alt="Profile Pic"
                  src={users.profilePic}
                />
              </ListItemAvatar>

              <ListItemText
                primary={users.username}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {users.hobbies.join(", ")}
                    </Typography>
                    <br />
                    <b>{users.neighborhood}</b>
                    <br />
                    <b>{users.postalCode}</b>
                    <br />
                    <b>{user.location}</b>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </Grid>
      ))}
      {/* </Typography> */}
      {/* <Typography variant="h3" component="h2"> */}
      {/* {user.map((members) => (
        <Grid key={members._id} item xs={12} sm={12} md={3} lg={3}>
          {members.username}
          <br />
          {members.neighborhood}
          <br />
          {members.postalCode}
          <br />
          {members.hobbies}
        </Grid>
      ))} */}
      {/* </Typography> */}
    </div>
  );
};

export default UserPage;
