import React, { useRef, useState } from 'react';
import Pagetitle from './Pagetitle';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import useAuth from './Authntication/useAuth';
import useAxios from './Share/useAxios';
import { FaCartArrowDown, FaHistory, FaUsers, FaUserCog, FaPhoneAlt } from "react-icons/fa";



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
    // console.log(user.email);

    function generateRandomString() {
        var randomString = '';
        var uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
        var numbers = '0123456789';

        for (let j = 0; j < 1; j++) {
            randomString += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
          }
        
          for (let k = 0; k < 2; k++) {
            randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
          }
      
          for (let j = 0; j < 1; j++) {
            randomString += lowercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
          }
      
          for (let m = 0; m < 2; m++) {
            randomString += numbers.charAt(Math.floor(Math.random() * numbers.length));
          }

        return randomString.trim();
    }

    const { data: userDataDB = [], refetch, isLoading } = useQuery(['user'], async () => {
        const userCheck = await instance.get(`/singleUser/${user?.email}`);
        // console.log('userCheck',userCheck);
        return userCheck.data
    })
    const { data: winnerData = [] } = useQuery(['winner'], async () => {
        const wine = await instance.get(`/sellerWinnerHistory/${user?.email}`);
        // console.log(winnerData);
        return wine.data
    })
    const { data: winnerBayerData = [] } = useQuery(['winnerBayerData'], async () => {
        const wineBayer = await instance.get(`/bayerWinnerHistory/${user?.email}`);
        // console.log(winnerBayerData);
        return wineBayer.data
    })

    const { data: productDataLast = [] } = useQuery(['productDataLast'], async () => {
        const productData = await instance.get(`/productCodeLogout/${user?.email}`);
        console.log("productDataLast80",productDataLast);
        console.log("productDataLast81",productData);
        return productData.data
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
        const code = bitCode;
        const sl = parseFloat(winnerData.length + 1);
        let checkCode = await instance.get(`/checkCode/${code}  `)
        // console.log(checkCode);
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
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        if (price < 0) {
            return toast.warning(' price les den 0 not accepted')
        }
        const collection = {
            status, product, price, postDate, code, UserCode, email, time, sl
        }

        const response = await instance.post(`/bitProductData`, collection)
        console.log(response);
        setProductCode(code)
        setPName(product)
        setPPrice(price)
        setSellNow(false)
        setseeProduct(true)
        setProductData(collection)
        // console.log(collection)
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

        // console.log(updateProduct);
        setPName(productName)
        setPPrice(productPrice)
        setProductData(updateProduct)
        setEdit(true)
        setEditForm(false)
    }
    const singOut = async () => {
        const code = generateRandomString()
        // console.log(code);

        logout().then((res) => {
            // Sign-out successful.
            logoutPatchCode(user?.email, code);
            logoutUpdateCode()
            navigate('/login')
            // console.log(res);
        }).catch((error) => {
            // An error happened.
        });
        
    };

    const logoutPatchCode = async (data, code) => {
        const updateBitCode = await instance.patch(`/singleUser/${data}`, { code })
        // console.log(code);
        
    }
    
    const logoutUpdateCode = async () => {
        const productCode = productDataLast[0].code;
        const updateCode = "APVEO8857688147LLROP6336asasasxxcrok556813SERGFFSCVWS"

        if (role === "seller") {
            const updateBitCode = await instance.patch(`/productCodeLogoutPatch/${productCode}`, { updateCode })
        }
    }
    
    const bitOn = async () => {
        const status = "bitStart";
        const collection = { status }
        const statusPatch = await instance.patch(`/status/${productCode}`, { status })
        
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
        // console.log(searchQuery, "FK666rd393");
        // console.log('bit start');
    }
    const letBitBtn = async () => {
        console.log(searchQuery);
        const product = await instance.get(`/singleProduct/${searchQuery}`);
        // console.log(product.data);
        // const { data: singlePData = [], refetch, isLoading } = useQuery(['searchQuery'], async () => {
        //     const product = await instance.get(`/singleProduct/${searchQuery}`);
        //     console.log(product.data);
        //     return product.data
        // })
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
                        <label tabIndex={0} className=" avatar">
                            <div className="w-28 h-28 rounded-full">
                                <img src={imgUrl} />
                            </div>
                        </label>
                        {/* edit */}
                        <div className=" mx-4 text-left">
                           
                            {/* edit */}
                            <p>{companyname}</p>
                            <p>Phone: {phoneNumber}</p>
                            <p>Status: <span className=' uppercase'>{role}</span> / Code : {bitCode} </p>
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

                            <button onClick={singOut} className='btn btn-secondary btn-sm mx-2'>logOut</button>
                        </div>
                    </div>
            }
            {
                role === 'seller' ?
                    // seller section 
                    <div className="mt-5 grid grid-cols-2 gap-4">
                        <div onClick={handelSellButton} className={sellNow ? ` bg-blue-600 text-5xl font-bold p-2 rounded-md ` : ` bg-blue-600 text-5xl font-bold p-2 rounded-md  cursor-pointer`}>
                            <FaCartArrowDown className='mx-auto my-2 '></FaCartArrowDown>
                            {
                                sellNow ? 'Not now ' : 'Sell now'
                            }
                        </div>
                        <Link to={'/sellerreport'}>
                            <div className="cursor-pointer mx-1 bg-blue-600 text-5xl font-bold p-2 rounded-md">
                                <FaHistory className='mx-auto my-2 '></FaHistory>
                                <div className="">Report</div>
                            </div>

                        </Link>
                        <div className="cursor-pointer mx-1 bg-blue-600 text-5xl font-bold p-2 rounded-md">
                            <FaUsers className='mx-auto my-2 '></FaUsers>
                            <div className="">Customer</div>
                        </div>
                        <div className="cursor-pointer mx-1 bg-blue-600 text-5xl font-bold p-2 rounded-md" onClick={() => window.my_modal_5.showModal()}>
                            
                             {/* Open the modal using ID.showModal() method */}
                             <FaUserCog className='mx-auto my-2 '></FaUserCog>
                            <div className="">Profile</div>
                              
                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                <form method="dialog" className="modal-box text-base">
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

                        </div>
                        {/* <div className="btn  max-sm:btn-sm btn-warning">Warning</div> */}
                        <div onClick={() => singOut()}  className="cursor-pointer mx-1 bg-blue-600 text-5xl font-bold p-2 rounded-md">
                            <FaHistory className='mx-auto my-2 '></FaHistory>
                            <div className="">Logout</div>
                        </div>
                        <div className="cursor-pointer mx-1 bg-blue-600 text-5xl font-bold p-2 rounded-md">
                            <FaPhoneAlt className='mx-auto my-2 '></FaPhoneAlt>
                            <div className="">Help</div>
                        </div>
                    </div>
                    :
                    <div className="w-[60%] mx-auto flex mt-5">
                        <div className="form-control w-full ">
                            <input type="text" placeholder="Type Bit Code" className="input input-bordered w-full h-8 text-black" onChange={codeInput} />
                        </div>
                        <Link to={`/tenderDropPage/${searchQuery}`}>
                            <button onClick={letBitBtn} className='btn btn-sm btn-secondary mx-2 w-[80px]'>Lets Bit</button>
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
                    // Note ata last 3 ta dekhai to doka matro
                    // <div className=" lg:w-[60%] mx-auto mt-4">
                    //     <div className="overflow-x-auto">
                    //         <p className='text-xl font-semibold'>Last 3 Winner</p>
                    //         <hr />
                    //         <table className="table">
                    //             <tbody>
                    //                 {
                    //                     winnerData.map((items, index) => <tr key={items._id}>
                    //                         <th>{items.soldDate}</th>
                    //                         <td>{items.bayerEmail}</td>
                    //                         <td>{items.bitPrice}tk</td>
                    //                     </tr>)
                    //                 }
                    //             </tbody>
                    //         </table>
                    //     </div>
                    // </div>
                    ""
                    :

                    <div className=" lg:w-[60%] mx-auto mt-4">
                        <div className="overflow-x-auto">
                            <p className='text-xl font-semibold '>Last 3 <samp className='underline'>Winner Bits</samp></p>
                            <table className="table">
                                <tbody>
                                    {
                                        winnerBayerData.map((items, index) => <tr key={items._id}>
                                            <th>{items.soldDate}</th>
                                            <td>{items.bayerEmail}</td>
                                            <td>{items.bitPrice}tk</td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Dashboard;