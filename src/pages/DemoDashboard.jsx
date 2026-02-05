import React from 'react';
import { useAuth } from '../context/AuthContext';
import EmployeeDashboard from './EmployeeDashboard';
import BossDashboard from './BossDashboard';

const DemoDashboard = () => {
  const { user } = useAuth();

  if (user?.role === 'boss') {
    return <BossDashboard />;
  }

  return <EmployeeDashboard />;
};

export default DemoDashboard;
