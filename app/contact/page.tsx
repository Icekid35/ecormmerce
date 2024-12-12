"use client"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faPhone } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/button';

function Contact() {
    return (
        <div className='grid md:grid-cols-3 capitalize md:p-10 p-2 gap-y-8 md:gap-8'>
            <div className='flex flex-col gap-6 p-8 shadow-lg bg-accent rounded'>
                <div className='flex gap-4 capitalize font-semibold text-3xl'>
                    <FontAwesomeIcon icon={faPhone } width={30}/> <h2>call to us</h2></div>
                    <div className='flex flex-col gap-3'>

                    <div>
                        
                        We are available 24/7, 7 days a week
                        </div>
                    <div>
                        
                        phone: +2348157899361
                        </div>
                </div>
                <div className='w-full bg-secondary min-h-[1px]'></div>
                <div className='flex gap-4 capitalize font-semibold text-3xl'>
                    <FontAwesomeIcon icon={faMessage} width={30}/>
                 <h2>write to us</h2></div>
                <div className='flex flex-col gap-3'>
                    <div>
                        fill out our form and we will contact you within 24 hours
                        </div>
                    <div>
                        
                        emails: bellohabib682@gmail.com
                        </div>
                    <div>
                        
                        emails: belloicekid@gmail.com
                        </div>
                </div>
            </div>
<div className='col-span-2 p-4 bg-accent shadow-lg flex flex-col gap-4'>
<div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 w-full'>
    <input type="text" required placeholder='Your Name*' name='fname' className='bg-neutral min-w-[200px] w-full rounded-sm p-3 ' />
    <input type="text" required placeholder='Your Phone Number*' className='bg-neutral min-w-[200px] w-full rounded-sm p-3 ' />
    <input type="text" required placeholder='Your Email*' className='bg-neutral min-w-[200px] w-full rounded-sm p-3 ' />
</div>
<textarea name="message" placeholder='Your Message'  required minLength={5} className='h-full  w-full bg-neutral p-5 ' id=""></textarea>
<div className='flex justify-end '>
    <Button cta='SUBMIT'/>
</div>
</div>
        </div>
    )
}

export default Contact