import React from 'react'

type box={
    icon:string;
    title:string;
    subtitle:string;
}
const Box:React.FC<box>=({title,subtitle,icon})=>{
    return(
        <div className='w-full rounded-sm text-center flex flex-col justify-center items-center max-w-[300px] justify-items-center p-4 py-8'>
            <div><i className={`fas ${icon} p-3`}></i></div>
            <div className='uppercase font-bold '>{title}</div>
            <div className='font-thin text-gray-500 capitalize text-sm'>{subtitle}</div>
        </div>
    )
}
function Trustie() {
  return (
    <div className='flex justify-evenly w-full'>
        <Box title='24/7 customer service' icon='fa-phone' subtitle='friendly 2/7 customer support' />
        <Box title='free and fast delivery' icon='fa-truck' subtitle='free and fast delivery for all orders' />
        <Box title='money back garantee' icon='fa-dollar' subtitle='we return your money within 30 days' />
    </div>
  )
}

export default Trustie