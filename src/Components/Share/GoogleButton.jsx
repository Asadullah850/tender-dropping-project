import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const GoogleButton = () => {
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

    const handelGoogleSingIn = () => {
        const roll = status
        console.log('done', roll);
        // /userAdd
        // googleLogin().then((result) => {
        //     // This gives you a Google Access Token. You can use it to access the Google API.
        //     const credential = GoogleAuthProvider.credentialFromResult(result);
        //     const token = credential.accessToken;
        //     // The signed-in user info.
        //     const user = result.user;
        //     // console.log(user);
        //     const displayName = user.displayName;
        //     const photoURL = user.photoURL;
        //     const email = user.email;
        //     const roll = status;
        //     const userData = {
        //         displayName, photoURL, email, roll
        //     }
        //     // console.log(userData);
        //     axiosSecure.post(`/userAdd`,userData).then(res => {
        //         // console.log(res);
        //         if (res.data.acknowledged) {
        //             toast.success("Register Successful")
        //             navigate('/')
        //         }
        //     }).catch((error) => {
        //         toast.error(error.message)
        //         // console.log(error);
        //     })
        //     // IdP data available using getAdditionalUserInfo(result)
        //     // ...
        //   }).catch((error) => {
        //     // Handle Errors here.
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     const credential = GoogleAuthProvider.credentialFromError(error);
        //     // console.log('errorMessage',errorCode, 'errorMessage', errorMessage, 'credential',credential);
        //     // ...
        //   });

    }

    return (
        <>
            {/* Open the modal using ID.showModal() method */}
            {
                select ? <button htmlFor="my_modal_7" onClick={handelGoogleSingIn} className='btn mt-2 bg-transparent border-none'><FcGoogle className='text-5xl'></FcGoogle></button>
                    :

                    <label htmlFor="my_modal_7" className="btn"><FcGoogle className='text-5xl'></FcGoogle></label>
            }

            {/* The button to open modal */}
            

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Hello!</h3>
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="modal-box">
                        <select className=' text-black w-full lg:w-[90%] p-2 rounded-md font-semibold' {...register("status", { required: true })}>
                            <option className=' text-black/50 disabled cursor-not-allowed' value="select">Select</option>
                            <option value="bayer"> Bayer</option>
                            <option value="seller"> Seller</option>
                        </select>
                        <input className='btn btn-sm' type="submit" />
                    </form>
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>

        </>
    );
};

export default GoogleButton;