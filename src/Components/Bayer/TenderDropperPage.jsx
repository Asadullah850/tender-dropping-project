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
import notWinner from "../../../public/sad.json";
import fileLock from "../../../public/file-Lock.json";


const TenderDropperPage = () => {
    const param = useParams()
    const [bitData, setBitData] = useState({});
    const [seconds, setSeconds] = useState(0);
    const [minute, setMinute] = useState(0);
    const [updateStatus, setUpdateStatus] = useState('');
    const [updateWinner, setWinner] = useState();
    const [lock, setLock] = useState("call");
    const { user, loading } = useAuth();
    const [instance] = useAxios();
    // console.log(param.code);
    if (!param) {
        return <p> loading </p>
    }

    const { data: singlePData = [], refetch, isLoading } = useQuery(['searchQuery'], async () => {
        const product = await instance.get(`/singleProduct/${param.code}`);
        // console.log(product.data);
        // console.log(singlePData);
        return product.data
    })

    if (isLoading) {
        return <p> loading </p>
    }

    const findSoldData = async () =>{
        const product = await instance.get(`/checkWine/${param.code}`);
        console.log("product.data", product.data[0].bayerEmail);
        if ( product.data[0].bayerEmail == user?.email) {
                console.log("bayerEmail",product.data[0].bayerEmail , "user.email", user.email);
            setWinner(true)
            setUpdateStatus(`Winner is ${product.data[0]?.bayerEmail}`)
        }
        if ( product.data[0].bayerEmail !== user?.email) {
                console.log("bayerEmail",product.data[0].bayerEmail , "user.email", user.email);
            setWinner(false)
            setUpdateStatus(`Winner is ${product.data[0]?.bayerEmail}`)
        }
    }

    function fetchData() {
        fetch(`https://tender-jamal-server.vercel.app/singleProduct/${param.code}`)
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            return response.json();
          }).then(data => {
            // console.log(data);

          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
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
        const productName = product;
        const calling = "bet-Calling";
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const allData = {
            bitPrice, sellerEmail, code, pDate, bayerEmail, calling, time, productName
        }
        // console.log('bitPrice :', allData)
        toast.success("Thanks For Call!", {
            position: toast.POSITION.TOP_CENTER
        });
        setBitData(allData)
        const insert = await instance.post(`/call`, allData);
        // console.log(insert);
        connection()
    };

    const connection = async () => {
        const myEmail = user.email;
        const sellerEmail = email;
        const findingConnection = await instance.get(`/connectionRequestFind/${myEmail}`)
        const findData = findingConnection.data
        const doesExist = findData.some((obj) => obj.sellerEmail === sellerEmail);
        if (doesExist === true) {
            return ;
        }
        const allEmail = { myEmail, sellerEmail}
        console.log('connection request', allEmail, 'true or false', doesExist);
        const product = await instance.post(`/connection`, allEmail);
    }

    useEffect(() => {

        if (minute <= 5) {
            const interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
                if (seconds === 60) {
                    setSeconds(0)
                }

                findSoldData()

                fetch(`https://tender-jamal-server.vercel.app/singleProduct/${param.code}`)
                .then(response => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok.');
                    }
                    return response.json();
                  }).then(data => {
                    // console.log(data);
                    const upStatus = data.status
                    if (upStatus === "sold") {
                        // setLock(data.bayerEmail)
                        console.log("112 line",data.email);
                    }
                    console.log(lock);
                    if (upStatus === "Recall") {
                        setLock(upStatus)
                    }
                    if (upStatus === "timeOut" ) {
                        setUpdateStatus(data.status)
                        setLock(upStatus)
                        refetch
                        return clearInterval(interval)
                    }
                  })
                  .catch(error => {
                    console.error('Error fetching data:', error);
                  });

               
            }, 1000);

            if (seconds === 60) {
                setMinute(minute + 1)
            }
            if (minute === 5) {
                // clearInterval(interval);
                setLock(updateStatus)
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
            <p>{updateStatus}</p>
            {
                lock === "timeOut" ?
                <div className="w-[50%] mx-auto">
                    <Lottie animationData={fileLock} loop={true}></Lottie>      
                </div>
                 : 
                updateWinner === true ?
                 <div className="w-[50%] mx-auto">
                    <Lottie animationData={winner} loop={true}></Lottie>
                </div>      
                :
                updateWinner === false ?
                <div className="w-[50%] mx-auto">
                    <Lottie animationData={notWinner} loop={true}></Lottie>
                </div>   
                :
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
            </div>
            }
            
        </div>
    );
};

export default TenderDropperPage;