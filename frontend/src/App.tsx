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
      <div className='absolute min-h-screen w-full opacity-35 bg-[url("/assets/note.svg")] bg-repeat bg-size-[25px_25px]'></div>
      <div className='relative min-h-screen flex flex-col border-2 border-[#030303]'>
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
