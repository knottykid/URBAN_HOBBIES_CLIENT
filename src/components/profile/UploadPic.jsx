import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      // margin: theme.spacing(1),
      textTransform: "none",
    },
  },
}));
const UploadPic = ({ user, setUser }) => {
  const [picture, setPicture] = useState(null);
  const classes = useStyles();

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!picture) {
      return;
    }
    const formBody = new window.FormData();
    formBody.append("profilePic", picture);
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/uploadPicture/${user._id}`,
        formBody
      )
      .then((res) => {
        setUser({ ...user, profilePic: res.data.picFromServer });
      })
      .catch((err) => console.log(err.response));
  }

  function handleInput(e) {
    const image = e.target.files[0];
    setPicture(image);
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleInput} />
        <Button
          className={classes.root}
          variant="contained"
          color="primary"
          type="submit"
        >
          Push
        </Button>
      </form>
    </div>
  );
};

export default UploadPic;
