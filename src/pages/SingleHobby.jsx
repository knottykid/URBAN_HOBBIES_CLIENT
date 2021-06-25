import React, { useState, useEffect } from "react";
import axios from "axios";
import * as CONST from "../utils/consts";
import * as HOBBIES_SERVICE from "../services/hobbies";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import {
  Paper,
  Typography,
  makeStyles,
  Grid,
  ListItemText,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "600px",
  },
  card: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  imageSection: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
}));
const SingleHobby = (props) => {
  const { user, setUser, authenticate } = props;
  const [hobby, setHobby] = useState({});
  const [allUser, setAllUser] = useState([]);
  const classes = useStyles();

  //   const showHobby = (hob) => {
  //     setHobby(hob);
  //   };

  useEffect(() => {
    axios
      .get(`${CONST.SERVER_URL}/hobbies/${props.match.params.hobbyId}`)
      .then((response) => {
        console.log("response", response);
        setHobby(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [props.match.params.hobbyId]);

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
  // console.log("ALLOW", allUser[0].hobbies[0]);
  // console.log("COH", hobby.name);
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {hobby.name}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {hobby.description}
          </Typography>
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={hobby.image} alt={hobby.name} />
        </div>
        <>
          {allUser?.map((users) =>
            users?.hobbies[0] === hobby.name ? (
              <Grid key={users?._id} item xs={12} sm={12} md={3} lg={3}>
                <List className={classes.root}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        component={Link}
                        to={`${PATHS.USER}/${users._id}`}
                        variant="circular"
                        alt="Profile Pic"
                        src={users?.profilePic}
                      />
                      <ListItemText>{users?.username}</ListItemText>
                    </ListItemAvatar>
                  </ListItem>
                </List>
              </Grid>
            ) : null
          )}
        </>
      </div>
    </Paper>
  );
};

export default SingleHobby;
