import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import GoogleButton from './Share/GoogleButton';
import { useQuery } from '@tanstack/react-query';
import useAxios from './Share/useAxios';
import useAuth from './Authntication/useAuth';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const Register = () => {
    const [googleBtn, setGooglebtn] = useState(false)
    const [error, setError] = useState('');
    const [userimg, setUserimg] = useState('')
    const navigate = useNavigate();
    const { user, newUser, loading } = useAuth()
    const [instance] = useAxios()
    const [previous, setPrevious] = useState([])

    const { data, isLoading, isError } = useQuery(['userData'], async () => {
        const response = await instance.get('/alluser');
        setPrevious(response.data)
        return response.data;
    });

    const filter = previous.slice(0, 1).map(item => item.idNumber)
    const id = filter[0]
    // console.log(id+1);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Token_Api}`

    const onSubmit = data => {
        const role = data.status
        const companyname = data.companyname
        const name = data.name
        const phoneNumber = data.phoneNumber
        const password = data.password
        const email = data.email
        // image upload
        const idNumber = id + 1;
        if (role == 'select') {
            return setError('Pleas Select Your Role')
        }

        const fromData = new FormData()
        fromData.append('image', data.image[0])
        fetch(img_hosting_url, {
            method: "POST",
            body: fromData
        }).then(res => res.json()).then(imgResponse => {
            const imgUrl = imgResponse.data.display_url
            newUser(email, password)
                .then((userCredential) => {
                    // Signed in 
                    const getUser = userCredential.user;
                    updateProfile(getUser, {
                        displayName: name, photoURL: imgUrl
                    }).then(() => {
                        // Profile updated!
                        // ...
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });
                    const getData = {
                        role, idNumber, name, companyname, phoneNumber, email, imgUrl
                    }
                    instance.post(`/users`, getData).then(res => {
                        // console.log("res.data",res.data, "data",data);
                        if (res.data.acknowledged) {
                            toast.success("Account Successful")
                        }
                        navigate('/')
                    })
                    console.log(getData);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.warning(errorMessage)
                    console.log(errorMessage);
                    // ..
                });
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
        <div className='text-center mx-10'>
            <h1 className=' text-xl my-2 pt-5'>Register</h1>
            <form className='lg:w-[60%] mx-auto my-2' onSubmit={handleSubmit(onSubmit)}>
                <p className=' text-left mt-1 text-lg font-semibold lg:ml-5'>Company Name</p>
                <input className=' text-black w-full lg:w-[90%] p-1 rounded-md font-semibold' type="text" placeholder="Company Name" {...register("companyname", { required: true })} />
                {errors.companyname?.type === "required" && (
                    <p role="alert">Company Name is required</p>
                )}
                <p className=' text-left mt-1 text-lg font-semibold lg:ml-5'>Your Name</p>
                <input className=' text-black w-full lg:w-[90%] p-1 rounded-md font-semibold' type="text" placeholder="name" {...register("name", { required: true })} />
                {errors.name?.type === "required" && (
                    <p role="alert">Name is required</p>
                )}
                <p className=' text-left mt-1 text-lg font-semibold lg:ml-5'>Phone Number</p>
                <input className=' text-black w-full lg:w-[90%] p-1 rounded-md font-semibold' type="text" placeholder="name" {...register("phoneNumber", { required: true })} />
                {errors.phoneNumber?.type === "required" && (
                    <p role="alert">Phone Number is required</p>
                )}

                <p className=' text-left mt-1 text-lg font-semibold lg:ml-5'>Your Email</p>
                <input className=' text-black w-full lg:w-[90%] p-1 rounded-md font-semibold' type="email" placeholder="email@email.com" {...register("email", { required: true })} />
                {errors.email?.type === "required" && (
                    <p role="alert">Email is required</p>
                )}

                <div className=" flex gap-4 my-2">
                    <div className="">
                        <label>Your Image File
                            <input type="file" accept="image/*" {...register("image")} />
                        </label>
                    </div>
                    <div className="">
                        <select className=' text-black w-full p-1 rounded-md font-semibold' {...register("status", { required: true })}>
                            <option className=' text-black/50 disabled cursor-not-allowed' value="select">Select Your Role</option>
                            <option value="bayer"> Bayer</option>
                            <option value="seller"> Seller</option>
                        </select>
                        <p>{error}</p>
                    </div>
                </div>

                {/* <input className=' text-black hidden' type="number" defaultValue={} {...register("code")} /> */}
                <p className=' text-left mt-1 text-lg font-semibold lg:ml-5'>Password</p>
                <input className=' text-black w-full lg:w-[90%] p-1 rounded-md font-semibold' type="password" {...register("password", {
                    required: true,
                    min: 8,
                    maxLength: 20,
                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}/
                })}
                    placeholder='Password' />
                {errors.password?.type === 'required' && <p className='text-white p-0' role="alert">Password is required</p>}
                {errors.password?.type === 'min' && <p className='text-white p-0' role="alert">Password is upper 8</p>}
                {errors.password?.type === 'maxLength' && <p className='text-white p-0' role="alert">Password is less then 20</p>}
                {errors.password?.type === 'pattern' && <p className='text-white p-0' role="alert">Password are pattern (Aa123@.com)</p>}
                <div className='text-left'>
                    <Link to={'/login'}>
                        <small className=''>Have Account</small>
                    </Link>
                </div>
                <br />
                <p>123@Aaaa</p>
                <input className='btn btn-sm btn-success mt-2' type="submit" />
            </form>
            <GoogleButton></GoogleButton>
        </div>
    );
};

export default Register;