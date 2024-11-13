/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import Cart from "../../../Cart";
import Compair from "../../../Helpers/icons/Compair";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";
import { Link, useNavigation } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContext";
import { useContext, useEffect } from "react";

export default function Middlebar({ className }) {


  const {
    user,
    token,
    uid,
    expiresIn,
    refreshToken,
    refreshExpiresIn,
    is_verified,
    logout
  } = useContext(UserContext);


  const navigate = useNavigation()
  // const user = JSON.parse(localStorage.getItem("user"));
  // const [toggleCart, setToggle] = useState(false);
  // const cartHandler = () => {
  //   setToggle(!toggleCart);
  // };

  console.log("j'y suis")
  useEffect(() => {


    if (!user) {
      logout();
      navigate("/login");
    }

    console.log(user);
    console.log(token,
      uid,
      expiresIn,
      refreshToken,
      refreshExpiresIn,
      is_verified)
  }, []);

  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              <Link to="/">
                <img
                  width="152"
                  height="36"
                  src={`/images/logo-2.svg`}
                  alt="logo"
                />
              </Link>
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              <div className="compaire relative">
                <Link to="/products-compaire">
                  <span>
                    <Compair />
                  </span>
                </Link>
                <span className="w-[18px] h-[18px] rounded-full bg-qh2-green absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-white">
                  2
                </span>
              </div>
              <div className="favorite relative">
                <Link to="/wishlist">
                  <span>
                    <ThinLove />
                  </span>
                </Link>
                <span className="w-[18px] h-[18px] rounded-full bg-qh2-green absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-white">
                  1
                </span>
              </div>
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <Link to="/cart">
                    <span>
                      <ThinBag />
                    </span>
                  </Link>
                  <span className="w-[18px] h-[18px] rounded-full bg-qh2-green absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-white">
                    15
                  </span>
                </div>
                {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                {/* hidden group-hover:block" */}
                <Cart className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />
              </div>
              <div>
                {!user ? (
                  <>
                    {" "}
                    <Link to="/login">
                      <span>
                        <ThinPeople />
                      </span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile">
                      <span>
                        <ThinPeople />
                      </span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
