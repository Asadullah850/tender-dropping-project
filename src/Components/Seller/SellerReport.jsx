import React from 'react';
import Pagetitle from '../Pagetitle';
import { Link } from 'react-router-dom';

const SellerReport = () => {
    return (
        <div className=' text-center'>
            <Pagetitle title={'Seller Report'}></Pagetitle>
            {/*  */}
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
                    <Link to={'/'}>
                        <button className='btn btn-sm btn-accent my-2'>Home</button>
                    </Link>
                </div>
            </div>

            {/*  */}
            <div className=" lg:w-[60%] mx-auto mt-4">
                <p className=' text-left'>Date: </p>
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
                            {/* row 1 */}
                            <tr>
                                <th>1/1/23</th>
                                <td>Cy Export Shart</td>
                                <td>00</td>
                                <td>Unsold</td>
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
                                <td>00</td>
                                <td>unsold</td>
                            </tr>
                            {/* row 4 */}
                            <tr>
                                <th>4</th>
                                <td>2RTY Export Shart</td>
                                <td>1000</td>
                                <td>Rambi</td>
                            </tr>
                            {/* row 5 */}
                            <tr>
                                <th>5</th>
                                <td>2RTY Export Shart</td>
                                <td>1000</td>
                                <td>betonaear</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SellerReport;