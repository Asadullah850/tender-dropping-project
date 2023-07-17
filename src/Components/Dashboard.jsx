import React, { useRef, useState } from 'react';
import Pagetitle from './Pagetitle';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import useAuth from './Authntication/useAuth';
import useAxios from './Share/useAxios';
import LogOut from './Share/Logout';



const Dashboard = () => {
    const [seller, setSeller] = useState(true);
    const [bitStart, setBitStart] = useState(false);
    const [productName, setPName] = useState('');
    const [productPrice, setPPrice] = useState('');
    const [productData, setProductData] = useState('');
    const [productCode, setProductCode] = useState('');
    const [sellNow, setSellNow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [seeProduct, setseeProduct] = useState(false);
    const [roll, setRoll] = useState('bitStop');
    const [autCode, SetAutCode] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();
    const [instance] = useAxios();
    const inputRef = useRef(null);


    const { user, logout, loading } = useAuth();

    function generateRandomString() {
        var randomString = '';
        var uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        var numbers = '0123456789';


        for (var j = 0; j < 2; j++) {
            randomString += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
        }

        for (var k = 0; k < 3; k++) {
            randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }

        for (var l = 0; l < 2; l++) {
            randomString += lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length));
        }

        for (var m = 0; m < 3; m++) {
            randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }

        return randomString.trim();
    }

    const { data: userDataDB = [], refetch, isLoading } = useQuery(['user'], async () => {
        const userCheck = await instance.get(`/singleUser/${user?.email}`);
        // console.log(userCheck);
        return userCheck.data
    })
    // SetAutCode(generateRandomString())
    const { companyname, email, idNumber, imgUrl, bitCode, phoneNumber, role, name, _id } = userDataDB;
    // console.log(userDataDB);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const product = data.ProductName
        const status = roll;
        const UserCode = userDataDB.idNumber;
        const email = user?.email
        const code = generateRandomString()
        let checkCode = await instance.get(`/checkCode/${code}  `)
        console.log(checkCode);
        if (checkCode === null || " ") {
            checkCode = 0;
        }
        if (checkCode == code) {
            return code
        }
        SetAutCode(code)
        // console.log(checkCode);
        const price = parseFloat(data.price)
        const date = new Date()
        const postDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        if (price < 0) {
            return toast.warning(' price les den 0 not accepted')
        }
        const collection = {
            status, product, price, postDate, code, UserCode, email
        }

        const response = await instance.post(`/bitProductData`, collection)
        console.log(response);
        setProductCode(code)
        setPName(product)
        setPPrice(price)
        setSellNow(false)
        setseeProduct(true)
        setProductData(collection)
        console.log(collection)
    };
    // console.log(productCode);
    // console.log(edit);
    const handelSellButton = () => {

        setSellNow(true)
    }
    const handelEdit = () => {
        setEditForm(true)
        setEdit(true)
        setseeProduct(false)
    }
    const handelEditSubmit = (event) => {
        event.preventDefault()
        const form = event.target
        // const productName = form.ProductName.value;
        // const productPrice = form.price.value;
        // const date = new Date()
        // const status = "bitStart";
        // const postDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        // if (productPrice < 0) {
        //     return toast.warning(' price les den 1 not accepted')
        // }
        // const updateProduct = {
        //     productName, productPrice, postDate, status, productCode
        // }

        console.log(updateProduct);
        setPName(productName)
        setPPrice(productPrice)
        setProductData(updateProduct)
        setEdit(true)
        setEditForm(false)
    }
    const singOut = () => {
        logout().then((res) => {
            // Sign-out successful.
            navigate('/login')
            console.log(res);
        }).catch((error) => {
            // An error happened.
        });
    };

    const bitOn = async () => {
        const status = "bitStart";
        console.log(productCode);
        const collection = { status }
        console.log("collection", collection);
        const statusPatch = await instance.patch(`/status/${productCode}`, { status })

        //  const response = await instance.post(`/bitProductData`, collection)
        //    console.log(statusPatch);

    }
    // const bitcode =  ()=>{
    //     const randomCode = Math.floor(Math.random()*99999) + 10000;
    // const codeData =  await instance.patch(`/codeUpdate/${_id}`, {randomCode})
    //     console.log(randomCode, codeData);
    //     setBitStart(true)
    //     setError('')
    // }
    // Bayer Section
    const codeInput = (event) => {
        setSearchQuery(event.target.value);
        console.log(searchQuery, "PP880oz328");
        // console.log('bit start');
    }
    const letBitBtn = async () => {
        console.log(searchQuery);
        const product = await instance.get(`/singleProduct/${searchQuery}`);
        console.log(product.data);
        // const { data: singlePData = [], refetch, isLoading } = useQuery(['searchQuery'], async () => {
        //     const product = await instance.get(`/singleProduct/${searchQuery}`);
        //     console.log(product.data);
        //     return product.data
        // })
    }
    const connection = () => {
        console.log('connection request');
    }
    return (
        <div className=' text-center'>
            {
                // role dea seller chacke kora 
                role === 'seller' ? <Pagetitle title={`Seller Dashboard `}></Pagetitle> : <Pagetitle title={`Bayer Dashboard `}></Pagetitle>
            }
            {
                role === 'seller' ?
                    <div className=" flex lg:w-[60%] w-[80%] justify-between mx-auto my-2">
                        <div className="avatar">
                            <div className="w-24 rounded-xl">
                                <img src={imgUrl} />
                            </div>
                        </div>
                        {/* edit */}
                        <div className=" mx-4 text-left">
                            {/* Open the modal using ID.showModal() method */}
                            <button className="btn btn-sm bg-transparent p-0 border-none hover:bg-transparent" onClick={() => window.my_modal_5.showModal()}><FaEdit className=' text-white text-lg '></FaEdit></button>
                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                <form method="dialog" className="modal-box">
                                    <div className="flex justify-between">
                                        <h3 className="font-bold text-lg">Edit!</h3>
                                        <p>Code : {idNumber}</p>
                                    </div>
                                    <div className=" flex">
                                        <div className="">
                                            <input className='border-2 border-violet-950 p-1 m-1 rounded-md' type="text" defaultValue={companyname} />
                                            <input className='border-2 border-violet-950 p-1 m-1 rounded-md' type="tel" defaultValue={phoneNumber} />
                                        </div>
                                        <div className="">
                                            <input className='border-2 border-violet-950 p-1 m-1 rounded-md' type="text" defaultValue={name} />
                                            <input className='border-2 border-violet-950 p-1 m-1 rounded-md' type="url" defaultValue={imgUrl} />
                                        </div>
                                    </div>
                                    <div className="modal-action">
                                        {/* if there is a button in form, it will close the modal */}
                                        {/* To DO akhane edit button a kaj ace */}
                                        <button className="btn border-2 border-black">Submit</button>
                                    </div>
                                </form>
                            </dialog>
                            {/* edit */}
                            <p>Company : {companyname}</p>
                            <p>Name: {name}</p>
                            <p>Phone: {phoneNumber}</p>
                            <p>Email: {email}</p>
                            <p>Status: <span className=' uppercase'>{role}</span> / Code : {autCode} </p>
                            {/* to do akhane jwt wuse korty hobe */}
                        </div>
                    </div>
                    :
                    <div className="">
                        <div className=" flex lg:w-[60%] w-[80%] justify-between mx-auto my-2">
                            <div className="avatar">
                                <div className="w-24 rounded-xl">
                                    <img src={imgUrl} />
                                </div>
                            </div>
                            <div className=" mx-4 text-left">
                                <p>
                                    {/* Company Name: <br />  */}
                                    {companyname}</p>
                                <p>
                                    {/* Name: <br />  */}
                                    {name}
                                </p>
                                <p>Status: {role}</p>
                                <p>Code : {bitCode}</p>
                            </div>
                        </div>
                        <div className="">
                            <button onClick={connection} className='btn btn-secondary btn-sm'>Connection</button>
                            <button onClick={singOut} className='btn btn-secondary btn-sm'>logOut</button>
                        </div>
                    </div>
            }
            {
                role === 'seller' ?
                    // seller section 
                    <div className="mt-5">
                        <button onClick={handelSellButton} className={sellNow ? `btn btn-sm btn-info` : `btn btn-sm btn-info`}>
                            {
                                sellNow ? 'Not now ' : 'Sell now'
                            }
                        </button>
                        <Link to={'/sellerreport'}>
                            <button className="mx-2 btn-sm  btn btn-success">Report</button>
                        </Link>
                        {/* <button className="btn  max-sm:btn-sm btn-warning">Warning</button> */}
                        <button onClick={() => singOut()} className='btn btn-sm btn-warning'>Logout</button>
                        <button className="btn btn-sm btn-error mx-2">Help</button>
                    </div>
                    :
                    <div className="w-[60%] mx-auto flex mt-5">
                        <div className="form-control w-full ">
                            <input type="text" placeholder="Type Bit Code" className="input input-bordered w-full h-8 text-black" onChange={codeInput} />
                        </div>
                        <Link to={`/tenderDropPage/${searchQuery}`}>
                            <button onClick={letBitBtn} className='btn btn-sm btn-secondary mx-2 w-20'>Lets Bit</button>
                        </Link>
                    </div>
            }
            {/*  */}
            {
                editForm ?
                    <form className='my-4 max-sm:w-[97%]' onSubmit={handelEditSubmit}>
                        <label className=' max-sm:text-sm'>Product Name</label>
                        <input className='mx-2 p-2 rounded-lg text-black' type="text" placeholder="Product name" {...register("ProductName", { required: true })} />
                        <input className='mx-1 p-2 w-20 rounded-lg text-black' type="number" placeholder="Price" defaultValue={0} {...register("price")} />
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
                        <input className='mx-2 p-2 rounded-lg text-black' type="text" placeholder="Product Name" {...register("ProductName", { required: true })} />
                        <input className='mx-1 p-2 w-20 rounded-lg text-black' type="number" placeholder="Price" defaultValue={0} {...register("price")} />
                        <input className='btn btn-primary bg-[#10227c] hover:bg-[#21A4F1]' type="submit" value={'Add'} />
                        {errors.ProductName?.type === "required" && (
                            <p role="alert">Product name is required</p>
                        )}
                    </form>
                    :
                    edit && editForm === false ?
                        <div className="overflow-x-auto lg:w-[60%] mx-auto mt-4">
                            <table className="table">
                                {/* head */}
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <td>
                                            <div className="text-sm opacity-50">{productName}</div>
                                        </td>
                                        <td>
                                            <div className="text-sm">{productPrice}</div>
                                        </td>
                                        <th>
                                            <button onClick={handelEdit} className="btn btn-info mx-2 btn-xs">Edit</button>
                                            <Link to={`/bitBoard/:${productCode}`}>
                                                <button onClick={bitOn} className="btn btn-accent btn-xs">Bit Start</button>
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
                                        <div className="text-sm opacity-50">{productName}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm">{productPrice}</div>
                                    </td>
                                    <th>
                                        <button onClick={handelEdit} className="btn btn-info mx-2 btn-xs">Edit</button>
                                        <Link to={`/bitBoard/${productCode}`}>
                                            <button onClick={bitOn} className="btn btn-accent btn-xs">Start</button>
                                        </Link>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    :
                    ''
            }
            {
                role === 'seller' ?
                    <div className=" lg:w-[60%] mx-auto mt-4">
                        <div className="overflow-x-auto">
                            <p className='text-xl font-semibold'>Last 3 Winner</p>
                            <hr />
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