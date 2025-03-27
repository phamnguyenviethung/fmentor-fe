import { Authenticated } from '@refinedev/core';
import { ThemedLayoutV2 } from '@refinedev/mui';
import { NavigateToResource } from '@refinedev/react-router';
import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import AccountDetail from './pages/account/AccountDetail';
import AccountImport from './pages/account/AccountImport';
import AccountList from './pages/account/AccountList';
import ProjectDetail from './pages/project/ProjectDetail';
import ProjectList from './pages/project/ProjectList';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Login route - must be outside authenticated routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes with layout */}
      <Route
        element={
          <Authenticated key="authenticated-routes" redirectOnFail="/login">
            <ThemedLayoutV2>
              <Outlet />
            </ThemedLayoutV2>
          </Authenticated>
        }
      >
        <Route index element={<Home />} />
        <Route path="/accounts" element={<AccountList />} />
        <Route path="/accounts/import" element={<AccountImport />} />
        <Route path="/accounts/:id" element={<AccountDetail />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Route>

      {/* Catch-all route to redirect to accounts if authenticated */}
      <Route
        path="*"
        element={
          <Authenticated key="auth-pages" fallback={<Navigate to="/login" />}>
            <NavigateToResource resource="accounts" />
          </Authenticated>
        }
      />
    </Routes>
  );
};

export default App;
