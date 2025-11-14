import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage"
import MainPage from './pages/MainPage';
import { PrivateRoute } from './components/PrivateRoute';

import './index.css'

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/main' element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
          } />
        <Route path='*' element={<Navigate to="login" replace/>}/>
      </Routes>
    </div>
  )
}

export default App;
