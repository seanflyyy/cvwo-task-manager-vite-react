import React from 'react';
import {useAppSelector} from '../app/hooks';

const Dashboard: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <div>
      <h1> Dashboard</h1>
      <h1>Status: {auth.loggedInStatus}</h1>
    </div>
  );
};

export default Dashboard;
