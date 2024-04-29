import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/admin/login/AdminLogin';
import UserLogin from './components/user/login/UserLogin';
import UserProfile from './components/user/profile/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/user/profile' element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
