import { Button, Label, TextInput } from "flowbite-react";

import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import Thumbnail from "./Thumbnail";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import commandeService from "../../services/commandeService";
import { toast } from "react-toastify";

export default function TrackingOrder() {
  const [commande, setCommande] = useState(null);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [date, setDate] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleTotrack = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const newCommand = { name, email, date };
    console.log(newCommand);
    try {
      const response = await commandeService.getCommandeTracking({
        newCommand: newCommand,
      });
      setCommande(response);

      toast.success("La commande est trouvée", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("La commande n'est pas trouvée", {
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

  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="tracking-page-wrapper w-full">
        <div className="page-title mb-[40px]">
          <PageTitle
            title="Suivi de commande"
            breadcrumb={[
              { name: "Accueil", path: "/" },
              { name: "Suivi de commande", path: "/tracking-order" },
            ]}
          />
        </div>
        <div className="content-wrapper w-full mb-[40px]">
          <div className="container-x mx-auto">
            <h1 className="text-[22px] text-qblack font-semibold leading-9">
              Suivre votre commande
            </h1>
            <p className="text-[15px] text-qgraytwo leading-8 mb-5">
              Saisissez votre nom de commande et votre identifiant secret.
            </p>
            <div className="w-full bg-white lg:px-[30px] px-5 py-[23px] lg:flex items-center">
              <div className="lg:w-[642px] w-full">
                <div className="mb-3">
                  <div className="input-item mb-5">
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Nom de la commande" />
                    </div>
                    <TextInput
                      id="name"
                      placeholder="S000001"
                      label="Nom de la commande"
                      name="name"
                      type="text"
                      value={name}
                      minLength={4}
                      maxLength={20}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="
                      invalid:border-red-500 invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-item mb-5">
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Adresse Email" />
                    </div>
                    <TextInput
                      id="email"
                      placeholder="exemple@test.com"
                      label="Adresse Email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="
                      invalid:border-red-500 invalid:text-red-600
                      focus:invalid:border-red-500 focus:invalid:ring-red-500"
                    />
                  </div>
                </div>
                <div className="mb-[30px]">
                  <div className="input-item mb-5">
                    <div className="mb-2 block">
                      <Label htmlFor="date" value="Date" />
                    </div>
                    <input
                      id="date"
                      placeholder="yyyy-mm-dd"
                      label="Date"
                      name="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="
                        invalid:border-red-500 invalid:text-red-600
                        focus:invalid:border-red-500 focus:invalid:ring-red-500
                    "
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    type="submit"
                    variant="failure"
                    className=" black-btn mb-6 text-sm text-white w-full h-[50px] font-semibold flex justify-center 
                              hover:bg-red-500  bg-purple items-center"
                    disabled={isLoading}
                    onClick={handleTotrack}
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Suivre maintenant
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex justify-center mt-5 lg:mt-0">
                {!commande ? (
                  <>
                    {" "}
                    <Thumbnail />{" "}
                  </>
                ) : (
                  <>
                    <p>commande trouver: {commande.id} </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
