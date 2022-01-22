/* eslint-disable require-jsdoc */

import React from 'react';
import axios from 'axios';
import {useAppDispatch} from '../../app/hooks';
import {
  handleLogin,
} from '../../features/auth/auth-slice';
import {useNavigate} from 'react-router-dom';

const Login: React.FC = () => {
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
    loginErrors: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        console.log('res from login', response);
        localStorage.setItem('token', response.data.jwt);

        dispatch(handleLogin(response.data.user));
        navigate('/dashboard');
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

  // eslint-disable-next-line require-jsdoc
  return <div>
    <h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email" name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
          required/>
        <input
          type="password" name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
          required/>

        <button type="submit">Login</button>
      </form>
    </h1>
  </div>;
};

export default Login;
