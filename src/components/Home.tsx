import React from 'react';
import {useAppSelector, useAppDispatch} from '../app/hooks';
import Login from './auth/Login';
import Registration from './auth/Registration';
import {handleLogout} from '../features/auth/auth-slice';
import axios from 'axios';

const Home: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  /**
   * Handles the logout button click
   */
  function handleLogoutClick() {
    axios.delete('http://localhost:3000/logout', {withCredentials: true})
        .then((response) => {
          dispatch(handleLogout());
        }).catch((error) => {
          console.log(error);
        });
  }

  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {auth.loggedInStatus}</h1>
      <button onClick={handleLogoutClick}>Logout</button>
      <Registration />
      <Login />
    </div>
  );
};

export default Home;
