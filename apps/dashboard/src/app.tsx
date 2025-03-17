import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import AccountList from './pages/account/AccountList';
import AccountImport from './pages/account/AccountImport';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/accounts" element={<AccountList />} />
      <Route path="/accounts/import" element={<AccountImport />} />
    </Routes>
  );
};

export default App;
