import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import Home from './pages/Home';
import Users from './pages/Users';
import Admin from './components/Admin';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import Books from './pages/Books';

function App() {

  return (
    <div>
    <Routes>
      <Route path = "/" element={<Layout />}>

        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path='books' element={<Books />} />

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
          <Route path='admin' element={<Admin />} />

        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />

      </Route>
    </Routes>
    </div>
  );
}

export default App;
