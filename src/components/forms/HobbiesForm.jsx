import React, { useState, useEffect } from "react";
// import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab/";
// import { Controller } from "react-hook-form";
// import hobbies from "../../pages/HobbiesPage"
import axios from "axios";
import * as CONST from "../../utils/consts";
import { TextField } from "@material-ui/core";

const HobbiesForm = () => {
  const [allHobbies, setAllHobbies] = useState([]);

  useEffect(() => {
    axios
      .get(`${CONST.SERVER_URL}/hobbies`)
      .then((response) => {
        setAllHobbies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => console.log("Schuss");
    // getHobbies();
  }, []);

  return (
    <div>
      {/* {allHobbies.map((hobbies) => {
        return (
          <section key={hobbies.id}>
            {" "}
            <h3>{hobbies.name}</h3>
          </section>

          // value={hobbies}
          // onChange={(e) => setAllHobbies(e.currentTarget.value)}
        );
      })} */}
      <Autocomplete
        multiple
        id="urban-hobbies"
        freeSolo
        options={allHobbies.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Hobbies"
            margin="normal"
            variant="outlined"
          />
        )}
      />
    </div>
  );
};

//   useEffect(() => {
//     axios.get(`${CONST.SERVER_URL}/hobbies`).then((res) => {
//       setAllHobbies(res.data);
//     });
//   });

//   allHobbies.map((hobbies) => {
//     return (
//       <section key={hobbies._id}>
//         <h2>{hobbies.name}</h2>
//       </section>
//     );
//   });

//   return (
//     <Controller
//       render={({ field }) => (
//         <Autocomplete
//           {...field}
//           options={allHobbies}
//           getOptionLabel={(option) => option.label}
//           renderOption={(option) => (
//             <span>
//               {urbanHobbies(option.code)}
//               {option.label}
//             </span>
//           )}
//           renderInput={(params) => (
//             <TextField {...params} label="Choose a hobby" variant="outlined" />
//           )}
//           onChange={(_, data) => field.onChange(data)}
//         />
//       )}
//       name="hobby"
//       control={control}
//     />
//   );
// };

// function urbanHobbies(hobby) {
//   return typeof String.fromCodePoint !== "undefined"
//     ? hobby
//         .toUpperCase()
//         .replace(/./g, (char) =>
//           String.fromCodePoint(char.charCodeAt(0) + 127397)
//         )
//     : hobby;
// }

export default HobbiesForm;
