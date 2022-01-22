import React from 'react';
import {useAppSelector} from '../app/hooks';
import Login from './auth/Login';
import Registration from './auth/Registration';


const Home: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {auth.loggedInStatus}</h1>
      <Registration />
      <Login />
    </div>
  );
};

export default Home;
