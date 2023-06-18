import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Pagetitle from './Pagetitle';


const AddPost = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const product = data.ProductName
        console.log('Product Name :',product)
        toast.success("Successful Add Product!", {
            position: toast.POSITION.TOP_CENTER
          });
    };
    // console.log(errors);
    return (
        <div className=' text-center'>
            <Pagetitle title={'Add Page'}></Pagetitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">Product Name</label>
                <input className='mx-2 p-2 rounded-lg text-black' type="text" placeholder="Product name" {...register("ProductName", { required: true })} />
                <input className='btn btn-primary bg-[#10227c] hover:bg-[#21A4F1]' type="submit" />
                {errors.ProductName?.type === "required" && (
                    <p role="alert">Product name is required</p>
                )}
            </form>
        </div>
    );
};

export default AddPost;