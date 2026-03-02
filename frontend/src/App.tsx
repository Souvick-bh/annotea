import { Home } from './Home';
import { Signup } from './pages/SignUp';
import { Login } from './pages/LogIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { GetMemory } from './pages/GetMemory';
import { Navbar } from './components/ui/NavBar';

// bg-linear-to-bl from-[#000000] to-[#3C3D37]
function App() {
 
  return (
    <BrowserRouter>
      <div className='relative bg-[#F4EFE6] min-h-screen flex flex-col'>
        <Navbar />

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
