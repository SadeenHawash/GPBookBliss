import React from 'react'
import Filters from './Filters'
import ResultView from './ResultView'

const CategoryContainer = () => {
    return (
        <div className='container flex gap-3 w-full'>
            <Filters/>
            <ResultView/>
        </div>
    )
}

export default CategoryContainer

