import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Pagetitle from '../Pagetitle';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../Share/useAxios';
import useAuth from '../Authntication/useAuth';
import Lottie from "lottie-react";
import winner from "../../../public/animation_winner.json";
import fileLock from "../../../public/file-Lock.json";


const TenderDropperPage = () => {
    const param = useParams()
    const [bitData, setBitData] = useState({});
    const [seconds, setSeconds] = useState(0);
    const [minute, setMinute] = useState(0);
    const [updateWinner, setWinner] = useState(false);
    const [lock, setLock] = useState(false);
    const { user, loading } = useAuth();
    const [instance] = useAxios();
    console.log(param.code);
    if (!param) {
        return <p> loading </p>
    }

    const { data: singlePData = [], refetch, isLoading } = useQuery(['searchQuery'], async () => {
        const product = await instance.get(`/singleProduct/${param.code}`);
        // console.log(product.data);
        console.log(singlePData);
        return product.data
    })

    if (isLoading) {
        return <p> loading </p>
    }

    const { postDate, product, code, email } = singlePData
    // console.log(singlePData);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const bitPrice = parseInt(data.price);
        const bayerEmail = user?.email;
        const sellerEmail = email;
        const code = param.code;
        const pDate = postDate;
        const calling = "bet-Calling";
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const allData = {
            bitPrice, sellerEmail, code, pDate, bayerEmail, calling, time
        }
        // console.log('bitPrice :', allData)
        toast.success("Thanks For Call!", {
            position: toast.POSITION.TOP_CENTER
        });
        setBitData(allData)
        setWinner(true)

        const insert = await instance.post(`/call`, allData);
        console.log(insert);
    };
    // console.log(bitData);

    useEffect(() => {

        if (minute <= 5) {
            const interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
                if (seconds === 60) {
                    setSeconds(0)
                }
                refetch;
            }, 1000);

            if (seconds === 60) {
                setMinute(minute + 1)
            }
            if (minute === 5) {
                clearInterval(interval);
                setLock(true)
            }

            return () => clearInterval(interval);
        }
    }, [seconds]);

    return (
        <div className=' text-center'>
            <Pagetitle title={'Tender Dropper Page'}></Pagetitle>
            <p className='my-1' >Product Name: <br /> {product} | {code} | 0{minute}:{seconds}</p>
            <Link to={'/'}>
                <button className='btn btn-accent my-2'>Home</button>
            </Link>
            {
                lock ? 
                <div className=" w-[60%] h-[60%] mx-auto">
                    <Lottie animationData={fileLock} loop={true}  />
                </div>  :
            <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="">Price</label>
                <input className='mx-2 p-2 rounded-lg text-black' type="text" placeholder="Product name" {...register("price", { required: true })} />
                <input className='btn btn-primary bg-[#10227c] hover:bg-[#21A4F1]' type="submit" />
                {errors.price?.type === "required" && (
                    <p role="alert">Product name is required</p>
                )}
            </form>
            <div className="">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className='text-white'>Date</th>
                                <th className='text-white'>Email</th>
                                <th className='text-white'>Bit Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td>{bitData.date}</td>
                                <td>{bitData.bayerEmail}</td>
                                <td>{bitData.bitPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {
                updateWinner ? 
                <div className=" w-[60%] h-[60%] mx-auto">
                    <Lottie animationData={winner} loop={true}  />
                </div>
            : ''
            }
            </div>
            }
            
        </div>
    );
};

export default TenderDropperPage;