import React, { useState } from "react";
import UploadPic from "../components/profile/UploadPic";

import Form from "../components/profile/Form";
import {
  IconButton,
  makeStyles,
  Paper,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteProfile from "../components/profile/DeleteProfile";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Popup from "../components/controls/Popup";
import Controls from "../components/controls/Controls";
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default function ProfilePage({ user, authenticate, setUser }) {
  const [displayUpdateProfile, setDisplayUpdateProfile] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  //   const [displayUpdatePassword, setDisplayUpdatePassword] = useState(false);
  const [picture, setPicture] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  function profileToggle() {
    setDisplayUpdateProfile(!displayUpdateProfile);
  }

  function pictureToggle() {
    setPicture(!picture);
  }

  function deleteToggle() {
    setDeleteUser(!deleteUser);
  }
  //   function passwordToggle() {
  //     setDisplayUpdatePassword(!displayUpdatePassword);
  //   }

  //  if there is no user, you should be redirected to /login
  // A "middleware" that is going to check if you are validated or not
  return (
    <div>
      <Paper className={classes.pageContent} styles={{ alignItems: "center" }}>
        <img
          // src="https://img-premium.flaticon.com/png/512/18/18601.png?token=exp=1622906968~hmac=f89283fb70e3665786609281a919a38e"
          src={user.profilePic}
          width="200px"
          alt={`Profile  for ${user.username}`}
        />
        <h2>Hi, {user.username}</h2>
        {/* <h2>{user.name}</h2> */}
        <h3>Age: {user.age}</h3>
        <h3>Gender: {user.gender}</h3>
        <h3>Hood: {user.neighborhood}</h3>
        <h3>PLZ: {user.postalCode}</h3>
        <h3>City: {user.location}</h3>
        <h3>Hobbies:{user.hobbies?.join(", ")}</h3>
      </Paper>
      <div>
        <Tooltip title="Update">
          <IconButton aria-label="person" onClick={handleClickOpen}>
            <PersonPinIcon fontSize="large" />
            Update your profile{" "}
          </IconButton>
        </Tooltip>

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

        <Tooltip title="Photo">
          <IconButton aria-label="photo" onClick={pictureToggle}>
            <AddAPhotoIcon fontSize="large" />
            Upload a new Profile Pic
          </IconButton>
        </Tooltip>
        {picture && <UploadPic user={user} setUser={setUser} />}

        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteToggle}>
            <DeleteIcon fontSize="large" />
            Delete Account
          </IconButton>
        </Tooltip>
        {deleteUser && (
          <DeleteProfile user={user} authenticate={authenticate} />
        )}

        {/* <Controls.Button
          text="click me"
          variant="outlined"
          onClick={handleClickOpen}
        /> */}

        {/* <openPopup openPopup={openPopup} setOpenPopup={setOpenPopup}>
          <Paper className={classes.pageContent}>
            <Form user={user} authenticate={authenticate} />
          </Paper>
        </openPopup> */}
      </div>
    </div>
  );
}
