import './App.css';

import React, {useEffect} from 'react';
import * as ContainerClass from './misc/constants';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material';
import {blue, orange} from '@mui/material/colors';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {handleLogout, handleLogin} from './features/auth/auth-slice';
import LogIn from './components/authentication/Login';
import SignUp from './components/authentication/Signup';
import Home from './pages/Home';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});

const App: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  /**
   * Checks login status by making a call to log in route.
   */
  function checkLoginStatus() {
    axios.get(`${ContainerClass.databaseLink}/logged_in`,
        {withCredentials: true})
        .then((response) => {
          if (response.data.logged_in &&
            auth.loggedInStatus === 'NOT_LOGGED_IN') {
            localStorage.setItem('token', response.data.token);
            dispatch(handleLogin(response.data.user));
          } else if (!response.data.logged_in &&
            auth.loggedInStatus === 'LOGGED_IN') {
            dispatch(handleLogout());
            localStorage.removeItem('token');
          } else if (response.data.logged_in &&
            auth.loggedInStatus === 'LOGGED_IN') {
          }
        })
        .catch((error) => {
          console.log('check login error', error);
        });
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path= "*" element={<Navigate to="/login"/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/home" element={<Home/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
