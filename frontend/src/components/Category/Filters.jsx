import { Disclosure } from '@headlessui/react';
import { Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import React, { useState } from 'react'
import { FaAngleDown, FaMinus, FaPlus } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';

const Filters = () => {
    const Filters = [
        {
            id: 'price',
            name: 'Price',
            options: [
                { value: 'white', label: 'White', checked: false },
                { value: 'white', label: 'White', checked: false },
            ]
        },
        {
            id: 'pages',
            name: '# Of Pages',
            options: [
                { value: '100', label: '100 And Above', checked: false },
                { value: '200', label: '200 And Above', checked: false },
                { value: '300', label: '200 And Above', checked: false },
                { value: '400', label: '200 And Above', checked: false },
                { value: '500', label: '200 And Above', checked: false },
            ]
        },
        {
            id: 'discount',
            name: 'Discount Range',
            options: [
                { value: '10', label: '10% And Above', checked: false },
                { value: '20', label: '20% And Above', checked: false },
                { value: '30', label: '30% And Above', checked: false },
                { value: '40', label: '40% And Above', checked: false },
                { value: '50', label: '50% And Above', checked: false },
            ]
        },
        {
            id: 'availability',
            name: 'Availability',
            options: [
                { value: 'instock', label: 'In Stock', checked: false },
                { value: 'outofstock', label: 'Out Of Stock', checked: false },
            ]
        }
    ]
    const location = useLocation();
    // const handleFilters = (value, filterId) => {
    //     const searchParams = new URLSearchParams(location.search);
    //     let filterValue = searchParams.getAll(filterId); 
    //     if(filterValue.length > 0 && filterValue[0].split(",").includes(value)){
    //         filterValue = filterValue[0].split(",").filter((item) =>  item !== value);
    //         if(filterValue.length === 0) searchParams.delete(filterId);
    //     }
    // }
    const handleFilter = (value, filterId) => {
                const searchParams = new URLSearchParams(location.search);
                let filterValue = searchParams.getAll(filterId);
            
                if (filterValue.length > 0 && filterValue[0].split(',').includes(value)) {
                    filterValue = filterValue[0].split(',').filter((item) => item !== value);
            
                    if (filterValue.length === 0) {
                        searchParams.delete(filterId);
                    } else {
                        searchParams.set(filterId, filterValue.join(','));
                    }
                } else {
                    if (filterValue.length > 0) {
                        filterValue = filterValue[0].split(',');
                    }
                    filterValue.push(value);
                    searchParams.set(filterId, filterValue.join(','));
                }
            
                navigate({ search: `?${searchParams.toString()}` });
            };
    return (
        <form className='w-1/4'>
            <div className='hidden sm:inline-block box w-full flex-col gap-2 p-3 mt-2 rounded-xl bg-btn-primary bg-opacity-10'>
                {Filters.map((filter, index) => {
                    return (
                        <Disclosure as="div" key={filter.id} className={`flex flex-col px-2 ${Filters.length - 1 === index ? '' : 'border-b border-divider-color'  }`}>
                            {({open}) => (
                                <>
                                <Disclosure.Button className='flex justify-between py-3'>
                                    <FormLabel id="demo-radio-buttons-group-label" className='text-primary text-md'>{filter.name}</FormLabel>
                                    { open ? (
                                        <FaMinus 
                                            className='w-3 h-3 mt-1 text-primary cursor-pointer'
                                        />
                                    ) : (
                                        <FaPlus     
                                            className='w-3 h-3 mt-1 text-primary cursor-pointer'
                                        />
                                    )}
                                </Disclosure.Button>
                                <Disclosure.Panel className="flex items-center m-1 py-1">
                                    <div className='space-y-2'>
                                    {filter.options.map((option, optionIdx) => (
                                                <div key={option.value} className="py-1 px-4 text-primary">
                                                    <input 
                                                        onChange={() => handleFilter(option.value, filter.id)}
                                                        id={`filter-${filter.id}-${optionIdx}`}
                                                        name={`${filter.id}[]`}
                                                        defaultValue={option.value}
                                                        type="checkbox"
                                                        defaultChecked={option.checked}
                                                        className="h-3 w-3 border border-primary rounded-xl text-primary focus:bg-primary"
                                                    />
                                                    <label
                                                        htmlFor={`filter-${filter.id}-${optionIdx}`}
                                                        className="ml-3 text-sm min-w-0 flex-1 text-primary"
                                                    >
                                                        {option.label}
                                                    </label>
                                                </div>
                                            ))}
                                        {/* <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                defaultValue="female"
                                                name="radio-buttons-group"
                                                //sx={{color: 'primary'}}
                                            >
                                                {filter.options.map((option) => (
                                                    <>
                                                        <FormControlLabel value={option.id} control={<Radio />} label={option.label} sx={{color:'primary'}}/>
                                                    </>
                                                ))}
                                            </RadioGroup>
                                        </FormControl> */}
                                    </div>
                                </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    )
                })}
            </div>
        </form>
    )
}

export default Filters


{/* <input 
                                                        onChange={() => handleFilter(option.value, filter.id)}
                                                        id={`filter-${filter.id}-${optionIdx}`}
                                                        name={`${filter.id}[]`}
                                                        value={option.value}
                                                        type="checkbox"
                                                        //checked={checkedFilters[filter.id]?.includes(option.value) || false}
                                                        //checked={ (e) => handleRadioFilterChange(e,filter.id)}
                                                        className="h-3 w-3 border border-primary rounded-xl text-primary focus:bg-primary"
                                                    />
                                                    <label
                                                        htmlFor={`filter-${filter.id}-${optionIdx}`}
                                                        className="ml-3 text-sm min-w-0 flex-1 text-primary"
                                                    >
                                                        {option.label}
                                                    </label> */}

/* {showFilters && filter.subtitles.map((subtitle) => {
                                return (
                                    // <p key={subtitle} className='p-1 text-primary'>{subtitle}</p>
                                    <div key={subtitle} className="flex items-center m-1">
                                        <input
                                        //id={`filter-mobile-${section.id}-${optionIdx}`}
                                        //name={`${section.id}[]`}
                                        defaultValue={subtitle}
                                        type="checkbox"
                                        //defaultChecked={option.checked}
                                        className="h-4 w-4 border-primary rounded-xl text-indigo-600 focus:bg-indigo-500"
                                        />
                                        <label
                                        //htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                        >
                                        {subtitle}
                                        </label>
                                    </div>
                                )
                            })
                        } */
// <div key={option.value}>
                                                //     <input 
                                                //         id={`filter-${filter.id}-${optionIdx}`}
                                                //         name={`${filter.id}[]`}
                                                //         defaultValue={option.value}
                                                //         type="checkbox"
                                                //         defaultChecked={option.checked}
                                                //         className="h-3 w-3 border border-primary rounded-xl text-primary focus:bg-primary"
                                                //     />
                                                //     <label
                                                //     htmlFor={`filter-${filter.id}-${optionIdx}`}
                                                //     className="ml-3 text-sm min-w-0 flex-1 text-primary"
                                                //     >
                                                //     {option.label}
                                                //     </label>
                                                // </div>