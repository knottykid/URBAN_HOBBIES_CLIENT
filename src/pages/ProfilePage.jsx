import React, { useState } from "react";

import UpdateProfile from "../components/profile/UpdateProfile";
import UploadPic from "../components/profile/UploadPic";
// import ProfileForm from "../components/profile/ProfileForm";
import Form from "../components/profile/Form";
import { makeStyles, Paper } from "@material-ui/core";
// import { UserContext, useUser } from "../context/User.context";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
    alignItems: "center",
    justifyContent: "center",
  },
}));
export default function ProfilePage({ user, authenticate }) {
  const [displayUpdateProfile, setDisplayUpdateProfile] = useState(false);
  //   const [displayUpdatePassword, setDisplayUpdatePassword] = useState(false);
  const classes = useStyles();
  function profileToggle() {
    setDisplayUpdateProfile(!displayUpdateProfile);
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
        <h3>Hobbies:{user.hobbies}</h3>
      </Paper>
      <div>
        <button onClick={profileToggle}>Update profile</button>

        {/* {displayUpdateProfile ? <UpdateProfile /> : null} */}
        {displayUpdateProfile && (
          <Paper className={classes.pageContent}>
            <Form user={user} authenticate={authenticate} />
          </Paper>
        )}
        <br />
        <button onClick={profileToggle}>Upload Picture</button>
        <UploadPic user={user} authenticate={authenticate} />
        <br />
        {/* <button onClick={profileToggle}>Fill out the Form</button>
        <ProfileForm user={user} authenticate={authenticate} /> */}

        <button>Delete Account</button>
      </div>
    </div>
  );
}
