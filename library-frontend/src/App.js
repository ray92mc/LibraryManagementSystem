import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import Home from './components/Home';
import Users from './components/Users';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route path = "/" element={<Layout />}>

        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* private routes */}
        <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']}/>}>
          <Route path='/' element={<Home />} />
        </Route>

        {/* admin routes */}
        <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}>
          <Route path='users' element={<Users />} />

        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />

      </Route>
    </Routes>
  );
}

export default App;
