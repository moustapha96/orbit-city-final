/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import PageTitle from "../Helpers/PageTitle";

import Layout from "../Partials/Layout";

import SEOHeader from "../Partials/Headers/HeaderOne/SEOHeader";

import BannerPub from "./BannerPub";
import ContactService from "../../services/contactService";
import { toast } from "react-toastify";
import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { Button, Label } from "flowbite-react";

export default function Information() {

    useEffect(() => {
        window.scrollTo(
            {
                top: 0,
                left: 0,
                behavior: "smooth",
            }
        );
    }, []);

    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [sujet, setSujet] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(email, nom, sujet, message);
        let data = {
            email: email,
            nom: nom,
            sujet: sujet,
            message: message,
        }
        try {
            const response = await ContactService.sendContact(data);
            toast.success("Mail Contact envoyer !", {
                position: "top-center",
                autoClose: 5000,
            });
            setEmail("");
            setNom("");
            setSujet("");
            setMessage("");
            console.log(response.result);
        } catch (error) {
            console.log(error)
            toast.error("Mail Contact non envoyer !", {
                position: "top-center",
                autoClose: 5000,
            }
            )
        } finally {
            setIsLoading(false);
        }
        setIsLoading(false);
    };


    const slider = useRef(null);
    const prev = () => {
        slider.current.slickPrev();
    };
    const next = () => {
        slider.current.slickNext();
    };
    return (
        <>
            <SEOHeader
                title="CCBM Shop | A propos de CCBM Shop"
                description="Découvrez les meilleures offres sur CCBM Shop, votre destination privilégiée pour l'électroménager de qualité. Explorez nos produits allant des réfrigérateurs aux téléviseurs intelligents, et profitez de promotions exclusives !"
                keywords="électroménager, boutique en ligne d'électroménager, CCBM Shop, ccbme, appareils électroménagers à prix réduits, smart TV, réfrigérateurs modernes, climatiseurs efficaces, promotions électroménager"
            />

            <Layout childrenClasses="pt-0 pb-0">
                <div className="about-page-wrapper w-full">
                    <div className="title-area w-full">
                        <PageTitle
                            title="Informations"
                            breadcrumb={[
                                { name: "Accueil", path: "/" },
                                { name: "Informations", path: "/informations" },
                            ]}
                        />
                    </div>

                    <div className="aboutus-wrapper w-full">
                        <div className="container-x mx-auto">
                            <div className="w-full min-h-[665px] lg:flex lg:space-x-12 items-center pb-10 lg:pb-0">
                                <div className="md:w-[570px] w-full md:h-[560px] h-auto rounded overflow-hidden my-5 lg:my-0">
                                    <img src={`logo.png`} alt="CCBM Shop A propos" className="w-full h" />
                                </div>
                                <div className="content flex-1 bg-gray-100 p-6 rounded shadow-md">
                                    <h1 className="text-[18px] font-medium text-qblack mb-2.5  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-bleu-logo duration-300 ">
                                        À propos de la Boutique
                                    </h1>
                                    <p className="text-[15px] text-qgraytwo leading-7 mb-2.5">
                                        <b>CCBM Shop</b> &nbsp; est une filiale du Groupe CCBM, une
                                        boutique de vente de matériels électroniques en ligne. Nous
                                        nous engageons à offrir une large gamme de produits de haute
                                        qualité à des prix compétitifs. Que vous soyez à la
                                        recherche des dernières innovations technologiques ou
                                        d'appareils électroménagers fiables, nous avons tout ce
                                        qu'il vous faut.
                                    </p>
                                    <ul className="text-[15px] text-qgraytwo leading-7 list-disc ml-5 mb-5">
                                        <li>
                                            Téléviseurs et home cinéma : Transformez votre salon en
                                            véritable cinéma avec nos téléviseurs haute définition et
                                            systèmes home cinéma.
                                        </li>
                                        <li>
                                            Electroménager : Équipez votre maison avec des appareils
                                            électroménagers modernes et efficaces pour simplifier
                                            votre quotidien.
                                        </li>
                                    </ul>

                                    <a href="#contact-form">
                                        <div className="w-[121px] h-10">
                                            <span className="blue-logo-btn">Contacter nous</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-wrapper w-full mb-10">
                        <div className="container-x mx-auto">
                            <div className="main-wrapper w-full lg:flex lg:space-x-[30px]">
                                <div className="lg:w-1/2 w-full">
                                    <h1 className="text-[22px] font-semibold text-qblack leading-[30px] mb-1">
                                        Nos Coordonnées
                                    </h1>
                                    <p className="text-[15px] text-qgraytwo leading-[30px] mb-5">
                                        Remplissez le formulaire ci-dessous ou écrivez-nous. Nous vous
                                        aiderons dans les plus brefs délais possible.
                                    </p>

                                    <div className="xl:flex xl:space-x-[30px] mb-[30px]">
                                        <div className="xl:w-1/2 w-full  h-[196px] flex flex-col item justify-center bg-[#FFEAE5] p-5">
                                            <div className="flex justify-center mb-3 ">
                                                <Phone></Phone>
                                            </div>
                                            <p className="text-[22px] text-black leading-[30px] text-center font-semibold">
                                                Téléphone
                                            </p>
                                            <p className="text-[15px] text-black leading-[30px] text-center">
                                                +(221) 70 922 17 75
                                            </p>
                                        </div>
                                        <div className="xl:w-1/2 w-full h-[196px] flex flex-col item justify-center bg-[#D3EFFF] p-5">
                                            <div className="flex justify-center mb-3 ">
                                                <Mail></Mail>
                                            </div>
                                            <p className="text-[22px] text-black leading-[30px] text-center font-semibold">
                                                Email
                                            </p>
                                            <p className="text-[15px] text-black leading-[30px] text-center">
                                                shop@ccbm.sn
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col justify-between w-full bg-[#E7F2EC]">
                                        <div className="flex space-x-5">
                                            <span>
                                                <MapPin></MapPin>
                                            </span>
                                            <div>
                                                <h1 className="text-[22px] font-semibold text-qblack leading-[30px] mb-2">
                                                    Address
                                                </h1>
                                                <p className="text-[15px] text-qblack leading-[30px]">
                                                    Avenue Lamine Gueye,x Rue Marchand <br />
                                                    Dakar-Senegal.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-full h-[206px] mt-5">
                                            <iframe
                                                title="CCBM SHOP"
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.561291986447!2d-17.44087212425773!3d14.680820775106305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172569fa40e79%3A0x2d2fbc74fe6d15b0!2sCCBM%20Automobile!5e0!3m2!1sfr!2ssn!4v1720704349629!5m2!1sfr!2ssn"
                                                width="600"
                                                height="450"
                                                style={{ border: "0", width: "100%", height: "100%" }}
                                                allowfullscreen=""
                                                loading="lazy"
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                                <div id="contact-form" className="flex-1 bg-white sm:p-10 p-3">
                                    <div className="title flex flex-col items-center">
                                        <h1 className="text-[34px] font-bold text-qblack">
                                            CCBM Shop
                                        </h1>
                                        <span className="-mt-5 block">
                                            <svg
                                                width="354"
                                                height="30"
                                                viewBox="0 0 354 30"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                                                    stroke="#FFBB38"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="inputs mt-5">
                                            <div className="mb-4">
                                                <div className="mb-2 block">
                                                    <Label htmlFor="nom" value="Nom Complet" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Nom complet"
                                                    value={`${nom}`}
                                                    name="nom"
                                                    onChange={(e) => setNom(e.target.value)}
                                                    required
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                                                            invalid:text-red-600
                                                            focus:invalid:border-red-500 focus:invalid:ring-red-500"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <div className="mb-2 block">
                                                    <Label htmlFor="email" value="Email" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Email"
                                                    value={`${email}`}
                                                    name="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                                                        invalid:text-red-600
                                                        focus:invalid:border-red-500 focus:invalid:ring-red-500"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <div className="mb-2 block">
                                                    <Label htmlFor="sujet" value="Sujet" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="sujet"
                                                    value={`${sujet}`}
                                                    name="sujet"
                                                    onChange={(e) => setSujet(e.target.value)}
                                                    required
                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                                        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                                                        invalid:text-red-600
                                                        focus:invalid:border-red-500 focus:invalid:ring-red-500"
                                                />
                                            </div>
                                            <div className="mb-5">
                                                <div className="mb-2 block">
                                                    <Label htmlFor="message" value="Message" />
                                                </div>
                                                <textarea
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    placeholder="Type your message here"

                                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                                                                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                                                                invalid:text-red-600
                                                                focus:invalid:border-red-500 focus:invalid:ring-red-500"
                                                ></textarea>
                                            </div>
                                            <div>
                                                <Button
                                                    type="submit"
                                                    variant="failure"
                                                    className=" black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center 
                                                            hover:bg-red-500  bg-purple items-center"
                                                    disabled={isLoading}
                                                >
                                                    {isLoading == true ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            <span>en cours d'envoyer</span>
                                                        </>
                                                    ) : (
                                                        <span> Envoyer</span>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>

                    <BannerPub />

                    {/* <div className="blog-post-wrapper w-full mb-[30px]">
          <div className="container-x mx-auto">
            <div className="blog-post-title flex justify-center items-cente mb-[30px]">
              <h1 className="text-3xl font-semibold text-qblack">
                My Latest News
              </h1>
            </div>

            <div className="blogs-wrapper w-full">
              <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-5">
                <DataIteration datas={blog.blogs} startLength={0} endLength={2}>
                  {({ datas }) => (
                    <div
                      data-aos="fade-up"
                      key={datas.id}
                      className="item w-full"
                    >
                      <BlogCard datas={datas} />
                    </div>
                  )}
                </DataIteration>
              </div>
            </div>
          </div>
        </div> */}
                </div>
            </Layout>
        </>
    );
}
