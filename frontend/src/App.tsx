import { Home } from './Home';
import { Signup } from './pages/SignUp';
import { Login } from './pages/LogIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { GetMemory } from './pages/GetMemory';


function App() {
 
  return (
    <BrowserRouter>
      <div className='relative bg-linear-to-bl from-[#000000] to-[#3C3D37] min-h-screen flex'>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/memory/:ucode' element={<GetMemory/>} />
        </Routes>
        
      </div>
    </BrowserRouter>
  )
}

export default App
