import React, { useState } from "react";
import * as DELETE from "../../services/profile";
import * as CONST from "../../utils/consts";
import { useHistory } from "react-router-dom";

const DeleteProfile = (props) => {
  const { user, authenticate } = props;
  const history = useHistory();
  const [error, setError] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem(CONST.ACCESS_TOKEN);
    DELETE.DELETE_PROFILE(accessToken)
      .then((response) => {
        setError(null);
        if (!response.status) {
          return setError(response);
        }
        history.push("/auth/signup");
        return localStorage.removeItem(CONST.ACCESS_TOKEN);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Are You Sure?</button>
    </form>
  );
};

export default DeleteProfile;
