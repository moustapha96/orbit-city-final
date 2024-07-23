/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";

import { Button, Label } from "flowbite-react";

import { Loader2, Pencil } from "lucide-react";
import { UserContext } from "../../../../contexts/UserContext";
import { toast } from "react-toastify";
import userService from "../../../../services/userService";
import { useNavigate } from "react-router-dom";

export default function ProfileTab() {
  const navigate = useNavigate();
  const [profileImg, setprofileImg] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [adresse, setAdresse] = useState("");
  const [telephone, setTelephone] = useState("");
  const [typeProfile, setTypeProfile] = useState("");
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const profileImgInput = useRef(null);
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  const browseprofileImg = () => {
    profileImgInput.current.click();
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setEmail(user.email);
    setTelephone(user.partner_phone);
    setAdresse(user.partner_city);
    setName(user.name);
    const name = "avatar_" + user.id;
    const storedAvatar = localStorage.getItem(name);
    if (storedAvatar) {
      setprofileImg(storedAvatar);
    } else {
      setprofileImg("avatar.png");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      name: name,
      login: email,
      city: adresse,
      phone: telephone,
      email: email,
    };

    try {
      const response = await userService.updateUser(user.id, data);
      setUser(response);
      toast.success("Modification compte réussie !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(response);
      setIsLoading(false);
      navigate("/profile");
    } catch (error) {
      setIsLoading(false);
      console.log("response " + error);
      console.log("response " + error);
      navigate("/profile");
      toast.error("Modification compte Echouée , " + error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setIsLoading(false);
  };

  const profileImgChangHandler = (e) => {
    const file = e.target.files[0];
    const name = "avatar_" + user.id;
    if (file) {
      const imgReader = new FileReader();
      imgReader.onload = (event) => {
        setprofileImg(event.target.result);
        localStorage.setItem(name, event.target.result);
      };
      imgReader.readAsDataURL(file);
    } else {
      setprofileImg("avatar.png");
      localStorage.removeItem(name);
    }
  };

  return (
    <>
      <div className="flex space-x-8">
        <form onSubmit={handleSubmit}>
          <div className="w-[570px] ">
            <div className="input-item flex space-x-2.5 mb-8">
              <div className="w-full h-full">
                <div className="mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="nom" value="Nom Complet" />
                  </div>
                  <input
                    type="text"
                    placeholder="Nom complet"
                    value={`${name}`}
                    onChange={(e) => setName(e.target.value)}
                    name="nom"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                  />
                </div>
              </div>
            </div>
            <div className="input-item flex space-x-2.5 mb-8">
              <div className="w-1/2 h-full">
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email" />
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  value={`${email}`}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                />
              </div>
              <div className="w-1/2 h-full">
                <div className="mb-2 block">
                  <Label htmlFor="tel" value="Téléphone" />
                </div>
                <input
                  type="text"
                  placeholder="Téléphone"
                  value={`${telephone}`}
                  onChange={(e) => setTelephone(e.target.value)}
                  name="phone"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                />
              </div>
            </div>
            <div className="input-item mb-8">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="pays" value="Pays" />
                </div>
                <input
                  type="text"
                  placeholder="Pays"
                  value={`${user.country_name}`}
                  name="nom"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                />
              </div>
            </div>
            <div className="input-item mb-8">
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="adresse" value="Adresse" />
                </div>
                <input
                  type="text"
                  placeholder="Adresse"
                  value={`${adresse}`}
                  onChange={(e) => setAdresse(e.target.value)}
                  name="adresse"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                />
              </div>
            </div>
          </div>
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
                <span> Mise à jour</span>
              </>
            ) : (
              <span> Mettre a jour</span>
            )}
          </Button>
        </form>
        <div className="flex-1">
          <div className="update-logo w-full mb-9">
            <h1 className="text-xl tracking-wide font-bold text-qblack flex items-center mb-2">
              Mettre à jour le profil
              <span className="ml-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C4.47457 0 0 4.47791 0 10C0 15.5221 4.47791 20 10 20C15.5221 20 20 15.5221 20 10C19.9967 4.48126 15.5221 0.00669344 10 0ZM10 16.67C9.53815 16.67 9.16667 16.2985 9.16667 15.8367C9.16667 15.3748 9.53815 15.0033 10 15.0033C10.4618 15.0033 10.8333 15.3748 10.8333 15.8367C10.8333 16.2952 10.4618 16.67 10 16.67ZM11.6098 10.425C11.1078 10.7396 10.8132 11.2952 10.8333 11.8842V12.5033C10.8333 12.9652 10.4618 13.3367 10 13.3367C9.53815 13.3367 9.16667 12.9652 9.16667 12.5033V11.8842C9.14324 10.6861 9.76907 9.56827 10.8032 8.96586C11.4357 8.61781 11.7704 7.90161 11.6366 7.19545C11.5027 6.52276 10.9772 5.99732 10.3046 5.8668C9.40094 5.69946 8.5308 6.29853 8.36346 7.20214C8.34673 7.30254 8.33668 7.40295 8.33668 7.50335C8.33668 7.96519 7.9652 8.33668 7.50335 8.33668C7.0415 8.33668 6.67002 7.96519 6.67002 7.50335C6.67002 5.66265 8.16265 4.17001 10.0067 4.17001C11.8474 4.17001 13.34 5.66265 13.34 7.50669C13.3333 8.71821 12.674 9.83601 11.6098 10.425Z"
                    fill="#374557"
                    fillOpacity="0.6"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-sm text-qgraytwo mb-5 ">
              Profil d'au moins Taille
              <span className="ml-1 text-qblack">300x300</span>. Les gifs
              fonctionnent aussi.
              <span className="ml-1 text-qblack">Max 5 Mo</span>.
            </p>
            <div className="flex xl:justify-center justify-start">
              <div className="relative">
                <div className="sm:w-[198px] sm:h-[198px] w-[199px] h-[199px] rounded-full overflow-hidden relative">
                  <img
                    src={profileImg || `/images/edit-profileimg.jpg`}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <input
                  ref={profileImgInput}
                  onChange={(e) => profileImgChangHandler(e)}
                  type="file"
                  className="hidden"
                />
                <div
                  onClick={browseprofileImg}
                  className="w-[32px] h-[32px] absolute bottom-7 sm:right-0 right-[105px]  bg-blue rounded-full cursor-pointer"
                >
                  <Pencil></Pencil>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
