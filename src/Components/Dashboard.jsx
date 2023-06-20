import React, { useState } from 'react';
import Pagetitle from './Pagetitle';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';



const Dashboard = () => {
    const seller = true;
    const [sellNow, setSellNow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [seeProduct, setseeProduct] = useState(false);
    const [roll, setRoll] = useState('bitStart')
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const product = data.ProductName
        const status = roll;
        setSellNow(false)
        setseeProduct(true)
        console.log(status, 'Product Name :', product)
        // toast.success("Successful Add Product!", {
        //     position: toast.POSITION.TOP_CENTER
        // });
        // navigate('/bitBoard')

    };
    // console.log(edit);
    const handelSellButton = () => {
        setSellNow(!sellNow)
    }
    const handelEdit = () => {
        setEditForm(true)
        setEdit(true)
        setseeProduct(false)
    }
    const handelEditSubmit = (event) => {
        event.preventDefault()
        setEdit(true)
        setEditForm(false)
        console.log('edit');
    }
    return (
        <div className=' text-center'>
            {
                seller ? <Pagetitle title={`Seller Dashboard `}></Pagetitle> : <Pagetitle title={`Bayer Dashboard `}></Pagetitle>
            }
            {
                seller ?
                    <div className=" flex lg:w-[60%] w-[80%] justify-between mx-auto my-2">
                        <div className="avatar">
                            <div className="w-24 rounded-xl">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRarHLf-_lcG7s3YUKLSn6CdqR77v6C1SiZUXYq_vTQH3SwbkKCn956PcsLyuYuWGhzTME&usqp=CAU" />
                            </div>
                        </div>
                        <div className=" mx-4 text-left">
                            <p>Company : Iponik Dampodf</p>
                            <p>Name: Iponik Dampo</p>
                            <p>Phone:12345678912</p>
                            <p>Status: Seller</p>
                            <p>Code : S5484</p>
                        </div>
                    </div>
                    :
                    <div className=" flex lg:w-[60%] w-[80%] justify-between mx-auto my-2">
                        <div className="avatar">
                            <div className="w-24 rounded-xl">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRarHLf-_lcG7s3YUKLSn6CdqR77v6C1SiZUXYq_vTQH3SwbkKCn956PcsLyuYuWGhzTME&usqp=CAU" />
                            </div>
                        </div>
                        <div className=" mx-4 text-left">
                            <p>Name: Jems Brone</p>
                            <p>Status: Bayer</p>
                            <p>Code : B5484</p>
                        </div>
                    </div>
            }
            {
                seller ?
                    // bayer section 
                    <div className="mt-5">
                        <button onClick={handelSellButton} className="btn max-sm:btn-sm btn-info">
                            {
                                sellNow ? 'Not now ' : 'Sell now'
                            }
                        </button>
                        <Link to={'/sellerreport'}>
                            <button className="mx-2 max-sm:btn-sm  btn btn-success">Report</button>
                        </Link>
                        {/* <button className="btn  max-sm:btn-sm btn-warning">Warning</button> */}
                        <button className="btn  max-sm:btn-sm btn-error">Help</button>
                    </div>
                    :
                    
                   <button className='btn btn-sm btn-secondary'>Lets Bit</button>
            }
            {/*  */}
            {
                editForm ?
                    <form className='my-4 max-sm:w-[97%]' onSubmit={handelEditSubmit}>
                        <label className=' max-sm:text-sm'>Product Name</label>
                        <input className='mx-2 p-2 rounded-lg text-black' type="text" placeholder="Product name" {...register("ProductName", { required: true })} />
                        <input className='btn btn-primary bg-[#10227c] hover:bg-[#21A4F1]' type="submit" value={'Edit'} />
                        {errors.ProductName?.type === "required" && (
                            <p role="alert">Product name is required</p>
                        )}
                    </form>
                    : ''
            }

            {
                sellNow ?
                    <form className='my-4 max-sm:w-[97%]' onSubmit={handleSubmit(onSubmit)}>
                        <label className=' max-sm:text-sm'>Product Name</label>
                        <input className='mx-2 p-2 rounded-lg text-black' type="text" placeholder="Product name" {...register("ProductName", { required: true })} />
                        <input className='btn btn-primary bg-[#10227c] hover:bg-[#21A4F1]' type="submit" value={'Add'} />
                        {errors.ProductName?.type === "required" && (
                            <p role="alert">Product name is required</p>
                        )}
                    </form>
                    :
                    edit ?
                        <div className="overflow-x-auto lg:w-[60%] mx-auto mt-4">
                            <table className="table">
                                {/* head */}
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <td>
                                            <div className="text-sm opacity-50">United States Bangari mal shob</div>
                                        </td>
                                        <th>
                                            <button onClick={handelEdit} className="btn btn-info mx-2 btn-xs">Edit</button>
                                            <Link to={'/bitBoard'}>
                                                <button className="btn btn-accent btn-xs">Bit Start</button>
                                            </Link>
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        : ''
            }

            {/*  */}
            {
                seeProduct ?
                    <div className="overflow-x-auto lg:w-[60%] mx-auto mt-4">
                        <table className="table">
                            {/* head */}
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <td>
                                        <div className="text-sm opacity-50">United States Bangari mal shob</div>
                                    </td>
                                    <th>
                                        <button onClick={handelEdit} className="btn btn-info mx-2 btn-xs">Edit</button>
                                        <Link to={'/bitBoard'}>
                                            <button className="btn btn-accent btn-xs">Bit Start</button>
                                        </Link>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    :
                    ''
            }
            {/*  */}
   
            {/*  */}
            {
                seller ? 
                <div className=" lg:w-[60%] mx-auto mt-4">
                <div className="overflow-x-auto">
                    <p className='text-xl font-semibold underline'>Top 3 Winner</p>
                    <table className="table">
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Cy Export Shart</td>
                                <td>1500</td>
                                <td>betonaear</td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th>2</th>
                                <td>CXRy Export Shart</td>
                                <td>2200</td>
                                <td>Pelo</td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <th>3</th>
                                <td>2RTY Export Shart</td>
                                <td>1000</td>
                                <td>Rambi</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            :
            <div className=" lg:w-[60%] mx-auto mt-4">
                <div className="overflow-x-auto">
                    <p className='text-xl font-semibold '>Last 3 <samp className='underline'>Winner</samp></p>
                    <table className="table">
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Cy Export Shart</td>
                                <td>1500</td>
                               
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th>2</th>
                                <td>CXRy Export Shart</td>
                                <td>2200</td>
                               
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <th>3</th>
                                <td>2RTY Export Shart</td>
                                <td>1000</td>
                               
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            }
        </div>
    );
};

export default Dashboard;