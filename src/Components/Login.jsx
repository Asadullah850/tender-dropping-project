import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Pagetitle from './Pagetitle';
import GoogleButton from './Share/GoogleButton';
import useAuth from './Authntication/useAuth';


const Login = () => {
    const navigate = useNavigate()
    // data.preventDefault()
    const { loginEmail } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;
        console.log(email, password)
        loginEmail(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate('/')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    };

    return (
        <div className='text-center mx-10'>
            <Pagetitle title={'Login'}></Pagetitle>
            <form className='lg:w-[60%] mx-auto my-2' onSubmit={handleSubmit(onSubmit)}>
                <p className=' text-left p-2 text-lg font-semibold lg:ml-5'>Your Email</p>
                <input className=' text-black w-full lg:w-[90%] p-2 rounded-md font-semibold' type="email" placeholder="email@email.com" {...register("email", { required: true })} />
                {errors.email?.type === "required" && (
                    <p role="alert">Email is required</p>
                )}
                <p className=' text-left p-2 text-lg font-semibold lg:ml-5'>Password</p>
                <input className=' text-black w-full lg:w-[90%] p-2 rounded-md font-semibold' type="password" placeholder="Password" {...register("password", {
                    required: true,
                    min: 8,
                    maxLength: 20,
                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}/
                })} />
                {errors.password?.type === 'required' && <p className='text-white p-0' role="alert">Password is required</p>}
                {errors.password?.type === 'min' && <p className='text-white p-0' role="alert">Password is upper 8</p>}
                {errors.password?.type === 'maxLength' && <p className='text-white p-0' role="alert">Password is less then 20</p>}
                {errors.password?.type === 'pattern' && <p className='text-white p-0' role="alert">Password are pattern (Aa123@.com)</p>}
                <div className='text-left'>
                    <Link to={'/register'}>
                        <small className=''>Have Not A Account</small>
                    </Link>
                </div>
                <p>123@Aaaa</p>
                <input className='btn btn-sm btn-success mt-2' type="submit" />
            </form>
            <GoogleButton></GoogleButton>
        </div>
    );
};

export default Login;