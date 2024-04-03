import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/admin/login/AdminLogin';
import UserLogin from './components/user/login/UserLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/user/login' element={<UserLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
