import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import LoadingComponent from "./components/Loading";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";

import HobbiesPage from "./pages/HobbiesPage";
import Signup from "./pages/Signup";

import NormalRoute from "./routing-components/NormalRoute";
import ProtectedRoute from "./routing-components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import { getLoggedIn, logout } from "./services/auth";
import * as PATHS from "./utils/paths";
import * as CONSTS from "./utils/consts";
import SingleHobby from "./pages/SingleHobby";

import UserPage from "./pages/UserPage";
import SingleUser from "./pages/SingleUser";
import Messenger from "./pages/messenger/Messenger";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return setIsLoading(false);
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        return setIsLoading(false);
      }
      setUser(res.data.user);
      setIsLoading(false);
    });
  }, []);

  function handleLogout() {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      setUser(null);
      return setIsLoading(false);
    }
    setIsLoading(true);
    logout(accessToken).then((res) => {
      if (!res.status) {
        console.error("Logout was unsuccessful: ", res);
      }
      localStorage.removeItem(CONSTS.ACCESS_TOKEN);
      setIsLoading(false);
      return setUser(null);
    });
  }

  function authenticate(user) {
    setUser(user);
  }

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div className="App">
      <Navbar
        handleLogout={handleLogout}
        user={user}
        authenticate={authenticate}
        setUser={setUser}
      />
      <Switch>
        <NormalRoute exact path={PATHS.HOMEPAGE} component={HomePage} />
        <NormalRoute
          exact
          path={PATHS.SIGNUPPAGE}
          authenticate={authenticate}
          component={Signup}
        />
        <NormalRoute exact path={PATHS.HOBBIES_PAGE} component={HobbiesPage} />

        <NormalRoute
          exact
          path={PATHS.LOGINPAGE}
          authenticate={authenticate}
          component={LogIn}
        />
        <ProtectedRoute
          exact
          path={PATHS.PROFILE_PAGE}
          component={ProfilePage}
          user={user}
          authenticate={authenticate}
          setUser={setUser}
        />

        <ProtectedRoute
          exact
          path={PATHS.USER}
          component={UserPage}
          user={user}
          authenticate={authenticate}
          setUser={setUser}
        />
        <ProtectedRoute
          exact
          user={user}
          path={PATHS.SINGLE_USER}
          component={SingleUser}
          setUser={setUser}
        />
        <ProtectedRoute
          exact
          path={PATHS.MESSENGERS_PAGE}
          component={Messenger}
          user={user}
          authenticate={authenticate}
        />

        <ProtectedRoute
          exact
          path={PATHS.SINGLE_HOBBY}
          component={SingleHobby}
          user={user}
          authenticate={authenticate}
        />
      </Switch>
    </div>
  );
}
