import React from 'react';

const Pagetitle = ({title}) => {
    return (
        <div>
            <h1 className='mt-2 p-1 font-serif text-xl'>{title}</h1>
            <div className=" divider"></div>
        </div>
    );
};

export default Pagetitle;