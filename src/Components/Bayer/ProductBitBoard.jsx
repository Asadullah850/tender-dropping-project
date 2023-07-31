import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxios from '../Share/useAxios';
import { toast } from 'react-toastify';

const ProductBitBoard = () => {
    const [seconds, setSeconds] = useState(0);
    const [minute, setMinute] = useState(0);
    const navigate = useNavigate();
    const params = useParams();
    const [instance] = useAxios();



    const pCode = params.bitBoard;
    // console.log("params", params, "pcode", pCode);

    if (!pCode) {
        <p>Loading pleas</p>
    }

    // console.log(params.bitBoard);
    const { data: singlePData = [] } = useQuery(['productCode'], async () => {
        const product = await instance.get(`/singleProduct/${pCode}`);
        // console.log(product.data);
        return product.data
    })
    const { data: betData = [], isLoading } = useQuery(['betProduct'], async () => {
        const bet = await instance.get(`/betProduct/${pCode}`);
        console.log(bet.data);
        return bet.data
    })
    // console.log(singlePData.product);

    useEffect( () => {
        if (minute <= 1) {
            const interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
                if (seconds === 60) {
                    setSeconds(0)
                    setMinute(minute + 1)
                }

            }, 1000);

            if (minute === 1) {
                clearInterval(interval);
                patchTimeOut()
            }
            return () => clearInterval(interval);
        }
    }, [seconds]);

    const handelRecall = () => {
        setSeconds(seconds * 0)
        setMinute(seconds * 0)
        recallPatch();
        window.location.reload();
    }
    
    const recallPatch = async () =>{
        const lock = "Recall"
        const statusPatch = await instance.patch(`/lock/${pCode}`, { lock });
    }

    const patchTimeOut = async () => {
        console.log('patch ');
        const lock = "timeOut";
        const statusPatch = await instance.patch(`/lock/${pCode}`, { lock });
        console.log(statusPatch);

    }
    const home = async () => {
        console.log('Home ');
        // const lock = "cancel";
        // const statusPatch = await instance.patch(`/lock/${pCode}`, { lock });
        // console.log(statusPatch);
        navigate('/')

    }
    const sold = async () => {
        console.log('sold ');
        const lock = "sold";
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const soldDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const statusPatch = await instance.patch(`/lock/${pCode}`, { lock });
        // console.log(statusPatch);
        const status = "sold";
        const {code, bayerEmail, bitPrice, calling, sellerEmail} = betData[0];
        // console.log(code, bayerEmail, bitPrice, calling, time, sellerEmail);
        const data = {
            code, bayerEmail, bitPrice, calling, sellerEmail, time, status, soldDate
        }
        const soldData = await instance.post(`/sold`, data );
        // console.log( soldData );
        // const product = await instance.delete(`/productDelete/${pCode}`);
        navigate('/')
    }


    return (
        <div className=' text-center'>
            <p className=' my-4'>Product Name: {singlePData.product} | {singlePData.code}</p>
            <div className=" divider"></div>
            <div className="my-4 ">
                <p className=' text-right w-[80%]'>
                    {
                        minute === 1 ? <button onClick={handelRecall} className='btn btn-sm btn-error mx-4 my-2'> Recall</button> : <>0{minute}:{seconds}</>
                    }
                </p>
                {/*  */}
                <div className="border-2 border-white overflow-x-auto w-[60%] mx-auto max-sm:w-[90%]">
                    <table className="table">
                        {/* head */}
                        <thead className='text-[#0a0616] text-base'>
                            <tr>
                                <th></th>
                                <th>Bayer Name</th>
                                <th>TK</th>
                            </tr>
                        </thead>
                        {
                            betData?.map((item, index) => (
                                <tbody key={item._id}>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>{item.bayerEmail}</td>
                                        <td>{item.bitPrice}</td>
                                    </tr>
                                </tbody>
                            ))
                        }

                    </table>
                </div>
            </div>
            <div className="">
                <div className="">
                        <button onClick={sold} className='btn btn-sm btn-success'> Sold</button>
                    {/* <button className='btn btn-sm btn-error mx-4 my-2'> Unsold</button> */}
                    
                        <button onClick={home} className='btn btn-sm bg-green-500 my-2 mx-4'> Home</button>
                   
                    <button onClick={home} className='btn btn-sm btn-success'> Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ProductBitBoard;