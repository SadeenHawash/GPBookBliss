import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const UploadFirstCard = (props) => {
    return (
        <div className="uploadFirstCrad relative bg-background flex flex-col gap-5 text-center justify-center items-center skeleton mt-6 p-2 animate-none h-[300px] w-[250px] min-[400px]:h-[420px] min-[400px]:w-[380px]">
            <h2 className='font-semibold text-primary'>{props.cardText}</h2>
            {/* <p className=' text-xs font-thin text-gray-700'>Show off your work. Get feedback, likes.</p> */}
            <Link to={`${props.buttonLink}`} className='button rounded-3xl p-2 px-3 bg-btn-primary hover:bg-secondary text-primary text-xs font-bold'>
                <div className='flex gap-3' >
                    Upload
                    <FontAwesomeIcon icon={faArrowAltCircleUp}
                    className="h-4 w-4 flex-shrink-0 text-primary"
                    aria-hidden="true"
                    />
                </div>
            </Link>
        </div>
    )
}

export default UploadFirstCard