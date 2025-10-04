/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */

// export default function ViewMoreTitleCategorie({
//   categoryTitle = "",
//   className,
//   children,
//   seeMoreUrl = "",
// }) {
//   return (
//     <div id="#special" className={`section-wrapper w-full ${className || ""}`}>
//       <div className="container-x mx-auto">
//         <div className=" section-title flex justify-between items-center mb-5">


//           <div className="relative">
//             <h1 className="sm:text-3xl text-2xl font-bold text-qblacktext leading-tight relative z-10 inline-block">
//               {categoryTitle}
//             </h1>
//             <div className="absolute bottom-0 left-0 w-full h-2 bg-bleu-logo opacity-80 -mb-2"></div>
//           </div>


//         </div>
//         <div className="section-content">{children && children}</div>
//       </div>
//     </div>
//   );
// }



// "use client"
// import { useRef } from 'react'
// import { ArrowLeft, ArrowRight } from 'lucide-react'

// export default function ViewMoreTitleCategorie({
//   categoryTitle = "",
//   className,
//   children,
//   seeMoreUrl = "",
// }) {
//   const scrollContainerRef = useRef(null);

//   const scroll = (scrollOffset) => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div id="#special" className={`section-wrapper w-full ${className || ""}`}>
//       <div className="container-x mx-auto">
//         <div className="section-title flex justify-between items-center mb-5">
//           <div className="relative">
//             <h1 className="sm:text-3xl text-2xl font-bold text-qblacktext leading-tight relative z-10 inline-block">
//               {categoryTitle}
//             </h1>
//             <div className="absolute bottom-0 left-0 w-full h-2 bg-bleu-logo opacity-80 -mb-2"></div>
//           </div>
//           <div className="flex space-x-4">
//             <button onClick={() => scroll(-200)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
//               <ArrowLeft size={20} />
//             </button>
//             <button onClick={() => scroll(200)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
//               <ArrowRight size={20} />
//             </button>
//           </div>
//         </div>
//         <div ref={scrollContainerRef} className="section-content custom-scrollbar scrollbar-hide">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"
import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function ViewMoreTitleCategorie({ categoryTitle = "", className, children, seeMoreUrl = "" }) {
  const scrollContainerRef = useRef(null)

  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" })
    }
  }

  return (
    <div className={`section-wrapper w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className="section-title flex justify-between items-center mb-5">
          <div className="relative">
            <h1 className="sm:text-3xl text-2xl font-bold text-qblacktext leading-tight relative z-10 inline-block">
              {categoryTitle}
            </h1>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-bleu-logo opacity-80 -mb-2"></div>
          </div>
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => scroll(-200)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => scroll(200)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div ref={scrollContainerRef} className="section-content overflow-x-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  )
}

