import React from 'react'
type button={
  link?: string;
  cta:string;
  pill?:boolean;
 action?:()=>void;
 disabled?:boolean
}
const  Button: React.FC<button>=({cta, action, link,pill,disabled})=> {
  return (
  <>
   <button disabled={disabled} className={`disabled:bg-slate-500 text-xs bg-red-500 disabled:cursor-not-allowed md:px-4 md:py-2 px-2 py-2 font-semibold ${pill ? "rounded-full" :"rounded-sm"} hover:bg-red-600 transition text-white capitalize `} onClick={action?action:()=>{}}>
           {link ?   <a href={link ? link:"#"}>
              {cta}
                </a>:<div>

              {cta}
                </div> }
              </button></>
  )
}

export default Button