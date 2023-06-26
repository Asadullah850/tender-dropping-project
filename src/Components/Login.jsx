import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Pagetitle from './Pagetitle';
import GoogleButton from './Share/GoogleButton';


const Login = () => {
    const [select, setSelect] = useState(false)
    const [status, setStatus] = useState('')
    const navigate = useNavigate()
    // data.preventDefault()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        setSelect(true)
        setStatus(data.status)
    };

    return (
        <div className='text-center mx-10'>
            <Pagetitle title={'Login'}></Pagetitle>
            <form className='lg:w-[60%] mx-auto my-2' onSubmit={handleSubmit(onSubmit)}>
                <p className=' text-left p-2 text-lg font-semibold lg:ml-5'>Your Email</p>
                <input className=' text-black w-full lg:w-[90%] p-2 rounded-md font-semibold' type="text" placeholder="name" {...register("name", { required: true })} />
                {errors.name?.type === "required" && (
                    <p role="alert">Name is required</p>
                )} 
                <p className=' text-left p-2 text-lg font-semibold lg:ml-5'>Password</p>
                <input className=' text-black w-full lg:w-[90%] p-2 rounded-md font-semibold' type="password" placeholder="Password" {...register("Password", {required: true, 
                    min: 8, 
                    maxLength: 20, 
                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}/
                })} />
                {errors.password?.type === 'required' && <p className='text-white p-0' role="alert">Password is required</p>}
                    {errors.password?.type === 'min' && <p className='text-white p-0' role="alert">Password is upper 8</p>}
                    {errors.password?.type === 'maxLength' && <p className='text-white p-0' role="alert">Password is less then 20</p>}
                    {errors.password?.type === 'pattern' && <p className='text-white p-0' role="alert">Password are pattern (Aa123@.com)</p>}
                <input className='btn btn-sm btn-success mt-2' type="submit" />
            </form>
            <GoogleButton></GoogleButton>
        </div>
    );
};

export default Login;