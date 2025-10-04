/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
// /* eslint-disable no-unused-vars */
// "use client"

// import { useState, useEffect, useCallback, useMemo, useRef } from "react"
// import { MessageCircle, X, Send, Phone } from "lucide-react"
// import { useAuthContext } from "../../contexts/useAuthContext"
// import { createSimpleCommentaire, getSimpleCommentaire } from "../../services/CommentaireService"
// import { FaWhatsapp } from "react-icons/fa";



// const CommentSection = () => {
//     const { user } = useAuthContext()

//     const [isOpen, setIsOpen] = useState(false)
//     const [formData, setFormData] = useState({
//         name: "",
//         text: "",
//         tel: "",
//     })
//     useEffect(() => {
//         if (user) {
//             setFormData((prev) => ({
//                 ...prev,
//                 name: user.name || "",
//                 tel: user.partner_phone || "",
//             }))
//         }
//     }, [user])


//     const [isSubmitting, setIsSubmitting] = useState(false)

//     // eslint-disable-next-line no-unused-vars
//     const [isSubmitted, setIsSubmitted] = useState(false)



//     const handleInputChange = (e) => {
//         const { name, value } = e.target
//         setFormData((prev) => ({ ...prev, [name]: value }))
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         console.log(formData)
//         if (!formData.name || !formData.text || !formData.tel) return
//         setIsSubmitting(true)
//         try {
//             const data = {
//                 author: formData.name,
//                 text: formData.text,
//                 tel: formData.tel,
//                 date: new Date().toISOString(),
//             }
//             console.log(data)
//             await createSimpleCommentaire(data)
//             setIsSubmitted(true)
//             setTimeout(() => {
//                 setIsOpen(false)
//                 setIsSubmitted(false)
//                 setFormData({ name: user?.name || "", text: "" || "", tel: user?.partner_phone || "" })
//             }, 3000)
//         } catch (error) {
//             console.error("Error posting comment:", error)
//         } finally {
//             setIsSubmitting(false)
//         }
//     }

//     const toggleForm = () => {
//         setIsOpen((prev) => !prev)
//         setIsSubmitted(false)
//         if (user) {
//             setFormData((prev) => ({
//                 ...prev,
//                 name: user.name || "",
//                 tel: user.partner_phone || "",
//             }))
//         }
//     }



//     return <>

//         <div className="fixed top-2/3 right-4 transform -translate-y-1/2 z-50">
//             <div className="fixed bottom-4 right-1 z-50 flex gap-4">
//                 <a
//                     href="https://wa.me/221709221775"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2 shadow-lg flex items-center space-x-2 transition-all duration-300 ease-in-out transform hover:scale-110"
//                     aria-label="Contact WhatsApp"
//                 >

//                     <FaWhatsapp
//                         className="h-7 w-7"
//                         style={{
//                             animation: 'shake 2s ease-in-out infinite'
//                         }}
//                     />
//                 </a>
//             </div>

//         </div>


//     </>
// }

// export default CommentSection




// "use client"

// import { useState, useEffect, useRef } from "react"
// import { X, Phone, HeadphonesIcon, CheckCircle, Clock, UserCheck, Shield } from "lucide-react"
// import { FaWhatsapp } from "react-icons/fa"

// const CommentSection = () => {
//     const [isSavOpen, setIsSavOpen] = useState(false)
//     const [isMobile, setIsMobile] = useState(false)
//     const savPanelRef = useRef(null)

//     useEffect(() => {
//         const checkMobile = () => {
//             setIsMobile(window.innerWidth < 768)
//         }

//         checkMobile()

//         window.addEventListener("resize", checkMobile)

//         return () => {
//             window.removeEventListener("resize", checkMobile)
//         }
//     }, [])

//     const toggleSav = () => {
//         setIsSavOpen(!isSavOpen)
//     }

//     return (
//         <>
//             <div className="fixed bottom-10 right-4 z-50 flex flex-col items-end gap-4">
//                 {/* SAV Panel */}
//                 {isSavOpen && (
//                     <div
//                         ref={savPanelRef}
//                         className={`bg-white rounded-lg shadow-xl p-4 mb-4 animate-popup
//                             ${isMobile ? "fixed inset-x-4 bottom-20 max-h-[70vh] overflow-y-auto" : "w-full max-w-sm"}`}
//                     >
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-lg font-bold text-primary">Notre Service Après-Vente</h3>
//                             <button
//                                 onClick={() => setIsSavOpen(false)}
//                                 className="text-gray-500 hover:text-gray-700"
//                                 aria-label="Fermer"
//                             >
//                                 <X className="h-5 w-5" />
//                             </button>
//                         </div>

//                         <div className="space-y-4">
//                             <div className="flex items-start gap-3">
//                                 <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
//                                 <div>
//                                     <h4 className="font-medium">Suivi personnalisé</h4>
//                                     <p className="text-sm text-gray-600">Un conseiller dédié vous accompagne après votre achat</p>
//                                 </div>
//                             </div>

//                             <div className="flex items-start gap-3">
//                                 <Clock className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
//                                 <div>
//                                     <h4 className="font-medium">Assistance rapide</h4>
//                                     <p className="text-sm text-gray-600">Réponse garantie sous 24h à toutes vos questions</p>
//                                 </div>
//                             </div>

//                             <div className="flex items-start gap-3">
//                                 <UserCheck className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
//                                 <div>
//                                     <h4 className="font-medium">Satisfaction client</h4>
//                                     <p className="text-sm text-gray-600">Nous nous assurons que vous êtes pleinement satisfait</p>
//                                 </div>
//                             </div>

//                             <div className="flex items-start gap-3">
//                                 <Shield className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
//                                 <div>
//                                     <h4 className="font-medium">Produits garantis</h4>
//                                     <p className="text-sm text-gray-600">
//                                         Tous nos produits sont garantis et échangeables selon nos conditions
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="mt-4 pt-3 border-t border-gray-100">
//                                 <h4 className="font-medium mb-2">Contactez notre SAV</h4>
//                                 <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-3`}>
//                                     <a
//                                         href="tel:+221709221775"
//                                         className="flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm transition-colors"
//                                     >
//                                         <Phone className="h-4 w-4" />
//                                         <span>Appeler</span>
//                                     </a>
//                                     <a
//                                         href="https://wa.me/221709221775"
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="flex items-center justify-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-md text-sm transition-colors"
//                                     >
//                                         <FaWhatsapp className="h-4 w-4" />
//                                         <span>WhatsApp</span>
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex gap-3 md:mb-5">
//                     {/* SAV Button */}
//                     <button
//                         id="sav-button"
//                         onClick={toggleSav}
//                         className={`${isSavOpen && isMobile ? "bg-gray-600" : "bg-bleu-logo hover:bg-bleu-claire"}
//                             text-white rounded-full p-3 shadow-lg flex items-center justify-center
//                             transition-all duration-300 ease-in-out transform hover:scale-110`}
//                         aria-label="Service Après-Vente"
//                     >
//                         <HeadphonesIcon className="h-6 w-6" />
//                     </button>

//                     {/* WhatsApp Button */}
//                     <a
//                         href="https://wa.me/221709221775"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110"
//                         aria-label="Contact WhatsApp"
//                     >
//                         <FaWhatsapp
//                             className="h-6 w-6"
//                             style={{
//                                 animation: "shake 2s ease-in-out infinite",
//                             }}
//                         />
//                     </a>
//                 </div>
//             </div>

//             {/* Add this to your global CSS or in a style tag */}
//             <style jsx>{`
//                 @keyframes shake {
//                     0% { transform: rotate(0deg); }
//                     1% { transform: rotate(5deg); }
//                     3% { transform: rotate(-5deg); }
//                     5% { transform: rotate(5deg); }
//                     7% { transform: rotate(-5deg); }
//                     9% { transform: rotate(0deg); }
//                     100% { transform: rotate(0deg); }
//                 }

//                 @keyframes fade-in-right {
//                     from {
//                         opacity: 0;
//                         transform: translateX(20px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateX(0);
//                     }
//                 }

//                 @keyframes zoom-in {
//                     from {
//                         transform: scale(0.8);
//                     }
//                     to {
//                         transform: scale(1);
//                     }
//                 }

//                 @keyframes rotate-in {
//                     from {
//                         transform: rotate(-5deg);
//                     }
//                     to {
//                         transform: rotate(0deg);
//                     }
//                 }

//                 @keyframes bounce {
//                     0%, 20%, 50%, 80%, 100% {
//                         transform: translateY(0);
//                     }
//                     40% {
//                         transform: translateY(-10px);
//                     }
//                     60% {
//                         transform: translateY(-5px);
//                     }
//                 }

//                 .animate-popup {
//                     animation: fade-in-right 0.3s ease-out forwards, zoom-in 0.3s ease-out forwards, rotate-in 0.3s ease-out forwards;
//                 }

//                 .animate-bounce {
//                     animation: bounce 2s infinite;
//                 }
//             `}</style>
//         </>
//     )
// }

// export default CommentSection






// // "use client"

// // import { useState, useEffect, useRef } from "react"
// // import { X, Phone, HeadphonesIcon, CheckCircle, Clock, UserCheck, Shield } from "lucide-react"
// // import { FaWhatsapp } from "react-icons/fa"

// // const CommentSection = () => {
// //     const [isSavOpen, setIsSavOpen] = useState(false)
// //     const [isMobile, setIsMobile] = useState(false)
// //     const [isAnimating, setIsAnimating] = useState(false)
// //     const savPanelRef = useRef(null)
// //     const animationTimeoutRef = useRef(null)

// //     useEffect(() => {
// //         const checkMobile = () => {
// //             setIsMobile(window.innerWidth < 768)
// //         }

// //         checkMobile()

// //         window.addEventListener("resize", checkMobile)

// //         return () => {
// //             window.removeEventListener("resize", checkMobile)
// //         }
// //     }, [])

// //     // Animation périodique des boutons pour attirer l'attention
// //     useEffect(() => {
// //         // Ne pas animer si le panel est ouvert
// //         if (isSavOpen) {
// //             clearTimeout(animationTimeoutRef.current)
// //             setIsAnimating(false)
// //             return
// //         }

// //         const startAnimation = () => {
// //             // Activer l'animation
// //             setIsAnimating(true)

// //             // Désactiver l'animation après 2 secondes
// //             const animationDuration = setTimeout(() => {
// //                 setIsAnimating(false)

// //                 // Planifier la prochaine animation après un délai aléatoire entre 5 et 15 secondes
// //                 animationTimeoutRef.current = setTimeout(
// //                     () => {
// //                         startAnimation()
// //                     },
// //                     Math.random() * 10000 + 5000,
// //                 ) // Entre 5 et 15 secondes
// //             }, 2000)

// //             return animationDuration
// //         }

// //         // Démarrer la première animation après un délai initial
// //         const initialDelay = setTimeout(() => {
// //             startAnimation()
// //         }, 3000)

// //         return () => {
// //             clearTimeout(initialDelay)
// //             clearTimeout(animationTimeoutRef.current)
// //         }
// //     }, [isSavOpen])

// //     const toggleSav = () => {
// //         setIsSavOpen(!isSavOpen)
// //     }

// //     return (
// //         <>
// //             <div className="fixed bottom-10 right-4 z-50 flex flex-col items-end gap-4">
// //                 {/* SAV Panel */}
// //                 {isSavOpen && (
// //                     <div
// //                         ref={savPanelRef}
// //                         className={`bg-white rounded-lg shadow-xl p-4 mb-4 animate-popup
// //                             ${isMobile ? "fixed inset-x-4 bottom-20 max-h-[70vh] overflow-y-auto" : "w-full max-w-sm"}`}
// //                     >
// //                         <div className="flex justify-between items-center mb-4">
// //                             <h3 className="text-lg font-bold text-primary">Notre Service Après-Vente</h3>
// //                             <button
// //                                 onClick={() => setIsSavOpen(false)}
// //                                 className="text-gray-500 hover:text-gray-700"
// //                                 aria-label="Fermer"
// //                             >
// //                                 <X className="h-5 w-5" />
// //                             </button>
// //                         </div>

// //                         <div className="space-y-4">
// //                             <div className="flex items-start gap-3">
// //                                 <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
// //                                 <div>
// //                                     <h4 className="font-medium">Suivi personnalisé</h4>
// //                                     <p className="text-sm text-gray-600">Un conseiller dédié vous accompagne après votre achat</p>
// //                                 </div>
// //                             </div>

// //                             <div className="flex items-start gap-3">
// //                                 <Clock className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
// //                                 <div>
// //                                     <h4 className="font-medium">Assistance rapide</h4>
// //                                     <p className="text-sm text-gray-600">Réponse garantie sous 24h à toutes vos questions</p>
// //                                 </div>
// //                             </div>

// //                             <div className="flex items-start gap-3">
// //                                 <UserCheck className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
// //                                 <div>
// //                                     <h4 className="font-medium">Satisfaction client</h4>
// //                                     <p className="text-sm text-gray-600">Nous nous assurons que vous êtes pleinement satisfait</p>
// //                                 </div>
// //                             </div>

// //                             <div className="flex items-start gap-3">
// //                                 <Shield className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
// //                                 <div>
// //                                     <h4 className="font-medium">Produits garantis</h4>
// //                                     <p className="text-sm text-gray-600">
// //                                         Tous nos produits sont garantis et échangeables selon nos conditions
// //                                     </p>
// //                                 </div>
// //                             </div>

// //                             <div className="mt-4 pt-3 border-t border-gray-100">
// //                                 <h4 className="font-medium mb-2">Contactez notre SAV</h4>
// //                                 <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-3`}>
// //                                     <a
// //                                         href="tel:+221709221775"
// //                                         className="flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm transition-colors"
// //                                     >
// //                                         <Phone className="h-4 w-4" />
// //                                         <span>Appeler</span>
// //                                     </a>
// //                                     <a
// //                                         href="https://wa.me/221709221775"
// //                                         target="_blank"
// //                                         rel="noopener noreferrer"
// //                                         className="flex items-center justify-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-md text-sm transition-colors"
// //                                     >
// //                                         <FaWhatsapp className="h-4 w-4" />
// //                                         <span>WhatsApp</span>
// //                                     </a>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}

// //                 {/* Action Buttons */}
// //                 <div className={`flex gap-3 md:mb-5 ${isAnimating ? "animate-attention" : ""}`}>
// //                     {/* SAV Button */}
// //                     <button
// //                         id="sav-button"
// //                         onClick={toggleSav}
// //                         className={`${isSavOpen ? "bg-gray-600" : "bg-bleu-logo hover:bg-bleu-claire"}
// //                             text-white rounded-full p-3 shadow-lg flex items-center justify-center
// //                             transition-all duration-300 ease-in-out transform hover:scale-110`}
// //                         aria-label="Service Après-Vente"
// //                     >
// //                         <HeadphonesIcon className="h-6 w-6" />
// //                     </button>

// //                     {/* WhatsApp Button */}
// //                     <a
// //                         href="https://wa.me/221709221775"
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                         className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110"
// //                         aria-label="Contact WhatsApp"
// //                     >
// //                         <FaWhatsapp
// //                             className="h-6 w-6"
// //                             style={{
// //                                 animation: "shake 2s ease-in-out infinite",
// //                             }}
// //                         />
// //                     </a>
// //                 </div>
// //             </div>

// //             {/* Add this to your global CSS or in a style tag */}
// //             <style jsx>{`
// //                 @keyframes shake {
// //                     0% { transform: rotate(0deg); }
// //                     1% { transform: rotate(5deg); }
// //                     3% { transform: rotate(-5deg); }
// //                     5% { transform: rotate(5deg); }
// //                     7% { transform: rotate(-5deg); }
// //                     9% { transform: rotate(0deg); }
// //                     100% { transform: rotate(0deg); }
// //                 }

// //                 @keyframes attention {
// //                     0% { transform: translateY(0) scale(1); }
// //                     10% { transform: translateY(-5px) scale(1.05); }
// //                     20% { transform: translateY(0) scale(1); }
// //                     30% { transform: translateY(-5px) scale(1.05); }
// //                     40% { transform: translateY(0) scale(1); }
// //                     50% { transform: translateY(-5px) scale(1.05); }
// //                     60% { transform: translateY(0) scale(1); }
// //                     70% { transform: translateX(-5px); }
// //                     80% { transform: translateX(5px); }
// //                     90% { transform: translateX(-5px); }
// //                     100% { transform: translateX(0); }
// //                 }

// //                 .animate-attention {
// //                     animation: attention 2s ease-in-out;
// //                 }

// //                 @keyframes fade-in-right {
// //                     from {
// //                         opacity: 0;
// //                         transform: translateX(20px);
// //                     }
// //                     to {
// //                         opacity: 1;
// //                         transform: translateX(0);
// //                     }
// //                 }

// //                 @keyframes zoom-in {
// //                     from {
// //                         transform: scale(0.8);
// //                     }
// //                     to {
// //                         transform: scale(1);
// //                     }
// //                 }

// //                 @keyframes rotate-in {
// //                     from {
// //                         transform: rotate(-5deg);
// //                     }
// //                     to {
// //                         transform: rotate(0deg);
// //                     }
// //                 }

// //                 .animate-popup {
// //                     animation: fade-in-right 0.3s ease-out forwards, zoom-in 0.3s ease-out forwards, rotate-in 0.3s ease-out forwards;
// //                 }
// //             `}</style>
// //         </>
// //     )
// // }

// // export default CommentSection



// "use client"

// import { useState, useEffect, useRef } from "react"
// import { X, Phone, HeadphonesIcon, Clock, Shield, Lock, Award } from "lucide-react"
// import { FaWhatsapp } from "react-icons/fa"

// const CommentSection = () => {
//     const [isSavOpen, setIsSavOpen] = useState(false)
//     const [isMobile, setIsMobile] = useState(false)
//     const [isAnimating, setIsAnimating] = useState(false)
//     const savPanelRef = useRef(null)
//     const animationTimeoutRef = useRef(null)
//     const videoRef = useRef(null)

//     useEffect(() => {
//         const checkMobile = () => {
//             setIsMobile(window.innerWidth < 768)
//         }

//         checkMobile()

//         window.addEventListener("resize", checkMobile)

//         return () => {
//             window.removeEventListener("resize", checkMobile)
//         }
//     }, [])

//     // Gestion de la vidéo lorsque le panel s'ouvre
//     useEffect(() => {
//         if (isSavOpen && videoRef.current) {
//             // Jouer la vidéo quand le panel s'ouvre
//             videoRef.current.play().catch((e) => console.log("Lecture automatique empêchée:", e))
//         } else if (!isSavOpen && videoRef.current) {
//             // Mettre en pause la vidéo quand le panel se ferme
//             videoRef.current.pause()
//             videoRef.current.currentTime = 0
//         }
//     }, [isSavOpen])

//     // Animation périodique des boutons pour attirer l'attention
//     useEffect(() => {
//         // Ne pas animer si le panel est ouvert
//         if (isSavOpen) {
//             clearTimeout(animationTimeoutRef.current)
//             setIsAnimating(false)
//             return
//         }

//         const startAnimation = () => {
//             // Activer l'animation
//             setIsAnimating(true)

//             // Désactiver l'animation après 2 secondes
//             const animationDuration = setTimeout(() => {
//                 setIsAnimating(false)

//                 // Planifier la prochaine animation après un délai aléatoire entre 5 et 15 secondes
//                 animationTimeoutRef.current = setTimeout(
//                     () => {
//                         startAnimation()
//                     },
//                     Math.random() * 10000 + 5000,
//                 ) // Entre 5 et 15 secondes
//             }, 2000)

//             return animationDuration
//         }

//         // Démarrer la première animation après un délai initial
//         const initialDelay = setTimeout(() => {
//             startAnimation()
//         }, 3000)

//         return () => {
//             clearTimeout(initialDelay)
//             clearTimeout(animationTimeoutRef.current)
//         }
//     }, [isSavOpen])

//     const toggleSav = () => {
//         setIsSavOpen(!isSavOpen)
//     }

//     return (
//         <>
//             <div className="fixed bottom-10 right-4 z-50 flex flex-col items-end gap-4">
//                 {/* SAV Panel */}
//                 {isSavOpen && (
//                     <div
//                         ref={savPanelRef}
//                         className={`bg-white rounded-lg shadow-xl p-0 mb-4 animate-popup
//                             ${isMobile ? "fixed inset-x-4 bottom-20 max-h-[80vh] overflow-y-auto" : "w-full max-w-sm"}`}
//                     >
//                         {/* Vidéo en haut */}
//                         <div className="relative w-full rounded-t-lg overflow-hidden">
//                             <video
//                                 ref={videoRef}
//                                 className="w-full aspect-video object-cover"
//                                 muted
//                                 playsInline
//                                 loop
//                                 poster="/placeholder.svg?height=200&width=400"
//                             >
//                                 <source src="https://example.com/votre-video.mp4" type="video/mp4" />
//                                 Votre navigateur ne prend pas en charge les vidéos HTML5.
//                             </video>
//                             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 flex items-end">
//                                 <div className="p-4 text-white">
//                                     <h3 className="text-xl font-bold">Votre sécurité, notre priorité</h3>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="p-4">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h3 className="text-lg font-bold text-primary">Service client certifié</h3>
//                                 <button
//                                     onClick={() => setIsSavOpen(false)}
//                                     className="text-gray-500 hover:text-gray-700"
//                                     aria-label="Fermer"
//                                 >
//                                     <X className="h-5 w-5" />
//                                 </button>
//                             </div>

//                             <div className="space-y-4">
//                                 <div className="flex items-start gap-3">
//                                     <Shield className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
//                                     <div>
//                                         <h4 className="font-medium">Protection garantie</h4>
//                                         <p className="text-sm text-gray-600">Un conseiller dédié sécurise votre expérience après achat</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <Clock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
//                                     <div>
//                                         <h4 className="font-medium">Réactivité assurée</h4>
//                                         <p className="text-sm text-gray-600">
//                                             Réponse garantie sous 24h avec suivi sécurisé de vos demandes
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <Award className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
//                                     <div>
//                                         <h4 className="font-medium">Engagement qualité</h4>
//                                         <p className="text-sm text-gray-600">
//                                             Nous garantissons votre satisfaction avec un service fiable et transparent
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <Lock className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
//                                     <div>
//                                         <h4 className="font-medium">Garantie sécurisée</h4>
//                                         <p className="text-sm text-gray-600">
//                                             Tous nos produits sont certifiés, garantis et échangeables selon notre politique de sécurité
//                                         </p>
//                                     </div>
//                                 </div>

//                                 <div className="mt-4 pt-3 border-t border-gray-100">
//                                     <div className="bg-blue-50 p-3 rounded-md mb-4 text-center">
//                                         <p className="text-sm font-medium text-blue-700">Service client certifié et sécurisé</p>
//                                     </div>
//                                     <h4 className="font-medium mb-2">Contactez notre équipe sécurité</h4>
//                                     <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-3`}>
//                                         <a
//                                             href="tel:+221709221775"
//                                             className="flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm transition-colors"
//                                         >
//                                             <Phone className="h-4 w-4" />
//                                             <span>Ligne sécurisée</span>
//                                         </a>
//                                         <a
//                                             href="https://wa.me/221709221775"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="flex items-center justify-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-md text-sm transition-colors"
//                                         >
//                                             <FaWhatsapp className="h-4 w-4" />
//                                             <span>WhatsApp vérifié</span>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className={`flex gap-3 md:mb-5 ${isAnimating ? "animate-attention" : ""}`}>
//                     {/* SAV Button */}
//                     <button
//                         id="sav-button"
//                         onClick={toggleSav}
//                         className={`${isSavOpen ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"}
//                             text-white rounded-full p-3 shadow-lg flex items-center justify-center
//                             transition-all duration-300 ease-in-out transform hover:scale-110`}
//                         aria-label="Service Après-Vente"
//                     >
//                         <HeadphonesIcon className="h-6 w-6" />
//                     </button>

//                     {/* WhatsApp Button */}
//                     <a
//                         href="https://wa.me/221709221775"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110"
//                         aria-label="Contact WhatsApp"
//                     >
//                         <FaWhatsapp
//                             className="h-6 w-6"
//                             style={{
//                                 animation: "shake 2s ease-in-out infinite",
//                             }}
//                         />
//                     </a>
//                 </div>
//             </div>

//             {/* Add this to your global CSS or in a style tag */}
//             <style jsx>{`
//                 @keyframes shake {
//                     0% { transform: rotate(0deg); }
//                     1% { transform: rotate(5deg); }
//                     3% { transform: rotate(-5deg); }
//                     5% { transform: rotate(5deg); }
//                     7% { transform: rotate(-5deg); }
//                     9% { transform: rotate(0deg); }
//                     100% { transform: rotate(0deg); }
//                 }

//                 @keyframes attention {
//                     0% { transform: translateY(0) scale(1); }
//                     10% { transform: translateY(-5px) scale(1.05); }
//                     20% { transform: translateY(0) scale(1); }
//                     30% { transform: translateY(-5px) scale(1.05); }
//                     40% { transform: translateY(0) scale(1); }
//                     50% { transform: translateY(-5px) scale(1.05); }
//                     60% { transform: translateY(0) scale(1); }
//                     70% { transform: translateX(-5px); }
//                     80% { transform: translateX(5px); }
//                     90% { transform: translateX(-5px); }
//                     100% { transform: translateX(0); }
//                 }

//                 .animate-attention {
//                     animation: attention 2s ease-in-out;
//                 }

//                 @keyframes fade-in-right {
//                     from {
//                         opacity: 0;
//                         transform: translateX(20px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateX(0);
//                     }
//                 }

//                 @keyframes zoom-in {
//                     from {
//                         transform: scale(0.8);
//                     }
//                     to {
//                         transform: scale(1);
//                     }
//                 }

//                 @keyframes rotate-in {
//                     from {
//                         transform: rotate(-5deg);
//                     }
//                     to {
//                         transform: rotate(0deg);
//                     }
//                 }

//                 .animate-popup {
//                     animation: fade-in-right 0.3s ease-out forwards, zoom-in 0.3s ease-out forwards, rotate-in 0.3s ease-out forwards;
//                 }
//             `}</style>
//         </>
//     )
// }

// export default CommentSection


"use client"

import { useState, useEffect, useRef } from "react"
import { X, Phone, HeadphonesIcon, CheckCircle, Clock, UserCheck, Shield } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

const CommentSection = () => {
    const [isSavOpen, setIsSavOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const savPanelRef = useRef(null)
    const animationTimeoutRef = useRef(null)
    const videoRef = useRef(null)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()

        window.addEventListener("resize", checkMobile)

        return () => {
            window.removeEventListener("resize", checkMobile)
        }
    }, [])

    // Gestion de la vidéo lorsque le panel s'ouvre
    useEffect(() => {
        if (isSavOpen && videoRef.current) {
            // Jouer la vidéo quand le panel s'ouvre
            videoRef.current.play().catch((e) => console.log("Lecture automatique empêchée:", e))
        } else if (!isSavOpen && videoRef.current) {
            // Mettre en pause la vidéo quand le panel se ferme
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }, [isSavOpen])

    // Animation périodique des boutons pour attirer l'attention
    useEffect(() => {
        // Ne pas animer si le panel est ouvert
        if (isSavOpen) {
            clearTimeout(animationTimeoutRef.current)
            setIsAnimating(false)
            return
        }

        const startAnimation = () => {
            // Activer l'animation
            setIsAnimating(true)

            // Désactiver l'animation après 2 secondes
            const animationDuration = setTimeout(() => {
                setIsAnimating(false)

                // Planifier la prochaine animation après un délai aléatoire entre 5 et 15 secondes
                animationTimeoutRef.current = setTimeout(
                    () => {
                        startAnimation()
                    },
                    Math.random() * 10000 + 5000,
                ) // Entre 5 et 15 secondes
            }, 2000)

            return animationDuration
        }

        // Démarrer la première animation après un délai initial
        const initialDelay = setTimeout(() => {
            startAnimation()
        }, 3000)

        return () => {
            clearTimeout(initialDelay)
            clearTimeout(animationTimeoutRef.current)
        }
    }, [isSavOpen])

    const toggleSav = () => {
        setIsSavOpen(!isSavOpen)
    }

    return (
        <>
            <div className="fixed bottom-10 right-4 z-50 flex flex-col items-end gap-4">
                {/* SAV Panel */}
                {isSavOpen && (
                    <div
                        ref={savPanelRef}
                        className={`bg-white rounded-lg shadow-xl p-0 mb-4 animate-popup
                            ${isMobile ? "fixed inset-x-4 bottom-20 max-h-[80vh] overflow-y-auto" : "w-full max-w-sm"}`}
                    >
                        {/* Vidéo en haut */}
                        {/* <div className="relative w-full rounded-t-lg overflow-hidden">
                            <video
                                ref={videoRef}
                                className="w-full aspect-video object-cover"
                                muted
                                playsInline
                                loop
                                poster="/placeholder.svg?height=200&width=400"
                            >
                                <source src="https://example.com/votre-video.mp4" type="video/mp4" />
                                Votre navigateur ne prend pas en charge les vidéos HTML5.
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 flex items-end">
                                <div className="p-4 text-white">
                                    <h3 className="text-xl font-bold">Votre sécurité, notre priorité</h3>
                                </div>
                            </div>
                        </div> */}

                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-primary">Notre Service Après-Vente</h3>
                                <button
                                    onClick={() => setIsSavOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                    aria-label="Fermer"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium">Suivi personnalisé</h4>
                                        <p className="text-sm text-gray-600">Un conseiller dédié vous accompagne après votre achat</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Clock className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium">Assistance rapide</h4>
                                        <p className="text-sm text-gray-600">Réponse garantie sous 24h à toutes vos questions</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <UserCheck className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium">Satisfaction client</h4>
                                        <p className="text-sm text-gray-600">Nous nous assurons que vous êtes pleinement satisfait</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Shield className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-medium">Produits garantis</h4>
                                        <p className="text-sm text-gray-600">
                                            Tous nos produits sont garantis et échangeables selon nos conditions
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-100">
                                    <div className="bg-blue-50 p-3 rounded-md mb-4 text-center">
                                        <p className="text-sm font-medium text-blue-700">Service client sécurisé et fiable</p>
                                    </div>
                                    <h4 className="font-medium mb-2">Contactez notre SAV</h4>
                                    <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-3`}>
                                        <a
                                            href="tel:+221709221775"
                                            className="flex items-center justify-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm transition-colors"
                                        >
                                            <Phone className="h-4 w-4" />
                                            <span>Appeler</span>
                                        </a>
                                        <a
                                            href="https://wa.me/221709221775"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-1 bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-md text-sm transition-colors"
                                        >
                                            <FaWhatsapp className="h-4 w-4" />
                                            <span>WhatsApp</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className={`flex gap-3 md:mb-5 ${isAnimating ? "animate-attention" : ""}`}>
                    {/* SAV Button */}
                    {/* <button
                        id="sav-button"
                        onClick={toggleSav}
                        className={`${isSavOpen ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"}
                            text-white rounded-full p-3 shadow-lg flex items-center justify-center
                            transition-all duration-300 ease-in-out transform hover:scale-110`}
                        aria-label="Service Après-Vente"
                    >
                        <HeadphonesIcon className="h-6 w-6" />
                    </button> */}


                    <a
                        // href="tel:+221709221775"
                        className="hidden md:flex items-center justify-center gap-1 bg-blue-50 
                        hover:bg-blue-100 text-bleu-logo px-3 py-2 rounded-md text-sm transition-colors duration-300 ease-in-out transform hover:scale-110"
                    >
                        <HeadphonesIcon className="h-6 w-6" />
                        <span>(+221) 70 922 17 75</span>
                    </a>

                    {/* WhatsApp Button */}
                    <a
                        href="https://wa.me/221709221775"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110"
                        aria-label="Contact WhatsApp"
                    >
                        <FaWhatsapp
                            className="h-6 w-6"
                            style={{
                                animation: "shake 2s ease-in-out infinite",
                            }}
                        />
                    </a>
                </div>
            </div>

            {/* Add this to your global CSS or in a style tag */}
            <style jsx>{`
                @keyframes shake {
                    0% { transform: rotate(0deg); }
                    1% { transform: rotate(5deg); }
                    3% { transform: rotate(-5deg); }
                    5% { transform: rotate(5deg); }
                    7% { transform: rotate(-5deg); }
                    9% { transform: rotate(0deg); }
                    100% { transform: rotate(0deg); }
                }

                @keyframes attention {
                    0% { transform: translateY(0) scale(1); }
                    10% { transform: translateY(-5px) scale(1.05); }
                    20% { transform: translateY(0) scale(1); }
                    30% { transform: translateY(-5px) scale(1.05); }
                    40% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-5px) scale(1.05); }
                    60% { transform: translateY(0) scale(1); }
                    70% { transform: translateX(-5px); }
                    80% { transform: translateX(5px); }
                    90% { transform: translateX(-5px); }
                    100% { transform: translateX(0); }
                }

                .animate-attention {
                    animation: attention 2s ease-in-out;
                }

                @keyframes fade-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes zoom-in {
                    from {
                        transform: scale(0.8);
                    }
                    to {
                        transform: scale(1);
                    }
                }

                @keyframes rotate-in {
                    from {
                        transform: rotate(-5deg);
                    }
                    to {
                        transform: rotate(0deg);
                    }
                }

                .animate-popup {
                    animation: fade-in-right 0.3s ease-out forwards, zoom-in 0.3s ease-out forwards, rotate-in 0.3s ease-out forwards;
                }
            `}</style>
        </>
    )
}

export default CommentSection

