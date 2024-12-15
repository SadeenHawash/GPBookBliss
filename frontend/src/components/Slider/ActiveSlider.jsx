import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, FreeMode } from'swiper/modules'
import { RxArrowTopRight } from 'react-icons/rx'
import { ServiceData } from '../../constants';

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

const ActiveSlider = () => {
    const img = 'https://imgv2-2-f.scribdassets.com/img/word_document/623632583/149x198/12b09b7367/1714669032?v=1';
    return (
        <div className='flex w-full p-5'>
            <Swiper
                breakpoints={
                    {
                        100:{
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        200: {
                            slidesPerView: 2,
                            spaceBetween: 110,
                        },
                        240:{
                            slidesPerView: 2,
                            spaceBetween: 90,
                        },
                        255:{
                            slidesPerView: 2,
                            spaceBetween: 70,
                        },
                        300:{
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        340: {
                            slidesPerView: 3,
                            spaceBetween: 90,
                        },
                        400: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                        },
                        470: {
                            slidesPerView: 5,
                            spaceBetween: 100,
                        },
                        520: {
                            slidesPerView: 5,
                            spaceBetween: 100,
                        },
                        600: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                        730: {
                            slidesPerView: 5,
                            spaceBetween: 60,
                        },
                        830:{
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 130,
                        },
                        1100: {
                            slidesPerView: 5,
                            spaceBetween: 150,
                        },
                        1200: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },

                    }
                }
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, FreeMode]}
            >
                {ServiceData.map((item) => (
                    <SwiperSlide key={item.title}>
                        <div className="flex flex-col gap-6 mb-10 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[130px] w-[100px] lg:h-[250px] lg:w-[200px] overflow-hidden cursor-pointer">
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${item.backgroundImage})` }}
                        />
                        {/* <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-90" />
                        <div className="relative flex flex-col gap-3">
                            <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" />
                            <h1 className="text-xl lg:text-2xl">{item.title} </h1>
                            <p className="lg:text-[18px]">{item.content} </p>
                        </div>
                        <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" /> */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ActiveSlider