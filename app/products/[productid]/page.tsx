
"use client"
import React, { useState } from 'react'
import Rating from '../../components/rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faNairaSign } from '@fortawesome/free-solid-svg-icons'
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons/faHeartBroken'
import SectionHeader from '../../components/sectionHeader'
import ProductCard from '../../components/ProductCard'
import { useAccount } from '@/app/layout'
import toast from 'react-hot-toast'
import { Product } from '@/app/types/product'
import getProducts from '@/app/controller/products'

const foryou:Product[] = await getProducts()



function Products({params}:{params:{productid:string}}) {
    const {productid}=params
    let product=foryou.find(({id})=>id==productid)
   const {account,dispatch}=useAccount()
    const [quantity,setquantity]=useState(1)
    const [color,setcolor]=useState("")
    const [image,setimage]=useState(product?.images?.[0]||"")
    const [selectsize,setsize]=useState("")
const addQuantity=()=>{
    setquantity(quantity+1)
}
const reduceQuantity=()=>{
    if(quantity<=1) return
    setquantity(quantity-1)
}
const changeQuantity=(e:any)=>{
    setquantity(e.target.value)
}
 
 
    const addToCart=()=>{
        if(product){

            dispatch({type:"ADD_TO_CART",payload:{
                id:product?.id,
                title:product?.title,
                price:product?.discountPrice ? (product?.price -(product?.price* (product?.discountPrice/100))) :product?.price,
                image:product?.images[0],
                quantity,
                colors:[color],
                sizes:[selectsize],

            }})
            toast.success("Added to cart sucessfully")
        }

    }
    const addToWishlist=()=>{
        if(product){

            dispatch({type:"ADD_TO_WISHLIST",payload:product.id})
            toast.success("Added to WISHLIST sucessfully")
        }
    }
    return (
        <>
        {product ?

        <div className='flex flex-col g-8 px-8'>
            <div className='flex p-8 gap-4'>
                <div className="w-full grid grid-cols-3  gap-2 p-8 ">
                    <div className="col-span-1 flex flex-col gap-4 w-full max-h-[500px] h-full">
                        {product.images.map((img,_) =>

                            <div key={_} onClick={()=>setimage(img)} className={' max-w-[150px] hover:scale-110  bg-slate-500 h-full max-h-[150px] ' + (image==img ? ' scale-110':'')} ><img src={img} alt="" /></div>
                        )

                        }
                    </div>
                    <div className=" w-full col-span-2 ">
                        <div className='min-w-[150px] aspect-square h-full min-h-80 bg-slate-500'><img src={image} alt="" /></div>
                    </div>
                </div>
                <div className='flex flex-col gap-4 p-8 '>
                    <h2 className='capitalize font-bold text-3xl '>{product.title}</h2>
                    <div className='flex'>
                        <Rating rating={4} ratingCount={199} />
                    </div>
                    <div className='text-xl'><FontAwesomeIcon icon={faNairaSign}/>{product.price}</div>
                    <div className='capitalize'>
                       {product.description}
                       </div>
                    <div className='w-full h-[0.5px] bg-slate-500'></div>
                    { product.colors.length > 2 && <div className='flex gap-6 items-center align-middle'>
                        <div className='text-2xl capitalize p-0 m-0'>colours:</div>
                        <div className='flex gap-4 items-center h-full'>
                           { product.colors.map((cl,_)=>(

                               <div key={_} className={' cursor-pointer border rounded-full hover:border-2 w-[20px] h-[20px]'} style={{backgroundColor:cl,border:color==cl? "2px dotted black":""}} onClick={()=>setcolor(cl)}></div>
                           ))
                        }
                        </div>
                    </div>}
                    {product.sizes && product.sizes?.length >2 &&     <div className='flex gap-6 items-center align-middle'>
                        <div className='text-2xl capitalize p-0 m-0'>size:</div>
                        <div className='flex gap-4 items-center h-full'>
                           {product.sizes?.map((size,_)=>(

                               <div key={_} onClick={()=>setsize(size)} className={' cursor-pointer hover:bg-red-600 hover:text-white border-[1px] border-black p-1 px-2 font-semibold hover:border-red-600 rounded uppercase text-sm' + size==selectsize ? ' text-white  border-red-600':''}>{size}</div>
                           ))
                             } </div>

                    </div>}
                    <div className='flex w-full justify-between gap-6 '>
                        <div className='flex border-slate-500 font-semibold border-[1px] text-center text-xl rounded'>
                            <button onClick={reduceQuantity} className='w-full px-4  rounded-s-sm hover:text-white  hover:bg-red-500  text-4xl flex justify-center items-center  text-center '>
                                -
                            </button>
                            <input type="number" value={quantity} onChange={changeQuantity} name="" className='outline-none w-14 border-x-[1px] pl-3 border-slate-500' max={99} min={1}  id="" />
                            <button onClick={addQuantity} className='w-full text-white  bg-red-500  text-3xl px-4 flex justify-center items-center  text-center '>
                                +
                            </button>
                        </div>
                        <button onClick={addToCart} className='w-full bg-red-500 rounded-sm text-white font-bold capitalize '>buy now</button>
                        <div onClick={addToWishlist} className='cursor-pointer p-4 border-[1px] hover:bg-red-500 hover:text-white hover:border-red-500 border-slate-500 rounded-sm'>
                            <i className='fas fa-heart'></i>
                        </div>
                    </div>
                </div>

            </div>
            <div className='w-full my-24 mx-6'>

                <SectionHeader title='Related products' />
                <div className='grid row-auto w-full col-auto grid-cols-[repeat(auto-fit,minmax(230px,1fr))] mb-16  m-auto gap-3 justify-center'>
                    {foryou.filter(c=>c.category==product.category).slice(0,4).map(product => (

                        <ProductCard key={product.id} product={product} />
                    ))}

                </div>
            </div>
        </div>:<div className='flex w-full min-h-[80vh] justify-center align-middle items-center'>
            <h1 className='text-4xl text-center '>PRODUCT NOT AVAILABLE</h1>
        </div>
        }
        </>
    )
}

export default Products