import React from 'react';

const Contact = () => {
  return (
    <div className='px-6 py-12'>
      <div className='text-center text-2xl text-[#707070]'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='mt-10 flex flex-col md:flex-row gap-12'>
        <div className='md:w-2/4 text-sm text-gray-600'>
          <p className='mb-4'>Have questions or need assistance? Reach out to us, and we'll be happy to help you with your inquiries regarding HomeEase services.</p>
          <p><b className='text-gray-800'>Email:</b> support@homeease.com</p>
          <p><b className='text-gray-800'>Phone:</b> +91 98765 43210</p>
          <p><b className='text-gray-800'>Address:</b> 123, HomeEase Street, Mumbai, India</p>
        </div>

        <form className='flex flex-col gap-4 md:w-2/4'>
          <input type='text' placeholder='Your Name' className='border p-3 rounded-md' required />
          <input type='email' placeholder='Your Email' className='border p-3 rounded-md' required />
          <textarea placeholder='Your Message' rows='4' className='border p-3 rounded-md' required></textarea>
          <button type='submit' className='bg-primary text-white py-2 px-6 rounded-md hover:bg-opacity-90 transition-all'>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
