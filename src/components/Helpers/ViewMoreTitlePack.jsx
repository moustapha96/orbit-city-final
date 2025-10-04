/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */

// "use client"
// export default function ViewMoreTitlePack({
//   categoryTitle = "",
//   className,
//   children,
//   seeMoreUrl = "",
// }) {
//   return (
//     <div className={`section-wrapper w-full ${className || ""}`}>
//       <div className="container-x mx-auto">
//         <div className="section-title flex justify-between items-center mb-8">
//           <div className="relative">
//             <h1 className="sm:text-3xl text-2xl font-bold text-qblacktext leading-tight relative z-10 inline-block">
//               {categoryTitle}
//             </h1>
//             <div className="absolute bottom-0 left-0 w-full h-2 bg-bleu-logo opacity-80 -mb-2"></div>
//           </div>
//           {/* {seeMoreUrl && (
//             <div>
//               <Link to={seeMoreUrl} className="group">
//                 <div className="flex items-center space-x-2 text-qblack hover:text-bleu-logo transition-colors duration-300">
//                   <p className="text-base font-semibold">Voir plus</p>
//                   <span className="transform group-hover:translate-x-1 transition-transform duration-300">
//                     <ArrowRight size={20} />
//                   </span>
//                 </div>
//               </Link>
//             </div>
//           )} */}
//         </div>
//         <div className="section-content">{children}</div>
//       </div>
//     </div>
//   )
// }




// "use client"
// import { useRef } from "react"
// import { ArrowLeft, ArrowRight } from "lucide-react"

// export default function ViewMoreTitlePack({ categoryTitle = "", className, children, seeMoreUrl = "", id }) {
//   const scrollContainerRef = useRef(null)

//   const scroll = (scrollOffset) => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" })
//     }
//   }

//   return (
//     <div id={id} className={`section-wrapper w-full ${className || ""}`}>
//       <div className="container-x mx-auto">
//         <div className="section-title flex justify-between items-center mb-8">
//           <div className="relative">
//             <h1 className="sm:text-3xl text-2xl font-bold text-qblacktext leading-tight relative z-10 inline-block">
//               {categoryTitle}
//             </h1>
//             <div className="absolute bottom-0 left-0 w-full h-2 bg-bleu-logo opacity-80 -mb-2"></div>
//           </div>
//           <div className="flex space-x-4">
//             <button
//               onClick={() => scroll(-scrollContainerRef.current.offsetWidth)}
//               className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
//             >
//               <ArrowLeft size={20} />
//             </button>
//             <button
//               onClick={() => scroll(scrollContainerRef.current.offsetWidth)}
//               className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
//             >
//               <ArrowRight size={20} />
//             </button>
//           </div>
//         </div>
//         <div ref={scrollContainerRef} className="section-content overflow-x-auto scrollbar-hide">
//           {children}
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"
import { useEffect, useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function ViewMoreTitlePack({ categoryTitle = "", className, children, seeMoreUrl = "", id }) {
  const scrollContainerRef = useRef(null)

  const scroll = (scrollOffset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" })
    }
  }


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (scrollContainerRef.current) {
  //       scrollContainerRef.current.scrollBy({
  //         left: scrollContainerRef.current.offsetWidth,
  //         behavior: "smooth",
  //       });
  //     }
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div id={id} className={`section-wrapper w-full ${className || ""}`}>
      <div className="container-x mx-auto">
        <div className="section-title flex justify-between items-center mb-8  ">
          <div className="relative">
            <h1 className="sm:text-3xl text-2xl font-bold text-qblacktext leading-tight relative z-10 inline-block">
              {categoryTitle}
            </h1>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-bleu-logo opacity-80 -mb-2"></div>
          </div>
          <div className=" hidden md:flex space-x-4">
            <button
              onClick={() => scroll(-scrollContainerRef.current.offsetWidth)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => scroll(scrollContainerRef.current.offsetWidth)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        <div ref={scrollContainerRef} className="section-content custom-scrollbar scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  )
}

