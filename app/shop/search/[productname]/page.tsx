import React from 'react'
import Shop from '../../page'

function page({params}:{params:{productname:string}}) {
    const {productname}=params
  return (
    <Shop productname={productname}/>
  )
}

export default page