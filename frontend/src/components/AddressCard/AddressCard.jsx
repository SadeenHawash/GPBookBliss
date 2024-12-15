import React from 'react'

const AddressCard = ({address}) => {
    return (
        <div className='flex flex-col gap-2 text-primary'>
            <p className='font-semibold text-sm'>{address?.firstName} {address?.lastName} </p>
            <p className='font-normal text-btn-secondary'>{address?.state}&nbsp; {address?.city}&nbsp; {address?.streetAddress}</p>
            <div className='flex flex-col gap-1 text-primary'>
                <p className='font-semibold text-md'>Phone Number</p>
                <p className='font-normal text-btn-secondary'>{address?.mobile}</p>
            </div>
        </div>
    )
}

export default AddressCard