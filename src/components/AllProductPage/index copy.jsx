import { useEffect, useState } from "react";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";
import ProductsFilter from "./ProductsFilter";
import ProduitService from "../../services/produitService";
import Categorieservice from "../../services/categorieservice";

export default function AllProductPageSecond() {
  const [categories, setCategories] = useState([]);
  const [endLength, setEndLength] = useState(0);

  const handleLoadMore = () => {
    setEndLength(endLength + 6);
  };

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await Categorieservice.getCategories();
        setCategories(data);
        console.log(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
      }
    };
    fetchModels();
  }, []);

  const [filters, setFilter] = useState({
    sizeS: false,
    sizeM: false,
    sizeL: false,
    sizeXL: false,
    sizeXXL: false,
    sizeFit: false,
    category: [],
  });

  const checkboxHandler = (e) => {
    const { name } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const [volume, setVolume] = useState({ min: 200, max: 500 });

  const [storage, setStorage] = useState(null);
  const filterStorage = (value) => {
    setStorage(value);
  };
  const [filterToggle, setToggle] = useState(false);
  const [products, setProducts] = useState([]);
  // const { products } = productDatas;
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const data = await ProduitService.getProduits();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
      }
    };
    fetchModels();
  }, []);

  const handleCategoryChange = (categoryId) => {
    console.log(categoryId);
    setFilter((prevState) => {
      const categoryIndex = prevState.category.indexOf(categoryId);
      if (categoryIndex === -1) {
        // La catégorie n'est pas encore sélectionnée, on l'ajoute
        return { ...prevState, category: [...prevState.category, categoryId] };
      } else {
        // La catégorie est déjà sélectionnée, on la retire
        return {
          ...prevState,
          category: prevState.category.filter((id) => id !== categoryId),
        };
      }
    });
  };

  return (
    <>
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom />
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-[270px]">
                <ProductsFilter
                  filterToggle={filterToggle}
                  filterToggleHandler={() => setToggle(!filterToggle)}
                  filters={filters}
                  checkboxHandler={checkboxHandler}
                  volume={volume}
                  volumeHandler={(value) => setVolume(value)}
                  storage={storage}
                  filterstorage={filterStorage}
                  categories={categories}
                  handleCategoryChange={handleCategoryChange}
                  className="mb-[30px]"
                />

                {/* ads */}
                <div className="w-full hidden lg:block h-[295px]">
                  <img
                    src={`/images/ads-5.png`}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex-1">
                <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
                  <div>
                    <p className="font-400 text-[13px]">
                      <span className="text-qgray"> Affichage</span> 1–16 of{" "}
                      {products.length}
                      résultats
                    </p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="font-400 text-[13px]">Sort by:</span>
                    <div className="flex space-x-3 items-center border-b border-b-qgray">
                      <span className="font-400 text-[13px] text-qgray">
                        Default
                      </span>
                      <span>
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 1L5 5L9 1" stroke="#9A9A9A" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setToggle(!filterToggle)}
                    type="button"
                    className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </button>
                </div>
                {/* <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[20px] gap-5 mb-[40px]">
                  <DataIteration
                    datas={products.filter((product) =>
                      filters.category.length
                        ? filters.category.includes(product.categ_id)
                        : true
                    )}
                    startLength={0}
                    endLength={endLength}
                  >
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration>
                </div> */}

                {/* <div className="w-full h-[164px] overflow-hidden mb-[40px]">
                  <img
                    src="banner2.png"
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div> */}
                <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                  <DataIteration
                    datas={products.filter((product) =>
                      filters.category.length
                        ? filters.category.includes(product.categ_id)
                        : true
                    )}
                    startLength={endLength}
                    endLength={endLength + 6}
                  >
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration>
                </div>
                <button onClick={handleLoadMore}>Charger plus</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
