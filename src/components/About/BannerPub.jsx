/* eslint-disable react/prop-types */


/* eslint-disable no-unused-vars */
import { RotateCw, ShieldCheck, Trophy, Truck } from "lucide-react";

export default function BannerPub({ className, type = 3 }) {
  return (
    <div className="container-x mx-auto my-[20px]">
      <div
        data-aos="fade-down"
        className="best-services w-full flex flex-col space-y-4 
        lg:space-y-0 lg:flex-row lg:justify-between 
        lg:items-center lg:h-[70px] px-6 lg:py-0 py-3 bg-bleu-logo"
      >
        {/* <div className="item">
          <div className="flex space-x-4 items-center">
            <div>
              <span>
                <Truck color="white" size={30} />
              </span>
            </div>
            <div>
              <p className="text-white text-[14px] font-700 tracking-wide uppercase">
                Livraison gratuite sur Dakar
              </p>
            </div>
          </div>
        </div> */}
        <div className="item">
          <div className="flex space-x-4 items-center">
            <div>
              <span>
                <Truck color="white" size={30} />
              </span>
            </div>
            <div>
              <p className="text-white text-[14px] font-700 tracking-wide uppercase">
                Garantie 12 mois + SAV
              </p>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="flex space-x-4 items-center">
            <div>
              <span>
                <ShieldCheck size={30} color="white" />
              </span>
            </div>
            <div>
              <p className="text-white text-[14px] font-700 tracking-wide uppercase">
                Paiement en ligne 100% sécurisé
              </p>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="flex space-x-4 items-center">
            <div>
              <span>
                <Trophy size={30} color="white" />
              </span>
            </div>
            <div>
              <p className="text-white text-[14px] font-700 tracking-wide uppercase">
                Produit de qualité
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
