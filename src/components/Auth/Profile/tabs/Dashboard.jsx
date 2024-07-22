/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { useSelector } from "react-redux";
import { Car, ShoppingBag, ShoppingCart } from "lucide-react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = useSelector((state) => state.user.token);
  const uid = useSelector((state) => state.user.uid);
  console.log(user);
  return (
    <>
      <div className="welcome-msg w-full">
        <div>
          <p className="text-qblack text-lg">
            Hello <span>{user ? user.name : ""}</span>
          </p>

          <h1 className="font-bold text-[24px] text-qblack">
            Bienvenue sur votre profil
          </h1>
        </div>
      </div>
      <div className="quick-view-grid w-full flex justify-between items-center mt-3 ">
        <div className="qv-item w-[252px] h-[208px] bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-6">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <span>
              <ShoppingCart></ShoppingCart>
            </span>
          </div>
          <p className="text-xl text-white group-hover:text-qblacktext mt-5">
            Commandes
          </p>
          <span className="text-[40px] text-white group-hover:text-qblacktext font-bold leading-none mt-1 block">
            656
          </span>
        </div>
        <div className="qv-item w-[252px] h-[208px] bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-6">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <span>
              <Car></Car>
            </span>
          </div>
          <p className="text-xl text-white group-hover:text-qblacktext mt-5">
            Commandes Livrées
          </p>
          <span className="text-[40px] text-white group-hover:text-qblacktext font-bold leading-none mt-1 block">
            656
          </span>
        </div>
        <div className="qv-item w-[252px] h-[208px] bg-qblack group hover:bg-qyellow transition-all duration-300 ease-in-out p-6">
          <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center">
            <span>
              <ShoppingBag></ShoppingBag>
            </span>
          </div>
          <p className="text-xl text-white group-hover:text-qblacktext mt-5">
            Pré commandes
          </p>
          <span className="text-[40px] text-white group-hover:text-qblacktext font-bold leading-none mt-1 block">
            656
          </span>
        </div>
      </div>
      {/* <div className="dashboard-info mt-8 flex grid grid-flow-col justify-stretch  bg-primarygray px-7 py-7">
        <div className="">
          <p className="title text-[22px] font-semibold">
            Informations personnelles
          </p>
          <div className="mt-5">
            <table>
              <tbody>
                <tr className="inline-flex mb-5">
                  <td className="text-base text-qgraytwo w-[100px] block">
                    <div>Name:</div>
                  </td>
                  <td className="text-base text-qblack font-medium">
                    {user ? user.name : ""}
                  </td>
                </tr>
                <tr className="inline-flex mb-5">
                  <td className="text-base text-qgraytwo w-[100px] block">
                    <div>Email:</div>
                  </td>
                  <td className="text-base text-qblack font-medium">
                    {user ? user.email : ""}
                  </td>
                </tr>
                <tr className="inline-flex mb-5">
                  <td className="text-base text-qgraytwo w-[100px] block">
                    <div>Phone:</div>
                  </td>
                  <td className="text-base text-qblack font-medium">
                    {user ? user.partner_phone : "Not found"}
                  </td>
                </tr>
                <tr className="inline-flex mb-5">
                  <td className="text-base text-qgraytwo w-[100px] block">
                    <div>City:</div>
                  </td>
                  <td className="text-base text-qblack font-medium">
                    {user ? user.partner_city : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[1px] h-[164px] bg-[#E4E4E4]"></div>
        <div className="ml-6">
          <p className="title text-[22px] font-semibold">
            Information Personnelles
          </p>
          <div className="mt-5">
            <table>
              <tr className="inline-flex mb-5">
                <td className="text-base text-qgraytwo w-[100px] block">
                  <div>Nom complet:</div>
                </td>
                <td className="text-base text-qblack font-medium">
                  {user ? user.name : ""}
                </td>
              </tr>
              <tr className="inline-flex mb-5">
                <td className="text-base text-qgraytwo w-[100px] block">
                  <div>Email:</div>
                </td>
                <td className="text-base text-qblack font-medium">
                  rafiqulislamsuvobd@gmail.com
                </td>
              </tr>
              <tr className="inline-flex mb-5">
                <td className="text-base text-qgraytwo w-[100px] block">
                  <div>Phone:</div>
                </td>
                <td className="text-base text-qblack font-medium">
                  01792166627
                </td>
              </tr>
              <tr className="inline-flex mb-5">
                <td className="text-base text-qgraytwo w-[100px] block">
                  <div>City:</div>
                </td>
                <td className="text-base text-qblack font-medium">
                  Dhaka,Bangladesh
                </td>
              </tr>
              <tr className="inline-flex mb-5">
                <td className="text-base text-qgraytwo w-[100px] block">
                  <div>Zip:</div>
                </td>
                <td className="text-base text-qblack font-medium">4040</td>
              </tr>
            </table>
          </div>
        </div>
      </div> */}
      <div className="dashboard-info mt-8 flex items-center bg-primarygray px-7 py-7">
        <p className="title text-[22px] font-semibold">
          Informations personnelles
        </p>
        <div className="mt-5 flex flex-wrap">
          <div className="inline-flex mr-5 mb-5">
            <div className="text-base text-qgraytwo w-[100px] block">
              <div>Name:</div>
            </div>
            <div className="text-base text-qblack font-medium">
              {user ? user.name : ""}
            </div>
          </div>
          <div className="inline-flex mr-5 mb-5">
            <div className="text-base text-qgraytwo w-[100px] block">
              <div>Email:</div>
            </div>
            <div className="text-base text-qblack font-medium">
              {user ? user.email : ""}
            </div>
          </div>
          <div className="inline-flex mr-5 mb-5">
            <div className="text-base text-qgraytwo w-[100px] block">
              <div>Phone:</div>
            </div>
            <div className="text-base text-qblack font-medium">
              {user ? user.partner_phone : "Not found"}
            </div>
          </div>
          <div className="inline-flex mr-5 mb-5">
            <div className="text-base text-qgraytwo w-[100px] block">
              <div>City:</div>
            </div>
            <div className="text-base text-qblack font-medium">
              {user ? user.partner_city : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
