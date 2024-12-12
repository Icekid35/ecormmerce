import React from 'react'
 interface rtype  {
    rating:number;
    ratingCount:number;
 }
function Rating({rating,ratingCount}:rtype){
  return (
    <div className="flex justify-center items-center space-x-1 text-star">
    {Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`fas fa-star ${i < rating ? "text-star" : "text-gray-300"
          }`}
      ></i>
    ))}
    <span className="text-sm italic font-thin text-secondary">({ratingCount})</span>
  </div>
  )
}

export default Rating