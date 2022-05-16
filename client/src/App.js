import './App.scss';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Layout from './Layout';
import AuthContext from './context/AuthProvider';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Find from './pages/Find';
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
        </Route>
      </Routes>
      </Router>
    </>  
  );
}
function ProtectedPage() {
  return <h2>ProtectedPage</h2>
}

function RequireAuth({children}) {
  let auth = useContext(AuthContext);
  let location = useLocation();
  console.log(auth.auth)
  if(!auth.auth.accessToken) {
    return <Navigate to="/painter/login" state={{from: location}} replace />
  }
  return children;
}

export default App;
