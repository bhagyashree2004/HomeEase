import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="About HomeEase" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Welcome to HomeEase, your trusted platform for connecting skilled professionals with customers seeking reliable home services. We simplify the process of finding and hiring experts such as carpenters, electricians, beauticians, and domestic helpers.</p>
          <p>HomeEase ensures a seamless experience by enabling professionals to showcase their expertise, manage availability, and receive secure payments. Customers can explore ratings, review transparent pricing, and connect with verified professionals in their area.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at HomeEase is to integrate technology with everyday service needs, creating an efficient, trustworthy, and accessible ecosystem for both service providers and customers.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>RELIABILITY:</b>
          <p>Access verified and skilled professionals for all your home service needs.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE:</b>
          <p>Seamlessly book services, manage appointments, and make secure payments.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>TRANSPARENCY:</b>
          <p>View ratings, pricing, and service details upfront to make informed choices.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
