import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import RegisterPage from './component/auth/RegisterPage';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='content'>
          <Routes>
            <Route path='/register' element={<RegisterPage />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
