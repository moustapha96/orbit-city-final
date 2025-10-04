import { Link } from "react-router-dom";
import BreadcrumbCom from "../BreadcrumbCom";
import Layout from "../Partials/Layout";
import ErrorThumb from "./ErrorThumb";

export default function FourZeroFour() {
  return (
    <Layout>
      <div className="cart-page-wrapper w-full">
        <div className="container-x mx-auto">
          <BreadcrumbCom paths={[{ name: "Accueil", path: "/" }]} />
          <div className="empty-card-wrapper w-full">
            <div className="flex justify-center items-center w-full">
              <div>
                <div className="sm:mb-10 mb-0 transform sm:scale-100 scale-50">
                  <ErrorThumb />
                </div>
                <div data-aos="fade-up" className="empty-content w-full">
                  <h1 className="sm:text-xl text-base font-semibold text-center mb-5">
                    Désolé ! Nous ne trouvons pas cette page !
                  </h1>
                  <Link to="/boutique">
                    <div className="flex justify-center w-full">
                      <div className="w-[180px] h-[50px]">
                        <span type="button" className="blue-logo-btn">
                          Retour à la boutique
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
