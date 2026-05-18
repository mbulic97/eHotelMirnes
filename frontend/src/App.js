import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RegisterPage from './component/auth/RegisterPage';
import LoginPage from './component/auth/LoginPage';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='content'>
          <Routes>
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
