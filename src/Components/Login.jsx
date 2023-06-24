import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Pagetitle from './Pagetitle';
import GoogleButton from './GoogleButton';


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
        <div className='text-center max-sm:mx-5'>
            <Pagetitle title={'Login'}></Pagetitle>
            <form className='lg:w-[60%] mx-auto my-2' onSubmit={handleSubmit(onSubmit)}>
                <p className=' text-left p-2 text-lg font-semibold lg:ml-5'>Your Email</p>
                <input className=' text-black w-full lg:w-[90%] p-2 rounded-md font-semibold' type="text" placeholder="name" {...register("name", { required: true })} />
                {errors.name?.type === "required" && (
                    <p role="alert">Name is required</p>
                )} 
                <p className=' text-left p-2 text-lg font-semibold lg:ml-5'>Password</p>
                <input className=' text-black w-full lg:w-[90%] p-2 rounded-md font-semibold' type="password" placeholder="Password" {...register("Password", {required: true, min: 8, maxLength: 20, pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8}/i})} />
                {errors.Password?.type === "min" && (
                    <p role="alert">Min 8 is required</p>
                )}
                {errors.Password?.type === "pattern" && (
                    <p role="alert">Pattern is (abCd@123) required</p>
                )}
                {errors.Password?.type === "maxLength" && (
                    <p role="alert">maxLength is 20 </p>
                )}
                <input className='btn btn-sm btn-success mt-2' type="submit" />
            </form>
            <GoogleButton></GoogleButton>
        </div>
    );
};

export default Login;