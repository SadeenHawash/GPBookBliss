import { Icon } from '@chakra-ui/react'
import { icon } from '@fortawesome/fontawesome-svg-core'
import React from 'react'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa'
import img from '../../../public/getApp.png';

const Footer = () => {
    const sections = [
        {
            title: 'About',
            links: [
                {
                    title: 'About BookBliss',
                    link: '#'
                },
                {
                    title: 'Press',
                    link: '#'
                },
                {
                    title: 'Our blog',
                    link: '#'
                },
                {
                    title: 'Join our team!',
                    link: '#'
                },
                {
                    title: 'Contact us',
                    link: '#'
                },
                {
                    title: 'Invite friends',
                    link: '#'
                }
            ]
        },
        {
            title: 'Support',
            links: [
                {
                    title: 'Help / FAQ',
                    link: '#'
                },
                {
                    title: 'Accessibility',
                    link: '#'
                },
                {
                    title: 'Purchase help',
                    link: '#'
                },
                {
                    title: 'AdChoices',
                    link: '#'
                }
            ]
        },
        {
            title: 'Legal',
            links: [
                {
                    title: 'Terms',
                    link: '#'
                },
                {
                    title: 'Privacy',
                    link: '#'
                },
                {
                    title: 'Copyright',
                    link: '#'
                },
                {
                    title: 'Cookie Preferences',
                    link: '#'
                }
            ]
        }
    ]
    const items = [
        {
            name: 'Instagram',
            icon: FaInstagram,
            link: '#'
        },
        {
            name: 'Twitter',
            icon: FaTwitter,
            link: '#'
        },
        {
            name: 'Facebook',
            Icon: FaFacebook,
            link: '#'
        },
        {
            name: 'Pinterest',
            icon: FaPinterest,
            link: '#'
        }
    ]
    return (
        <>
            <div className='w-full mt-10 text-primary px-2'>
                <div className='max-w-[1240px] mx-auto grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 border-t border-divider-color py-8'>
                    {
                        sections.map((section, index) => (
                            <div key={index}>
                                <h3 className='text-md mb-5'>{section.title}</h3>
                                <ul>
                                    {
                                        section.links.map((link, index) => (
                                            <li key={index} className='py-1 my-2 text-sm text-primary cursor-pointer'>
                                                {/* <Icon as={link.icon} className='mr-2' /> */}
                                                {link.title}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                    ))}
                    <div className='col-span-1 pt-8 md:pt-2'>
                        <h3 className='text-md mb-5'>Social</h3>
                        <ul>
                            {
                                items.map((item, index) => (
                                    <li key={index} className='py-1 my-2 text-sm text-primary cursor-pointer'>
                                        <Icon as={item.icon} className='mr-2' />
                                        {item.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='pt-6 md:pt-2'>
                        <img 
                            src={img}
                            className=' w-[13rem] h-[8rem]'
                        />
                    </div>
                </div>
            </div>
            <div className='flex flex-col max-w-[1240px] text-primary px-2 py-2 justify-between sm:flex-row text-center border-t border-divider-color'>
                <ul className='flex py-4 text-sm gap-3'>
                    <li>Ebooks</li>
                    <li> . </li>
                    <li>Audiobooks</li>
                    <li> . </li>
                    <li>Contact</li>
                    <li> . </li>
                    <li>Blog</li>
                </ul>
                <p className='py-4 text-sm'>Copyright © 2024 BookBliss Inc. All rights reserved.</p>
            </div>
        </>
    )
}

export default Footer