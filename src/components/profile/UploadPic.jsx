import React, { useState } from "react";
import axios from "axios";

const UploadPic = ({ user, setUser }) => {
  const [picture, setPicture] = useState(null);

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
        console.log(res);

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
        <button type="submit">Upload your own Picture</button>
      </form>
    </div>
  );
};

export default UploadPic;
