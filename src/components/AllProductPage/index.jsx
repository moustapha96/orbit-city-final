import { useEffect, useState } from "react";
import BreadcrumbCom from "../BreadcrumbCom";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import Layout from "../Partials/Layout";
import ProductsFilter from "./ProductsFilter";
import ProduitService from "../../services/produitService";
import Categorieservice from "../../services/CategorieService";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function AllProductPage() {
  const { name } = useParams();
  const [categories, setCategories] = useState([]);
  const [startLength, setStartLength] = useState(0);
  const [endLength, setEndLength] = useState(6);
  const [products, setProducts] = useState([]);
  const [produits, setProduits] = useState([]);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLoadMore = () => {
    if (endLength < produits.length) {
      setEndLength(endLength + 8);
      setStartLength(Math.max(0, endLength));
      setShowBackButton(true);
    }
    if (endLength + 8 >= produits.length) {
      setShowLoadMoreButton(false);
    }
  };

  const handleLoadLess = () => {
    if (startLength > 0) {
      setEndLength(startLength);
      setStartLength(Math.max(0, startLength - 8));
      setShowLoadMoreButton(true);
    }
    if (startLength - 8 <= 0) {
      setShowBackButton(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchModels = async () => {
      try {
        const data = await Categorieservice.getCategories();
        setCategories(data);
        const dataP = await ProduitService.getProduits();
        setProducts(dataP);
        setProduits(dataP);
        if (name) {
          setProduits(products.filter((pro) => pro.categ_id === name));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des modèles", error);
      }
      setIsLoading(false);
    };
    fetchModels();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    console.log(searchTerm);
    setSearch(searchTerm);

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    console.log(filteredProducts);
    setProduits(filteredProducts);
  };

  const handleCategoryChange = (categoryId) => {
    const categorySelected = categories.find((c) => c.id === categoryId);

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

    if (filters.category.length === 1) {
      // Un seul filtre de catégorie est sélectionné, on filtre les produits en fonction de cette catégorie
      const filteredProducts = products.filter(
        (product) => product.categ_id === categorySelected.name
      );
      setProduits(filteredProducts);
    } else if (filters.category.length > 1) {
      // Plusieurs filtres de catégorie sont sélectionnés, on filtre les produits en fonction de ces catégories
      const filteredProducts = products.filter((product) =>
        filters.category.includes(product.categ_id)
      );
      setProduits(filteredProducts);
    } else {
      // Aucun filtre de catégorie n'est sélectionné, on affiche tous les produits
      setProduits(products);
    }
  };
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
  const [volume, setVolume] = useState({ min: 10000, max: 500000 });

  const [storage, setStorage] = useState(null);
  const filterStorage = (value) => {
    setStorage(value);
  };
  const [filterToggle, setToggle] = useState(false);
  const handleVolumeChange = (event) => {
    if (!event.target) {
      return;
    }

    const { name, value } = event.target;

    setVolume((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (filters.volume.length === 1) {
      // Un seul filtre de volume est sélectionné, on filtre les produits en fonction de ce volume
      const filteredProducts = products.filter(
        (product) =>
          parseInt(product.price) >= parseInt(volume.min) &&
          parseInt(product.price) <= parseInt(volume.max)
      );
      setProduits(filteredProducts);
    } else if (filters.volume.length > 1) {
      // Plusieurs filtres de volume sont sélectionnés, on filtre les produits en fonction de ces volumes
      const filteredProducts = products.filter(
        (product) =>
          parseInt(product.price) >= parseInt(volume.min) &&
          parseInt(product.price) <= parseInt(volume.max)
      );
      setProduits(filteredProducts);
    } else {
      // Aucun filtre de volume n'est sélectionné, on affiche tous les produits
      setProduits(products);
    }
  };

  return (
    <>
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom />
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-[270px]">
                {isLoading ? (
                  <div className="flex justify-center">
                    <Loader2
                      size={100}
                      className="mr-2 h-4 text-center w-4 animate-spin"
                    />
                  </div>
                ) : (
                  <>
                    <ProductsFilter
                      filterToggle={filterToggle}
                      filterToggleHandler={() => setToggle(!filterToggle)}
                      filters={filters}
                      checkboxHandler={checkboxHandler}
                      volume={volume}
                      volumeHandler={handleVolumeChange}
                      storage={storage}
                      filterstorage={filterStorage}
                      categories={categories}
                      handleCategoryChange={handleCategoryChange}
                      className="mb-[30px]"
                    />
                  </>
                )}
                {/* ads */}
                <div className="w-full hidden lg:block h-[295px]">
                  <img
                    src={`/image7.jpg`}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex-1">
                {isLoading ? (
                  <>
                    {" "}
                    <div className="flex justify-center">
                      <Loader2
                        size={100}
                        className="mr-2 h-4 text-center w-4 animate-spin"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
                      <div>
                        <p className="font-400 text-[13px]">
                          <span className="text-qgray"> Affichage</span>{" "}
                          {Math.max(0, startLength + 1)}–
                          {Math.min(endLength, produits.length)} of{" "}
                          {produits.length} résultats
                        </p>
                      </div>
                      <div>
                        <input
                          type="search"
                          placeholder="Rechercher des produits"
                          value={search}
                          onChange={handleSearch}
                          className="w-full md:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex space-x-3 items-center">
                        {showBackButton && (
                          <div className="flex space-x-3 items-center border-b border-b-qgray">
                            <button
                              className=" hover:text-bleu-500"
                              onClick={handleLoadLess}
                            >
                              {" "}
                              Retour{" "}
                            </button>
                          </div>
                        )}
                        {showLoadMoreButton && (
                          <div className="flex space-x-3 items-center border-b border-b-qgray">
                            <button onClick={handleLoadMore} className="">
                              {" "}
                              charger plus{" "}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                      <DataIteration
                        // datas={produits.filter((product) =>
                        //   filters.category.length
                        //     ? filters.category.includes(product.categ_id)
                        //     : true
                        // )}
                        datas={produits}
                        startLength={Math.max(0, startLength)}
                        endLength={Math.min(endLength, produits.length)}
                      >
                        {({ datas }) => (
                          <div data-aos="fade-up" key={datas.id}>
                            <ProductCardStyleOne datas={datas} />
                          </div>
                        )}
                      </DataIteration>
                    </div>
                    <div className="flex space-x-3 items-center">
                      {showBackButton && (
                        <div className="flex space-x-3 items-center border-b border-b-qgray">
                          <button
                            className=" hover:text-bleu-500"
                            onClick={handleLoadLess}
                          >
                            {" "}
                            Retour{" "}
                          </button>
                        </div>
                      )}
                      {showLoadMoreButton && (
                        <div className="flex space-x-3 items-center border-b border-b-qgray">
                          <button onClick={handleLoadMore} className="">
                            {" "}
                            charger plus{" "}
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
