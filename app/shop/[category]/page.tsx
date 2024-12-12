import React from 'react'
import Shop from '../page'

function Page({params}:{params:Promise<{category:string}>}) {
    const {category}=React.use(params)
  return (
    <Shop categoryId={category}/>
  )
}

export default Page