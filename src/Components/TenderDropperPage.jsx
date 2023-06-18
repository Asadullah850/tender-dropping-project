import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Pagetitle from './Pagetitle';


const TenderDropperPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const bitPrice = data.price
        console.log('bitPrice :',bitPrice)
        toast.success("Thanks For Call!", {
            position: toast.POSITION.TOP_CENTER
          });
    };
    return (
        <div className=' text-center'>
            <Pagetitle title={'Tender Dropper Page'}></Pagetitle>
            <p className='my-8' >Product Name: xcr Car</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">Betting Price</label>
                <input className='mx-2 p-2 rounded-lg text-black' type="text" placeholder="Product name" {...register("price", { required: true })} />
                <input className='btn btn-primary bg-[#10227c] hover:bg-[#21A4F1]' type="submit" />
                {errors.price?.type === "required" && (
                    <p role="alert">Product name is required</p>
                )}
            </form>

        </div>
    );
};

export default TenderDropperPage;