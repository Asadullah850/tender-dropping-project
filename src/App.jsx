import { Outlet } from 'react-router-dom'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
    <ToastContainer autoClose={1000}/>
      <div className='bg-[#4A07DA] h-[calc(100vh-5vh)] w-[98%] mx-auto text-white rounded-md'>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
