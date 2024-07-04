
import { Route, Routes } from 'react-router-dom';
import Signin from './components/login/Signin';
import Signup from './components/signup/Signup';
import Home from './components/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer />

      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/' element={<Home/>}/>
      </Routes>
      
      
    </div>
  );
}

export default App;
