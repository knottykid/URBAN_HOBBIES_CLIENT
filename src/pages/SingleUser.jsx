import React, { useState, useEffect } from "react";
import axios from "axios";
import * as CONST from "../utils/consts";
import * as USERS_SERVICE from "../services/user";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import Follow from "../components/users/Follow";
import LoadingComponent from "../components/Loading";
import {
  Card,
  Grid,
  Typography,
  Container,
  CardActionArea,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CssBaseline,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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

    // alignItems: "center",
    // justifyContent: "center",
  },
}));
const SingleUser = (props) => {
  const { user, setUser } = props;
  const [dynamicUser, setDynamicUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${CONST.SERVER_URL}/users/${props.match.params.userId}`, {
        headers: { authorization: localStorage.getItem(CONST.ACCESS_TOKEN) },
      })
      .then((response) => {
        console.log("RESPUESTA", response);
        setDynamicUser(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.match.params.userId]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <CssBaseline />
      <Container
        className={classes.container}
        component="main"
        xs={12}
        s={12}
        md={3}
        lg={3}
      >
        <Grid className={classes.button} raise elevation={3}>
          <Follow userId={dynamicUser._id} user={user} setUser={setUser} />
        </Grid>
        <Card className={classes.root} raise elevation={3}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="user Pic"
              width="10%"
              image={dynamicUser.profilePic}
              title={dynamicUser.name}
            />
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <Grid container item s={12} xs={12} md={6} lg={6}>
            <CardContent classes={classes.CardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {dynamicUser.username}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h6">
                Age: {dynamicUser.age}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h6">
                Gender: {dynamicUser.gender}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h6">
                Hood: {dynamicUser.neighborhood}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h6">
                PLZ: {dynamicUser.postalCode}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h6">
                City: {dynamicUser.location}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h6">
                Hobbies: {dynamicUser.hobbies?.join(", ")}
              </Typography>
              <div className={classes.avatar}>
                <Typography variant="h6" component="h6">
                  Following:
                </Typography>
                {dynamicUser?.following?.map((users) =>
                  dynamicUser.following ? (
                    <Grid key={users?._id} item xs={12} sm={12} md={3} lg={3}>
                      <List className={classes.follow}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar
                              component={Link}
                              to={`${PATHS.USER}/${users._id}`}
                              variant="circular"
                              alt="Profile Pic"
                              src={users?.profilePic}
                            />
                            <ListItemText>
                              {users?.username.slice(0, 5)}
                            </ListItemText>
                          </ListItemAvatar>
                        </ListItem>
                      </List>
                    </Grid>
                  ) : null
                )}
              </div>
              <div className={classes.avatar}>
                <Typography variant="h6" component="h6">
                  Followers:
                </Typography>
                {dynamicUser?.followers?.map((users) =>
                  dynamicUser.followers ? (
                    <Grid key={users?._id} item xs={12} sm={12} md={3} lg={3}>
                      <List className={classes.follow}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar
                              component={Link}
                              to={`${PATHS.USER}/${users._id}`}
                              variant="circular"
                              alt="Profile Pic"
                              src={users?.profilePic}
                            />
                            <ListItemText>
                              {users?.username.slice(0, 5)}
                            </ListItemText>
                          </ListItemAvatar>
                        </ListItem>
                      </List>
                    </Grid>
                  ) : null
                )}
              </div>
            </CardContent>
          </Grid>
        </Card>
      </Container>
    </div>
  );
};

export default SingleUser;
