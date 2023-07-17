import React from 'react';

const Pagetitle = ({title}) => {
    return (
        <div>
            <h1 className='py-4 font-serif text-xl'>
                {title}
                <hr className='mt-2' />
            </h1>
        </div>
    );
};

export default Pagetitle;