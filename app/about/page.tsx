import { faCircleDollarToSlot, faContactCard, faEye, faShop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Trustie from '../components/trustie'

function About() {
  return (
    <div  className='flex flex-col  w-full gap-10 pb-10 pt-4 md:pt-14 px-2 md:px-10'>
        <div className='grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
            <div className='md:px-8 gap-8 md:py-24 flex flex-col'>
                <h2 className='text-5xl capitalize font-semi'>our story</h2>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi quisquam non minima officia nemo voluptas facere optio? Sint eaque harum voluptatibus perferendis aspernatur quo! Vel maiores error aperiam aut molestiae ea eius similique, repellat praesentium odio eaque? Maxime nulla autem minima ducimus facilis neque nemo, odio aliquam. Commodi, debitis ipsa explicabo voluptas dolorem dolor? Incidunt repudiandae, at nostrum esse sunt ipsa placeat aperiam inventore reprehenderit labore asperiores nam possimus est fugiat autem. Iste voluptatum soluta vitae provident est maxime voluptatem, iusto facilis molestias quas exercitationem suscipit beatae eius deleniti, recusandae incidunt nihil odit? Obcaecati earum odit, iusto velit sequi recusandae!
                </div>
            </div>
            <div className='md:h-[500px] h-[300px] bg-secondary rounded md:min-w-[500px] min-w-[300px] '>

            </div>
        </div>
        <div className='flex flex-wrap w-full md:px-8  justify-center gap-6 cursor-pointer text-center capitalize'>
            <div className='p-4 h-[150px] w-[150px] rounded flex flex-col items-center border gap-4  justify-items-center border-secondary  hover:bg-primary hover:text-header hover:border-none'>
                <div>
                
                <FontAwesomeIcon icon={faEye} width={30} />
                </div>
               
                    <h2 className='font-semibold text-3xl'>20k+</h2>
                    <div className='text-sm'>product views</div>
              
            </div>
            <div className='p-4 h-[150px] w-[150px] rounded flex flex-col items-center border gap-4  justify-items-center border-secondary  hover:bg-primary hover:text-header hover:border-none'>
                <div>
                
                <FontAwesomeIcon icon={faShop} width={30} />
                </div>
               
                    <h2 className='font-semibold text-3xl'>10.5k+</h2>
                    <div className='text-sm'>products active products</div>
            </div>
            <div className='p-4 h-[150px] w-[150px] rounded flex flex-col items-center border gap-4  justify-items-center border-secondary  hover:bg-primary hover:text-header hover:border-none'>
                <div>
                
                <FontAwesomeIcon icon={faContactCard} width={30} />
                </div>
                    <h2 className='font-semibold text-3xl'>5.8k+</h2>
                    <div className='text-sm'>active customers</div>
            </div>
            <div className='p-4 h-[150px] w-[150px] rounded flex flex-col items-center border gap-4  justify-items-center border-secondary  hover:bg-primary hover:text-header hover:border-none'>
                <div>
                
                <FontAwesomeIcon icon={faCircleDollarToSlot} width={30} />
                </div>
                    <h2 className='font-semibold text-3xl'>1k+</h2>
                    <div className='text-sm'>products sold</div>
            </div>
        </div>
        <div className='flex w-full'>
            <Trustie />
        </div>
        <div className='flex w-full'></div>
    </div>
  )
}

export default About