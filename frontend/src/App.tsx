import { Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage"
import MainPage from './pages/MainPage';
import ListPage from './pages/ListPage';

import './index.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path='*' element={<LoginPage />}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/lists' element={<ListPage />} />
      </Routes>
    </div>
  )
}

export default App;
