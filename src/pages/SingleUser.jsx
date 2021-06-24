import React, { useState, useEffect } from "react";
import axios from "axios";
import * as CONST from "../utils/consts";
import * as USERS_SERVICE from "../services/user";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import Follow from "../components/users/Follow";
import LoadingComponent from "../components/Loading";
import { Card, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(2, 20),
    padding: theme.spacing(1),
  },
}));
const SingleUser = (props) => {
  const { user, authenticate, setUser } = props;
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
  console.log("NIRVANA", dynamicUser.followers);
  console.log("AIC", dynamicUser.followers[0].username);
  return (
    <div>
      <Card className={classes.card} raise elevation={9}>
        <Grid spacing={1}>
          <div>
            <Follow userId={dynamicUser._id} user={user} setUser={setUser} />
          </div>
          <br />
          <img src={dynamicUser.profilePic} alt="pic of the user" width="200" />
          <Typography variant="h6" align="center">
            {dynamicUser.username}
          </Typography>
          <Typography variant="h6" align="center">
            {dynamicUser.neighborhood}
          </Typography>
          <Typography variant="h6" align="center">
            {dynamicUser.postalCode}
          </Typography>
          <Typography variant="h6" align="center">
            {dynamicUser.location}
          </Typography>

          <Typography variant="h6" align="center">
            {dynamicUser.hobbies?.join(", ")}
          </Typography>
          <br />

          <Typography variant="h6" align="center">
            Following:{" "}
          </Typography>
          {dynamicUser?.following?.map((e) => {
            return (
              <div key={e._id}>
                <img src={e?.profilePic} alt="following" width="50" />
                <br />
                <Typography variant="h6" align="center">
                  {e?.username?.split(", ")}
                </Typography>
              </div>
            );
          })}
          <>
            <Typography variant="h6" align="center">
              Followers:{" "}
            </Typography>
            {dynamicUser?.followers?.map((e) => {
              return (
                <div key={e._id}>
                  <img src={e?.profilePic} alt="followers" width="50" />
                  <br />
                  <Typography variant="h6" align="center">
                    {" "}
                    {e?.username}
                  </Typography>
                </div>
              );
            })}
          </>
        </Grid>
      </Card>
    </div>
  );
};

export default SingleUser;
