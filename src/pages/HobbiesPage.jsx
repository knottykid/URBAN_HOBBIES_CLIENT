import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  ButtonBase,
  Card,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import * as PATHS from "../utils/paths";
import * as CONST from "../utils/consts";

import useStyles from "../components/hobbies/styles";

const HobbiesPage = ({ user }) => {
  const [listOfHobbies, setListOfHobbies] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`${CONST.SERVER_URL}/hobbies`)
      .then((response) => {
        setListOfHobbies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => console.log("adios");
  }, []);

  return (
    <div>
      <Card className={classes.card} raise elevation={6}>
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {listOfHobbies.map((hobby) => (
            <Grid key={hobby._id} item xs={12} sm={12} md={3} lg={3}>
              <Link
                to={`${PATHS.HOBBIES_PAGE}/${hobby._id}`}
                style={{ textDecoration: "none", color: "green" }}
              >
                <CardMedia
                  className={classes.media}
                  image={hobby.image}
                  title={hobby.name}
                />

                <h3 style={{ textAlign: "center" }}>{hobby.name}</h3>
              </Link>

              <ButtonBase
                component="span"
                name="test"
                className={classes.cardAction}
                link={`${PATHS.HOBBIES_PAGE}/${hobby._id}`}
              ></ButtonBase>
            </Grid>
          ))}
        </Grid>
      </Card>
    </div>
  );
};

export default HobbiesPage;
