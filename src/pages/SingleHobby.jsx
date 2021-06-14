import React, { useState, useEffect } from "react";
import axios from "axios";
import * as CONST from "../utils/consts";
import * as HOBBIES_SERVICE from "../services/hobbies";
import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import { Paper, Typography, makeStyles } from "@material-ui/core";

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
  const { user, authenticate } = props;
  const [hobby, setHobby] = useState({});
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

  // useEffect(() => {
  //   axios
  //     .get(`${CONST.SERVER_URL}/hobbies/${props.match.params.hobbyId}/join`)
  //     .then((response) => {
  //       console.log("WHATDUP:", response.data.user);
  //       setHobby(response.data.user);
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //     });
  // }, [props.match.params.hobbyId]);

  // const handleSubmission = (e) => {
  //   e.preventDefault();
  //   const accessToken = localStorage.getItem(CONST.ACCESS_TOKEN);
  //   HOBBIES_SERVICE.JOIN_HOBBY(hobby, accessToken)
  //     .then((response) => {
  //       console.log("response:", response);
  //       authenticate(response.data.user);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };
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
        {/* <img src={hobby.image} alt="hobby" />
      <h1>{hobby.name}</h1>
      <h3>{hobby.description}</h3> */}
        {/* <button onClick={handleSubmission}>Join</button>

      {/* <ul>
        <li>{hobby.members}</li>
      </ul> */}
      </div>
    </Paper>
  );
};

export default SingleHobby;
