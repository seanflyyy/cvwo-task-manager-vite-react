import './App.css';
import StyledPage from './pages/StyledPage';

import React from 'react';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {createTheme, ThemeProvider} from '@mui/material';
import {blue, orange} from '@mui/material/colors';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import axios from 'axios';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {handleLogout, handleLogin} from './features/auth/auth-slice';
import LogIn from './components/auth/Login';
import SignUp from './components/auth/Signup';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
});

const App: React.FC = () => {
  const [counter, setCounter] = React.useState(0);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  if (counter == 0) {
    checkLoginStatus();
    setCounter(1);
  }

  /**
   * Checks login status by making a call to log in route.
   */
  function checkLoginStatus() {
    axios.get('http://localhost:3000/logged_in', {withCredentials: true})
        .then((response) => {
          if (response.data.logged_in &&
            auth.loggedInStatus === 'NOT_LOGGED_IN') {
            localStorage.setItem('token', response.data.token);
            dispatch(handleLogin(response.data.user));
          } else if (!response.data.logged_in &&
            auth.loggedInStatus === 'LOGGED_IN') {
            dispatch(handleLogout());
            localStorage.removeItem('token');
          } else {
            localStorage.setItem('token', response.data.token);
            dispatch(handleLogin(response.data.user));
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
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            // {/* <Route path="/styled" element={<StyledPage />} /> */}
            // {/* <Route path="/" element={<StyledPage />} /> */}
            // {/* <Route path="/" element={<Home />} /> */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
