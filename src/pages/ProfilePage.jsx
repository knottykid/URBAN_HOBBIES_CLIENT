import React, { useState } from "react";
import UploadPic from "../components/profile/UploadPic";
import LoadingComponent from "../components/Loading";
import Form from "../components/profile/Form";
import {
  makeStyles,
  Paper,
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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteProfile from "../components/profile/DeleteProfile";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Popup from "../components/controls/Popup";
import Controls from "../components/controls/Controls";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 320,
  },
  pageContent: {
    margin: theme.spacing(5),
    marginBottom: theme.spacing(5),
    paddingLeft: theme.spacing(50),
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: theme.spacing(1),
    // padding: theme.spacing(1),
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default function ProfilePage({ user, authenticate, setUser }) {
  const [displayUpdateProfile, setDisplayUpdateProfile] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
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
    // <div className={classes.root}>
    <Paper elevation={5} className={classes.pageContent}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={`Profile  for ${user.username}`}
            width="20"
            image={user.profilePic}
            title="Profile Picture"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Welcome to your profile {user.username}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="b">
              <ul>
                <li>Age: {user.age}</li>
                <li>Gender: {user.gender}</li>
                <li>Hood: {user.neighborhood}</li>
                <li>PLZ: {user.postalCode}</li>
                <li> City: {user.location}</li>
                <li> Hobbies:{user.hobbies?.join(", ")}</li>
              </ul>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing={false}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            className={classes.button}
            onClick={handleClickOpen}
            startIcon={<PersonPinIcon />}
          >
            Update
          </Button>

          <Dialog
            open={openPopup}
            onClose={handleClose}
            maxWidth="md"
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Update</DialogTitle>
            <DialogContent divider>
              <Form user={user} authenticate={authenticate} />
            </DialogContent>
            <DialogActions>
              <Controls.Button text="Close" onClick={handleClose} />
            </DialogActions>
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
      </Card>
    </Paper>
    // </div>
  );
}
