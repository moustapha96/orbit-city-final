import { RotateCw, ShieldCheck, Trophy, Truck } from "lucide-react";

export default function BannerPub({ className, type = 3 }) {
  return (
    <div className="container-x mx-auto my-[60px]">
      <div
        data-aos="fade-down"
        className="best-services w-full  flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10 bg-bleu-logo "
        // style={{ backgroundColor: bgColor }}
      >
        <div className="item">
          <div className="flex space-x-5 items-center">
            <div>
              <span>
                <Truck color="white" size={40} />
              </span>
            </div>
            <div>
              <p className="text-white text-[15px] font-700 tracking-wide mb-1 uppercase">
                Livraison gratuite sur Dakar
              </p>
            </div>
          </div>
        </div>
        {/* <div className="item">
          <div className="flex space-x-5 items-center">
            <div>
              <span>
                <RotateCw size={40} color="white" />
              </span>
            </div>
            <div>
              <p className="text-white text-[15px] font-700 tracking-wide mb-1 uppercase">
                Retour gratuit sur 30 Jours
              </p>
            </div>
          </div>
        </div> */}
        <div className="item">
          <div className="flex space-x-5 items-center">
            <div>
              <span>
                <ShieldCheck size={40} color="white" />
              </span>
            </div>
            <div>
              <p className="text-white text-[15px] font-700 tracking-wide mb-1 uppercase">
                Paiement en ligne 100% sécurisé
              </p>
              {/* <p className="text-sm text-white">
                      Paiement en ligne 100% sécurisé
                    </p> */}
            </div>
          </div>
        </div>
        <div className="item">
          <div className="flex space-x-5 items-center">
            <div>
              <span>
                {" "}
                <Trophy size={40} color="white" />{" "}
              </span>
            </div>
            <div>
              <p className="text-white text-[15px] font-700 tracking-wide mb-1 uppercase">
                {/* Meilleure qualité */}
                Garantie du produit original
              </p>
              {/* <p className="text-sm text-white">
                      Garantie du produit original
                    </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
