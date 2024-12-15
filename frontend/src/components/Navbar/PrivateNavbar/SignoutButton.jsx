import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import useSignout from '../../../hooks/authentication/useSignout'

export default function SignoutButton () {
    const {loading, signout} = useSignout();
    return (
        <button>
            {loading ? (<span className='spinner-border spinner-border-sm'></span>) :
            (
            <>
                <FontAwesomeIcon icon={faRightFromBracket}
                    className="h-4 w-4 flex-shrink-0 text-primary group-hover:text-primary"
                    aria-hidden="true"
                />
                <Link onClick={signout}>Sign out</Link>
            </>
            ) 
            }
        </button>
    )
}
