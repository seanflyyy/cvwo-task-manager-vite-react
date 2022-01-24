import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {handleLogin, handleLogout} from '../features/auth/auth-slice';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
import MiddlePanel from './MiddlePanel';
import AvatarWidget from '../components/middlePanel/AvatarWidget';
import {Grid} from '@mui/material';

const Home: React.FC = () => {
  const rightPanelOpen = useAppSelector((state) => state.rightPanel);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  /**
   * Checks login status by making a call to log in route.
   */
  function checkLoginStatus() {
    axios.get('http://localhost:3000/logged_in', {withCredentials: true})
        .then((response) => {
          console.log(response.data.logged_in);
          console.log(auth.loggedInStatus);
          if (response.data.logged_in &&
            auth.loggedInStatus === 'NOT_LOGGED_IN') {
            localStorage.setItem('token', response.data.token);
            dispatch(handleLogin(response.data.user));
          } else if (!response.data.logged_in &&
            auth.loggedInStatus === 'LOGGED_IN') {
            dispatch(handleLogout());
            localStorage.removeItem('token');
          } else if (!response.data.logged_in &&
             auth.loggedInStatus === 'NOT_LOGGED_IN') {
            navigate('/login');
          }
        })
        .catch((error) => {
          console.log('check login error', error);
        });
  }


  return (
    <Grid container direction="column">
      <LeftPanel />
      <AvatarWidget />
      <MiddlePanel />
      {rightPanelOpen.rightPanel && <RightPanel />}
    </Grid>
  );
};

export default Home;
