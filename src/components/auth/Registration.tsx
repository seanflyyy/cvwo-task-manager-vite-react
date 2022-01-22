/* eslint-disable require-jsdoc */

import React from 'react';
import axios from 'axios';
import {useAppDispatch} from '../../app/hooks';
import {
  handleLogin,
} from '../../features/auth/auth-slice';
import {useNavigate} from 'react-router-dom';

const Registration: React.FC = () => {
  const [formValues, setFormValues] = React.useState({
    email: '',
    password: '',
    password_confirmation: '',
    registrationErrors: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  /**
   * Handles form handle submit
   * @param {any} event - Form submit event
   */
  function handleSubmit(event: any) {
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
        console.log('registration res', response);

        dispatch(handleLogin(response.data.user));
        navigate('/dashboard');
      }
    })
        .catch((error) => {
          console.log('registration error', error);
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
        <input
          type="password" name="password_confirmation"
          placeholder="Password confirmation"
          value={formValues.password_confirmation}
          onChange={handleChange}
          required/>

        <button type="submit">Register</button>
      </form>
    </h1>
  </div>;
};

export default Registration;
