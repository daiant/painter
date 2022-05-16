import './App.scss';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './Layout';
import AuthContext from './context/AuthProvider';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Find from './pages/Find';
import User from './pages/User';
import Favorites from './pages/Favorites';
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/painter/' element={<Home />} />
          <Route path='/painter/login' element={<Login />} />
          <Route path='/painter/product/:clothesId' element={<ProductPage />} />
          <Route path='/painter/find' element={<Find />} />
          <Route path='/painter/favorites' element={
            <RequireAuth>
              <Favorites />
            </RequireAuth>
          } />
          <Route path='/painter/user/' element={
            <RequireAuth>
              <User />
            </RequireAuth>
            }
          />
        </Route>
      </Routes>
      </Router>
    </>  
  );
}
function RequireAuth({children}) {
  let auth = useContext(AuthContext);
  let location = useLocation();
  if(!auth.auth.accessToken) {
    return <Navigate to="/painter/login" state={{from: location}} replace />
  }
  return children;
}

export default App;
