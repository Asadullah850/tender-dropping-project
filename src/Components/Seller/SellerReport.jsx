import Pagetitle from '../Pagetitle';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { FaEdit } from "react-icons/fa";
import useAuth from '../Authntication/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../Share/useAxios';

const SellerReport = () => {
    const [value, onChange] = useState(new Date());
    const { user } = useAuth()
    const [instance] = useAxios();



    const { data: winnerData = [] } = useQuery(['soldProductHistory'], async () => {
        const wine = await instance.get(`/sellerWinnerHistory/${user?.email}`);
        console.log(winnerData);
        return wine.data
    })


    const { data: userDataDB = [], refetch, isLoading } = useQuery(['reportUser'], async () => {
        const userCheck = await instance.get(`/singleUser/${user?.email}`);
        // console.log(userCheck);
        return userCheck.data
    })

    const { imgUrl, companyname, phoneNumber, role, bitCode } = userDataDB
    return (
        <div className=' text-center'>
            <Pagetitle title={'Seller Report'}></Pagetitle>
            {/*  */}
            <div className=" flex lg:w-[60%] w-[80%] justify-between mx-auto my-2">
                {/* <div className="avatar">
                    <div className="w-24 rounded-xl">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRarHLf-_lcG7s3YUKLSn6CdqR77v6C1SiZUXYq_vTQH3SwbkKCn956PcsLyuYuWGhzTME&usqp=CAU" />
                    </div>
                </div>
                <div className=" mx-4 text-left">
                    <p>Company : Iponik Dampodf</p>
                    <p>Name: Iponik Dampo</p>
                    <p>Phone:12345678912</p>
                    <p>Status: Seller / Code : S5484</p>
                    <Link to={'/'}>
                    <button className='btn btn-sm btn-accent my-2'>Home</button>
                </Link>
                </div> */}

                <div className=" flex lg:w-[60%] w-[80%] justify-between mx-auto my-2">
                    <label tabIndex={0} className=" avatar">
                        <div className="w-28 h-28 rounded-full">
                            <img src={imgUrl} />
                        </div>
                    </label>
                    <div className=" mx-4 text-left">
                        <p>{companyname}</p>
                        <p>Phone: {phoneNumber}</p>
                        <p>Status: <span className=' uppercase'>{role}</span> / Code : {bitCode} </p>
                        <Link to={'/'}>
                            <button className='btn btn-sm btn-accent my-2'>Home</button>
                        </Link>
                    </div>
                </div>

            </div>

            {/*  */}
            <div className=" lg:w-[60%] mx-auto mt-4">
                <p className=' text-left'>Date: <DatePicker className='w-40 bg-violet-500 text-black rounded-md' onChange={onChange} value={value} /> <button className='btn btn-sm btn-success'>Search</button></p>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead className=' text-yellow-300'>
                            <tr>
                                <th>
                                    Date
                                </th>
                                <th>Product Name</th>
                                <th>Tk</th>
                                <th>Winner Name</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                winnerData.map((items, index) => <tr key={index + 1}>
                                    <td>
                                        {items.soldDate} <br />
                                        {items.time}
                                    </td>
                                    <td>{items.productName}</td>
                                    <td>{items.bitPrice}</td>
                                    <td>
                                        {items.bayerEmail}

                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SellerReport;