import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import GoogleButton from './Share/GoogleButton';
import { useQuery } from '@tanstack/react-query';
import useAxios from './Share/useAxios';

const Register = () => {
    const [googleBtn, setGooglebtn] = useState(false)
    const [error, setError] = useState('');
    const [ instance ] = useAxios()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const role = data.status
        const companyname = data.companyname
        const name = data.name
        const phoneNumber = data.phoneNumber
        const password = data.password
        const idNumber = parseInt(data.code)
        if (role == 'select') {
            return setError('Pleas Select Your Role')
        }
        const getData = {
            role, idNumber, name, companyname, phoneNumber, password
        }
        console.log(getData);
        
        instance.post(`/users`,getData).then(res =>{
            console.log(res.data);
        })
    }

    const handelGoogleRoleButt = () => {

        console.log(googleBtn);
    }
    const handelGoogleButt = () => {
        setGooglebtn(true)
        console.log('googleBtn');
    }
    const handelRoleSubmit = (event) => {
        event.preventDefault()
        const status = event.target.roll.value
        console.log('ok', status);
    }

    return (
        <div className='text-center max-sm:mx-5'>
            <h1 className=' text-xl mt-4'>Register</h1>
            <form className='lg:w-[60%] mx-auto my-2' onSubmit={handleSubmit(onSubmit)}>
                <p className=' text-left p-2 text-lg font-semibold lg:ml-5'>Company Name</p>
                <input className=' text-black w-full lg:w-[90%] p-1 rounded-md font-semibold' type="text" placeholder="Company Name" {...register("companyname", { required: true })} />
                {errors.companyname?.type === "required" && (
                    <p role="alert">Company Name is required</p>
                )}
                <p className=' text-left p-2 text-lg font-semibold lg:ml-5'>Your Name</p>
                <input className=' text-black w-full lg:w-[90%] p-1 rounded-md font-semibold' type="text" placeholder="name" {...register("name", { required: true })} />
                {errors.name?.type === "required" && (
                    <p role="alert">Name is required</p>
                )}
                <p className=' text-left p-2 text-lg font-semibold lg:ml-5'>Phone Number</p>
                <input className=' text-black w-full lg:w-[90%] p-1 rounded-md font-semibold' type="text" placeholder="name" {...register("phoneNumber", { required: true })} />
                {errors.phoneNumber?.type === "required" && (
                    <p role="alert">Phone Number is required</p>
                )}
                <p className=' text-left p-2 text-lg font-semibold lg:ml-5'>Your Role</p>
                <select className=' text-black w-full lg:w-[90%] p-1 rounded-md font-semibold' {...register("status", { required: true })}>
                    <option className=' text-black/50 disabled cursor-not-allowed' value="select">Select</option>
                    <option value="bayer"> Bayer</option>
                    <option value="seller"> Seller</option>
                </select>
                <p>{error}</p>
                <input className=' text-black hidden' type="number" defaultValue={0} {...register("code")} />
                <p className=' text-left p-2 text-lg font-semibold lg:ml-5'>Password</p>
                <input className=' text-black w-full lg:w-[90%] p-1 rounded-md font-semibold' type="text" placeholder="Password" {...register("password", { required: true })} />
                <input className='btn btn-sm btn-success mt-2' type="submit" />
            </form>
            <GoogleButton></GoogleButton>
        </div>
    );
};

export default Register;