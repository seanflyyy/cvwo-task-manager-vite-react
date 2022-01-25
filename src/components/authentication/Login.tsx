import React, {useState, useEffect} from 'react'; ;
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {
  handleLogin, handleLogout,
} from '../../features/auth/auth-slice';
import axios from 'axios';

const theme = createTheme();

const LogIn: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logInError, setError] = useState('');
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    loginErrors: '',
  });

  useEffect(() => {
    checkLoginStatus();
  });


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
            navigate('/home');
          } else if (!response.data.logged_in &&
            auth.loggedInStatus === 'LOGGED_IN') {
            dispatch(handleLogout());
            localStorage.removeItem('token');
          } else if (response.data.logged_in &&
             auth.loggedInStatus === 'LOGGED_IN') {
            navigate('/home');
          }
        })
        .catch((error) => {
          console.log('check login error', error);
        });
  }
  /**
   * Handles form handle submit
   * @param {any} event - Form submit event
   */
  function handleSubmit(event: any) {
    axios.post('http://localhost:3000/sessions', {
      user: {
        email: formValues.email,
        password: formValues.password,
      },
    }, {withCredentials: true},
    ).then((response) => {
      if (response.data.logged_in) {
        setError('');
        localStorage.setItem('token', response.data.token);
        dispatch(handleLogin(response.data.user));
        navigate('/dashboard');
      } else if (response.data.status === 400) {
        setError('Invalid email or password provided');
      }
    })
        .catch((error) => {
          console.log('login error', error);
        });
    event.preventDefault();
  }

  /**
   * Handles eamil change submit
   * @param {any} event - Form submit event
   */
  function handleChange(event: any) {
    setFormValues({...formValues, [event.target.name]: event.target.value});
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              error={logInError !== ''}
              helperText={logInError}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={logInError !== ''}
              helperText={logInError}
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Login
            </Button>
            <Link href="/signup" variant="body2">
              {'Don\'t have an account? Sign Up'}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LogIn;
