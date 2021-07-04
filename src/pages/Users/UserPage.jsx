import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as CONST from "../../utils/consts";
import * as PATHS from "../../utils/paths";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Container,
} from "@material-ui/core";

import Avatar from "@material-ui/core/Avatar";
import useStyles from "./styles";

const UserPage = (props) => {
  const { user, setUser, authenticate } = props;
  const [allUser, setAllUser] = useState([]);
  const classes = useStyles();
  console.log("++", user.neighborhood);

  useEffect(() => {
    axios
      .get(`${CONST.SERVER_URL}/users`, {
        headers: { authorization: localStorage.getItem(CONST.ACCESS_TOKEN) },
      })
      .then((response) => {
        setAllUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => console.log("au revoir");
  }, []);
  console.log("ALL", allUser);
  return (
    <div>
      {allUser.map((users) =>
        (user.neighborhood === users.neighborhood && user._id !== users._id) ||
        (user.hobbies === users.hobbies && user._id !== users._id) ? (
          <div key={users._id}>
            {" "}
            <Container
              className={classes.container}
              component="main"
              xs={12}
              s={12}
              md={3}
              lg={3}
            >
              <Grid item xs={12} sm={12} md={3} lg={3}>
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
            </Container>
          </div>
        ) : null
      )}
    </div>
  );
};

export default UserPage;
