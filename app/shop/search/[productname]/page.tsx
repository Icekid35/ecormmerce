import React from 'react'
import Shop from '../../page'

function Page({params}:{params:Promise<{productname:string}>}) {
    const {productname}=React.use(params)
  return (
    <Shop productname={productname}/>
  )
}

export default Page