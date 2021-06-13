import React, { useState } from "react";
import * as PROFILE_SERVICE from "../../services/profile";
import * as CONSTS from "../../utils/consts";

function UpdateProfile(props) {
  const { user, authenticate } = props;
  const [form, setForm] = useState({
    username: user.username,
    // fullName: user.name,
    // email: "",
    gender: "male",
    age: "",
    location: "Berlin",
    postalCode: "",
    neighborhood: "",
    hobbies: [],
    contacts: [],
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    PROFILE_SERVICE.UPDATE_PROFILE(form, accessToken)
      .then((response) => {
        console.log("response:", response);
        authenticate(response.data.user);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        {/* <input
          name="name"
          placeholder="name"
          value={form.name}
          onChange={handleChange}
        /> */}
        <input
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <input
          name="neighborhood"
          placeholder="Neighborhood"
          value={form.neighborhood}
          onChange={handleChange}
        />
        <input
          name="postalCode"
          placeholder="Postal Code"
          value={form.postalCode}
          onChange={handleChange}
        />
        <input
          name="hobbies"
          placeholder="Hobbies"
          value={form.hobbies}
          onChange={handleChange}
        />
      </div>

      <button>Update Profile</button>
    </form>
  );
}

export default UpdateProfile;
