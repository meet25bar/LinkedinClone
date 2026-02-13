import { Info } from 'lucide-react';
import React from 'react'

interface NAVITEMS{
  heading:string,
  subheading:string
}
const newsItem:NAVITEMS[] =[
 
  {
    heading: "E-Retailer retag health drinks",
    subheading: "4h ago · 345 readers"
  },
  {
    heading: "AI beats humans in stock predictions",
    subheading: "2h ago · 1.2k readers"
  },
  {
    heading: "Tech salaries surge in 2025",
    subheading: "6h ago · 980 readers"
  },
  {
    heading: "Startups cut down on remote work",
    subheading: "1d ago · 1.5k readers"
  }
];



const News = () => {
  return (
    <div className='hidden md:block w-[25%] bg-white h-fit rounded-lg border border-gray-300 '>
      <div className='flex items-center justify-between p-3'>
        <h1 className='font-medium'>LinkedIn News</h1>
<Info size={18}/>
      </div>
      <div>{
newsItem.map((item, index)=>{
  return(
    <div key={index} className='px-3 py-2 hover:bg-gray-200 hover:cursor-pointer'>
      <h1 className='text-sm font-medium'>{item.heading}</h1>
      <p className='text-xs text-gray-600'>{item.subheading}</p>
    </div>
  )
})
      }
      </div>
    </div>
  )
}

export default News
