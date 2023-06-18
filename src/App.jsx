import { Outlet } from 'react-router-dom'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
    <ToastContainer autoClose={1000}/>
      <div className='bg-[#4A07DA] h-screen w-[98%] mx-auto text-white'>
        <div className="">
          app.js
        </div>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
