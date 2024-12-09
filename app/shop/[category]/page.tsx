import React from 'react'
import Shop from '../page'

function page({params}:{params:{category:string}}) {
    const {category}=params
  return (
    <Shop categoryId={category}/>
  )
}

export default page