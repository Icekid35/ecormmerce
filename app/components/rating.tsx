import React from 'react'
 interface rtype  {
    rating:number;
    ratingCount:number;
 }
function Rating({rating,ratingCount}:rtype){
  return (
    <div className="flex justify-center items-center space-x-1 text-yellow-500">
    {Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < rating ? "text-yellow-500" : "text-gray-300"
          }`}
      ></i>
    ))}
    <span className="text-sm italic font-thin text-slate-500">({ratingCount})</span>
  </div>
  )
}

export default Rating