import React from 'react'
type SectionHeader={
title:string
}
function SectionHeader({title}: SectionHeader) {
  return (
 <>
 <div className='text-primary text-xs font-semibold capitalize '>
    <span className=' bg-primary mr-2'>ii</span>
    <span>{title}</span>
 </div>
 
 </>
  )
}

export default SectionHeader