import React from 'react';
import SignIn from './SignIn';
import { useTitle } from '../hooks/useTitle';

const AdminSignIn = () => {
  useTitle('Admin Sign In');

  return (
    <SignIn
      useEmail={false}
      title="Admin"
      subtitle=""
      showSignUpLink={false}
    />
  );
};

export default AdminSignIn;
