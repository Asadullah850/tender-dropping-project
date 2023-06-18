import React from 'react';

const ProductBitBoard = () => {
    return (
        <div className=' text-center'>
            <p className=' my-4'>Product Name: XCRZ Car</p>
            <div className=" divider"></div>
            <div className="my-4 ">
                <div className="border-2 border-white overflow-x-auto w-[60%] mx-auto max-sm:w-[90%]">
                    <table className="table">
                        {/* head */}
                        <thead className='text-[#0a0616] text-base'>
                            <tr>
                                <th></th>
                                <th>Name Caller</th>
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
                <button className='btn btn-sm btn-success'> Lock</button>
                <button className='btn btn-sm btn-success'> reset</button>
                <button className='btn btn-sm btn-success'> Sold</button>
                <button className='btn btn-sm btn-success'> Stop bit</button>
            </div>
        </div>
    );
};

export default ProductBitBoard;