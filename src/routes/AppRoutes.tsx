import React from 'react';
import { Route, Routes  } from 'react-router-dom';
import DatabaseListPage from '../pages/DatabaseListPage/DatabaseListPage';
import DatabaseDetailPage from '../pages/DatabaseDetailPage/DatabaseDetailPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" Component={DatabaseListPage} />
      <Route path="/database/:id" Component={DatabaseDetailPage} />
    </Routes>
  );
};

export default AppRoutes;
