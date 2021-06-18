// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import * as CONST from "../utils/consts";
// import { Typography } from "@material-ui/core";
// const UserPage = (props) => {
//   const { user, setUser, authenticate } = props;
//   //   const [user, setUser] = useState({});

//   useEffect(() => {
//     axios
//       .get(`${CONST.SERVER_URL}/user/${props.match.params.userId}`)
//       .then((dynamic) => {
//         setUser(dynamic.data.user);
//       })
//       .catch((err) => {
//         console.log(err.response);
//       });
//   }, []);
//   return (
//     <div>
//       SOMETHING
//       <Typography variant="h3" component="h2">
//         {user.username}
//         {user.neighborhood}
//         {user.postalCode}
//         {user.hobbies}
//       </Typography>
//     </div>
//   );
// };

// export default UserPage;
