import React from 'react'
type SectionHeader={
title:string
}
function SectionHeader({title}: SectionHeader) {
  return (
 <>
 <div className='text-red-500 text-xs font-semibold capitalize '>
    <span className=' bg-red-500 mr-2'>ii</span>
    <span>{title}</span>
 </div>
 
 </>
  )
}

export default SectionHeader