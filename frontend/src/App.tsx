import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/LoginPage';
import './index.css'

function App() {
  return (
    <div>
      <Routes>
        <Route path='*' element={<MainPage />}/>
        <Route path='/login' element={<MainPage />} />
      </Routes>
    </div>
  )
}

export default App;
