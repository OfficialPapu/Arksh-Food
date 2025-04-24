import React from 'react'
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import UseProductDetails from './UseProductDetails'
import "swiper/css"
import "swiper/css/thumbs"
import { Thumbs } from "swiper/modules"

const ProductCarousel = () => {
    const { Product, thumbsSwiper, setThumbsSwiper } = UseProductDetails();
    return (
        <div className="relative flex flex-col md:flex-row gap-1 lg:h-[400px] sm:h-[350px] h-[300px]">
            <div className="md:flex flex-col gap-2 lg:h-[400px] sm:h-[350px] MiniImageBox">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView={6}
                    spaceBetween={10}
                    modules={[Thumbs]}
                    loop={Product.Media.Images.length > 2}
                    watchSlidesProgress
                    direction="vertical"
                    className='min-h-full'
                >
                    {Product.Media.Images.map((image, index) => (
                        <SwiperSlide key={index} className="MiniSwiper">
                            <div className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden">
                                <Image
                                    src={image}
                                    alt={`Product thumbnail ${index + 1}`}
                                    width={56}
                                    height={56}
                                    className="object-cover w-full h-full opacity-[0.7]"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <Swiper
                modules={[Thumbs]}
                slidesPerView={1}
                spaceBetween={20}
                thumbs={{ swiper: thumbsSwiper }}
                loop={Product.Media.Images.length > 2}
                className="lg:h-[400px] lg:w-[400px] sm:h-[350px] sm:w-[350px] h-[300px] w-[300px]"
            >
                {Product.Media.Images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative rounded-lg border lg:h-[400px] lg:w-[400px] sm:h-[350px] sm:w-[350px] h-[300px] w-[300px]">
                            <Image
                                src={image}
                                alt={`Product image ${index + 1}`}
                                fill
                                className="object-contain rounded-lg"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ProductCarousel
