/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */


"use client"

import { useEffect, useState } from "react"
import Layout from "../../Partials/Layout"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "flowbite-react"
import { Loader2 } from "lucide-react"
import userService from "../../../services/userService"
import { toast } from "react-toastify"
import SEOHeader from "../../Partials/Headers/HeaderOne/SEOHeader"

export default function VerifyOTP() {
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState(["", "", "", ""])
    const [otpError, setOtpError] = useState("")
    const [verifyingOtp, setVerifyingOtp] = useState(false)

    useEffect(() => {
        window.scrollTo({ top: 0, left: 100, behavior: "smooth" });
    }, []);


    useEffect(() => {
        // Récupérer l'email depuis les paramètres d'URL
        const params = new URLSearchParams(location.search)
        const emailParam = params.get("email")

        if (!emailParam) {
            toast.error("Information utilisateur manquante. Veuillez vous inscrire à nouveau.", {
                position: "top-center",
                autoClose: 5000,
            })
            navigate("/signup")
            return
        }

        setEmail(emailParam)
    }, [location, navigate])

    const handleOtpChange = (index, value) => {
        if (value.length > 1) {
            value = value.charAt(0)
        }

        if (isNaN(value) && value !== "") {
            return
        }

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // Auto-focus next input
        if (value !== "" && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`)
            if (nextInput) {
                nextInput.focus()
            }
        }
    }

    const verifyOtp = async () => {
        setVerifyingOtp(true)
        setOtpError("")

        const otpValue = otp.join("")
        if (otpValue.length !== 4) {
            setOtpError("Veuillez entrer les 4 chiffres du code OTP")
            setVerifyingOtp(false)
            return
        }

        const body = {
            email: email,
            code: otpValue,
        }
        // console.log(body)
        try {
            // Appel à l'API de vérification OTP
            const response = await userService.verifierCodeOTP(body)
            // console.log(response)
            toast.success("Vérification code réussie !", {
                position: "top-center",
                autoClose: 5000,
            })
            setVerifyingOtp(false)
            navigate("/login?mail=" + email)
        } catch (error) {
            console.log(error)
            // Gestion sécurisée des erreurs pour éviter de rendre des objets
            let errorMessage = "Échec de la vérification du code OTP"

            if (error.response) {
                if (typeof error.response.data === "string") {
                    errorMessage = error.response.data
                } else if (error.response.data && typeof error.response.data.message === "string") {
                    errorMessage = error.response.data.message
                }
            } else if (typeof error.message === "string") {
                errorMessage = error.message
            }

            setOtpError(errorMessage)
            setVerifyingOtp(false)
        }
    }

    const handleResendOtp = async () => {
        try {
            // Appel à l'API pour renvoyer un code OTP
            await userService.resendOtp(email)
            setOtp(["", "", "", ""])
            toast.info("Un nouveau code a été envoyé", {
                position: "top-center",
                autoClose: 3000,
            })
        } catch (error) {
            toast.error("Échec de l'envoi du code. Veuillez réessayer.", {
                position: "top-center",
                autoClose: 3000,
            })
        }
    }

    return (
        <>
            <SEOHeader
                title="CCBM Shop | Vérification OTP"
                description="Vérifiez votre compte CCBM Shop en saisissant le code OTP reçu par email ou SMS."
                keywords="vérification, OTP, code, CCBM Shop, authentification"
            />
            <Layout childrenClasses="pt-0 pb-0">
                <div className="login-page-wrapper w-full py-10">
                    <div className="container-x mx-auto">
                        <div className="flex justify-center">
                            <div className="w-full max-w-md bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0] rounded-md">
                                <div className="w-full">
                                    <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                                        <h1 className="text-[28px] font-bold leading-[40px] text-qblack">Vérification OTP</h1>
                                        <div className="shape -mt-2">
                                            <svg width="172" height="15" viewBox="0 0 172 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0 14.0386C7.40262 5.98596 25.7956 -3.24645 55.5 2.76157C88.3066 9.40708 135.748 13.3711 172 1.97453"
                                                    stroke="#FFBB38"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="otp-verification mt-8">
                                        <div className="text-center mb-6">
                                            <p className="text-base text-qgraytwo">Veuillez entrer le code à 4 chiffres envoyé par email et téléphone </p>
                                            {/* <p className="text-base font-medium text-qblack mt-1">{email}</p> */}
                                        </div>

                                        <div className="otp-inputs flex justify-center gap-3 mb-5">
                                            {[0, 1, 2, 3].map((index) => (
                                                <input
                                                    key={index}
                                                    id={`otp-${index}`}
                                                    type="text"
                                                    maxLength={1}
                                                    className="w-14 h-14 text-center text-2xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={otp[index]}
                                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Backspace" && index > 0 && otp[index] === "") {
                                                            const prevInput = document.getElementById(`otp-${index - 1}`)
                                                            if (prevInput) {
                                                                prevInput.focus()
                                                            }
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        {otpError && <p className="text-red-600 text-center mb-4">{otpError}</p>}

                                        <div className="flex justify-center">
                                            <Button onClick={verifyOtp} disabled={verifyingOtp} className="w-full">
                                                {verifyingOtp ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Vérification en cours...
                                                    </>
                                                ) : (
                                                    "Vérifier le code OTP"
                                                )}
                                            </Button>
                                        </div>

                                        <div className="resend-otp flex justify-center mt-6">
                                            <p className="text-base text-qgraytwo font-normal">
                                                Vous n'avez pas reçu de code?
                                                <button
                                                    type="button"
                                                    className="ml-2 hover:text-bleu-logo text-qblack"
                                                    onClick={handleResendOtp}
                                                >
                                                    Renvoyer
                                                </button>
                                            </p>
                                        </div>

                                        <div className="resend-otp flex justify-center mt-6">
                                            <p className="text-base text-qgraytwo font-normal">
                                                <a
                                                    type="button"
                                                    className="ml-2 hover:text-bleu-logo text-qblack"
                                                    href="/login"
                                                >
                                                    Se connecter
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

