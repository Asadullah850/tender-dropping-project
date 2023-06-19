import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductBitBoard = () => {
    const [seconds, setSeconds] = useState(0);
    const [minute, setMinute] = useState(0)

    useEffect(() => {
        if (minute <= 5) {
            const interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
                if (seconds === 60) {
                    setSeconds(0)
                }
            }, 1000);

            if (seconds === 60) {
                setMinute(minute + 1)
            }
            if (minute === 5) {
                clearInterval(interval);
            }

            return () => clearInterval(interval);
        }
    }, [seconds]);
    console.log(seconds);

    const handelLock = () => {
        console.log('lock ');
        setMinute(5)
    }

    const handelReset = () => {
        console.log('lock ');
        setSeconds(seconds * 0)
        setMinute(seconds * 0)
    }

    return (
        <div className=' text-center'>
            <p className=' my-4'>Product Name: XCRZ Car</p>
            <div className=" divider"></div>
            <div className="my-4 ">
                <p className=' text-right w-[80%]'>
                    {
                        minute === 5 ? <button className='btn btn-sm btn-error mx-4 my-2'> Unsold</button> : <>0{minute}:{seconds}</>
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
                        <tbody>
                            <tr>
                                <th>1</th>
                                <td>Hart Hagerty</td>
                                <td>2500</td>
                            </tr>
                            <tr>
                                <th>2</th>
                                <td>Hart Hagerty</td>
                                <td>2400</td>
                            </tr>
                            <tr>
                                <th>3</th>
                                <td>Hart Hagerty</td>
                                <td>2350</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="">
                <div className="">
                    <button onClick={handelLock} className='btn btn-sm btn-warning'> Lock</button>
                    <button onClick={handelReset} className='btn btn-sm btn-success mx-4'> reset</button>
                </div>
                <div className="">

                    <Link to={'/'}>
                        <button className='btn btn-sm btn-success'> Sold</button>
                    </Link>
                    {/* <button className='btn btn-sm btn-error mx-4 my-2'> Unsold</button> */}
                    <Link to={'/'}>
                        <button className='btn btn-sm bg-green-500 my-2 mx-4'> Home</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductBitBoard;