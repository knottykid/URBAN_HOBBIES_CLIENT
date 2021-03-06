import React, { useState, useEffect } from "react";
import axios from "axios";
import * as CONST from "../../utils/consts";
import { Link } from "react-router-dom";
import * as PATHS from "../../utils/paths";
import Follow from "../../components/Follow/Follow";
import LoadingComponent from "../../components/Loading";
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
} from "@material-ui/core";
import useStyles from "./styles";

const SingleUser = (props) => {
  const { user, setUser } = props;
  const [dynamicUser, setDynamicUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    return new Promise(async (resolve, reject) => {
      try {
        setIsLoading(true);
        const url = `${CONST.SERVER_URL}/users/${props.match.params.userId}`;
        const headers = {
          authorization: localStorage.getItem(CONST.ACCESS_TOKEN),
        };
        const response = await axios.get(url, { headers });
        setDynamicUser(response.data);
        setIsLoading(false);
        resolve();
      } catch (err) {
        console.log(err.response.data);
        reject(err);
      }
    });
    // im not sure what this part does, since useEffect is never called
    // however using promises is much easier to troubleshoot bugged out code
  }, [props.match.params.userId]);

  if (isLoading) {
    return <LoadingComponent />;
  }
  console.log("DYNAMIC", dynamicUser);

  // const SingleUser = (props) => {
  //   const { user, setUser } = props;
  //   const [dynamicUser, setDynamicUser] = useState({});
  //   const [isLoading, setIsLoading] = useState(true);
  //   const classes = useStyles();

  //   useEffect(() => {
  //     setIsLoading(true);
  //     axios
  //       .get(`${CONST.SERVER_URL}/users/${props.match.params.userId}`, {
  //         headers: { authorization: localStorage.getItem(CONST.ACCESS_TOKEN) },
  //       })
  //       .then((response) => {
  //         setDynamicUser(response.data);
  //       })
  //       .catch((err) => {
  //         console.log(err.response);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }, [props.match.params.userId]);

  //   if (isLoading) {
  //     return <LoadingComponent />;
  //   }
  //   console.log("DYNAMIC", dynamicUser);
  return (
    <div>
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
              alt="userPic"
              width="10%"
              image={dynamicUser.profilePic}
              title={dynamicUser.name}
            />
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <Grid container item s={12} xs={12} md={6} lg={6}>
            <CardContent classes={classes.cardContent}>
              <Typography
                gutterBottom
                className={classes.text}
                variant="h5"
                component="h2"
              >
                {dynamicUser.username}
              </Typography>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
                component="h6"
              >
                Age: {dynamicUser.age}
              </Typography>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
                component="h6"
              >
                Gender: {dynamicUser.gender}
              </Typography>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
                component="h6"
              >
                Hood: {dynamicUser.neighborhood}
              </Typography>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
                component="h6"
              >
                PLZ: {dynamicUser.postalCode}
              </Typography>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
                component="h6"
              >
                City: {dynamicUser.location}
              </Typography>
              <Typography
                className={classes.text}
                variant="h6"
                color="textSecondary"
                component="h6"
              >
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
