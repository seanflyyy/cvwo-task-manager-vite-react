import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import axios from 'axios';
import {useAppDispatch} from '../../app/hooks';
import {
  handleLogin,
} from '../../features/auth/auth-slice';
import {useNavigate} from 'react-router-dom';
import validator from 'validator';

const theme = createTheme();

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');


  /**
   * Handles form handle submit
   * @param {any} event - Form submit event
   */
  function handleSubmit(event: any) {
    if (isEmailValid()) {
      event.preventDefault();
    } else {
      axios.post('http://localhost:3000/registrations', {
        user: {
          email: formValues.email,
          password: formValues.password,
          password_confirmation: formValues.password_confirmation,
        },
      }, {withCredentials: true},
      ).then((response) => {
        if (response.data.status === 'created') {
          localStorage.setItem('token', response.data.token);
          dispatch(handleLogin(response.data.user));
          navigate('/dashboard');
        } else if (response.data.status == 422) {
          setPasswordError(response.data.error.split(': ')[1]);
        }
      })
          .catch((error) => {
            alert(error);
          });
      event.preventDefault();
    }
  }

  /**
   * Handles textfield change
   * @param {any} event - Form change event
   */
  function handleChange(event: any) {
    if (event.target.name === 'email') {
      event.target.value === '' ?
      setEmailError('') :
      setEmailError(' ');
    } else {
      event.target.value === '' ?
      setPasswordError('') :
      setPasswordError(' ');
    }
    setFormValues({...formValues, [event.target.name]: event.target.value});
  }

  /**
   * Validates email
   * @return {boolean}
   */
  const isEmailValid = () => {
    if (validator.isEmail(formValues.email)) {
      setEmailError(' ');
      return false;
    } else {
      setEmailError('Invalid Email');
      return true;
    }
  };

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={emailError == '' ||
                  emailError === 'Invalid Email'}
                  helperText={emailError === '' ?
                'Empty field' :
                emailError}
                  value={formValues.email}
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formValues.password}
                  name="password"
                  label="Password"
                  error={passwordError !== ' '}
                  helperText={passwordError===''?
                  'Empty field' :
                  passwordError}
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={formValues.password_confirmation}
                  name="password_confirmation"
                  label="Password confirmation"
                  error={passwordError !== ' '}
                  helperText={passwordError===''?
                  'Empty field' :
                  passwordError}
                  type="password"
                  id="password_confirmation"
                  autoComplete="new-password"
                  onChange={handleChange}

                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
            >
              Sign Up
            </Button>

            <Link href="/login" variant="body2">
                  Already have an account? Log In
            </Link>


          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
