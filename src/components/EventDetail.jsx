import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ScrollTestPng } from "../assets/index";

function EventDetail() {
  return (
    <div className="pt-6 pr-4 w-full bg-green-200">
      EventDetail

        <Swiper
          // install Swiper modules
          modules={[
            Autoplay,
            Mousewheel,
            Navigation,
            Pagination,
            Scrollbar,
            A11y,
          ]}
          spaceBetween={10}
          slidesPerView={2}
          centeredSlides={true}
          slideToClickedSlide={true}
          mousewheel={true}
          initialSlide={1}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: true,
          // }}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          <SwiperSlide>
            <div className="bg-red-200 w-[60%]">
              <img src={ScrollTestPng} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-red-200 w-[60%]">
              <img src={ScrollTestPng} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-red-200 w-[80%]">
              <img src={ScrollTestPng} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-red-200 w-[80%]">
              <img src={ScrollTestPng} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
  );
}

export default EventDetail;
