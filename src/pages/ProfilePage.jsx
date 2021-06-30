import React, { useState } from "react";
import UploadPic from "../components/profile/UploadPic";
import LoadingComponent from "../components/Loading";
import Form from "../components/profile/Form";
import {
  makeStyles,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteProfile from "../components/profile/DeleteProfile";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Popup from "../components/Popup";
import Controls from "../components/controls/Controls";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 180,
    height: 180,
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    margin: theme.spacing(1),
    padding: theme.spacing(0),
  },

  button: {
    margin: theme.spacing(1),

    alignItems: "center",
    justifyContent: "center",
    textTransform: "none",
  },
  container: {
    backgroundColor: theme.palette.grey[100],
  },
  cardContent: {
    textAlign: " flex",
  },
}));
export default function ProfilePage({ user, authenticate, setUser }) {
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [picture, setPicture] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  function pictureToggle() {
    setPicture(!picture);
  }

  function deleteToggle() {
    setDeleteUser(!deleteUser);
  }

  if (isLoading) {
    return <LoadingComponent />;
  }
  //  if there is no user, you should be redirected to /login
  // A "middleware" that is going to check if you are validated or not
  return (
    <>
      <Container
        className={classes.container}
        component="main"
        xs={12}
        s={12}
        md={3}
        lg={3}
      >
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={`Profile  for ${user.username}`}
              width="10%"
              image={user.profilePic}
              title="Profile Picture"
            />
          </CardActionArea>
        </Card>
        <Card className={classes.card}>
          <Grid container item s={12} xs={12} md={6} lg={6}>
            <CardContent classes={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Welcome to your profile {user.username}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h5">
                <h5>Age: {user.age}</h5>
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h5">
                <h5>Gender: {user.gender}</h5>
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h5">
                <h5>Hood: {user.neighborhood}</h5>
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h5">
                <h5>PLZ: {user.postalCode}</h5>
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h5">
                <h5> City: {user.location}</h5>
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h5">
                <h5> Hobbies:{user.hobbies?.join(", ")}</h5>
              </Typography>
            </CardContent>
          </Grid>
        </Card>
        <br />
        <Card className={classes.card}>
          <Grid item xs={12}>
            <CardActions disableSpacing={false}>
              <Button
                variant="contained"
                color="primary"
                component="span"
                className={classes.button}
                onClick={handleClickOpen}
                startIcon={<PersonPinIcon />}
              >
                Hobbies & Hoods
              </Button>

              <Dialog
                open={openPopup}
                onClose={handleClose}
                maxWidth="md"
                aria-labelledby="form-dialog-title"
              >
                <DialogActions>
                  <Controls.Button
                    text="Close After Submit"
                    onClick={handleClose}
                    color="secondary"
                  />
                </DialogActions>
                <DialogTitle id="form-dialog-title">
                  Fill Out The Form
                </DialogTitle>

                <DialogContent divider>
                  <Form user={user} authenticate={authenticate} />
                </DialogContent>
              </Dialog>

              <Button
                variant="contained"
                color="primary"
                component="span"
                className={classes.button}
                onClick={pictureToggle}
                startIcon={<AddAPhotoIcon />}
              >
                Upload
              </Button>
              {picture && <UploadPic user={user} setUser={setUser} />}

              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={deleteToggle}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
              {deleteUser && (
                <DeleteProfile user={user} authenticate={authenticate} />
              )}
            </CardActions>
          </Grid>
        </Card>
      </Container>
    </>
    // </Paper>
    // </div>
  );
}
