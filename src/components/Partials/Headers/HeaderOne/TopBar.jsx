/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Arrow from "../../../Helpers/icons/Arrow";
import Selectbox from "../../../Helpers/Selectbox";
import { useSelector } from "react-redux";

export default function TopBar({ className }) {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <div
        className={`w-full bg-white h-10 border-b border-qgray-border ${
          className || ""
        }`}
      >
        <div className="container-x mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            <div className="topbar-nav">
              <ul className="flex space-x-6">
                <li>
                  {!user ? (
                    <>
                      {" "}
                      <Link to="/login">
                        <span className="text-xs leading-6 text-qblack font-500">
                          Mon compte
                        </span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/profile">
                        <span className="text-xs leading-6 text-qblack font-500">
                          Mon compte
                        </span>
                      </Link>
                    </>
                  )}
                </li>
                <li>
                  <Link to="/tracking-order">
                    <span className="text-xs leading-6 text-qblack font-500">
                      Track Order
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/faq">
                    <span className="text-xs leading-6 text-qblack font-500">
                      Support
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div className="topbar-dropdowns sm:block hidden">
              <div className="flex space-x-6">
                <div className="country-select flex space-x-1 items-center">
                  <div>
                    <img
                      src={`${
                        import.meta.env.VITE_PUBLIC_URL
                      }/images/country-logo-16x16.png`}
                      width="16"
                      height="16"
                      alt="country logo"
                      className="overflow-hidden rounded-full"
                    />
                  </div>
                  <Selectbox
                    className="w-fit"
                    datas={["United State", "Bangladesh", "India"]}
                  />
                  <div>
                    <Arrow className="fill-current qblack" />
                  </div>
                </div>
                <div className="currency-select flex space-x-1 items-center">
                  <Selectbox className="w-fit" datas={["USD", "BDT"]} />
                  <Arrow className="fill-current qblack" />
                </div>
                <div className="language-select flex space-x-1 items-center">
                  <Selectbox
                    className="w-fit"
                    datas={["Français", "english"]}
                  />
                  <Arrow className="fill-current qblack" />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
