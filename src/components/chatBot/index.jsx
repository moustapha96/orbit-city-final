import { useState, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"



// Liste des questions et réponses fréquentes
const faqList = [
  {
    question: "Comment puis-je passer une commande ?",
    answer:
      "Pour passer une commande sur www.ccbme.sn, suivez ces étapes : 1) Parcourez notre catalogue et ajoutez les produits désirés à votre panier. 2) Cliquez sur l'icône du panier pour vérifier votre commande. 3) Cliquez sur 'Passer la commande'. 4) Connectez-vous à votre compte ou créez-en un. 5) Remplissez les informations de livraison et de paiement. 6) Vérifiez votre commande et cliquez sur 'Confirmer la commande'.",
    keywords: ["commande", "commander", "acheter", "achat", "panier"],
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer:
      "Sur www.ccbme.sn, nous acceptons plusieurs modes de paiement pour votre commodité : 1) Cartes bancaires (Visa, Mastercard) 2) PayPal 3) Virement bancaire 4) Paiement à la livraison (pour certaines zones). Choisissez l'option qui vous convient le mieux lors du processus de paiement.",
    keywords: ["paiement", "payer", "carte", "virement", "PayPal"],
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Les délais de livraison sur www.ccbme.sn varient selon votre localisation : 1) Dakar : 1-2 jours ouvrables 2) Autres régions du Sénégal : 3-5 jours ouvrables 3) International : 7-14 jours ouvrables. Ces délais sont estimatifs et peuvent varier selon la disponibilité des produits et les conditions de transport. Vous recevrez un email de confirmation avec le numéro de suivi une fois votre colis expédié.",
    keywords: ["livraison", "délai", "expédition", "colis", "suivi"],
  },
  {
    question: "Comment puis-je suivre ma commande ?",
    answer:
      "Pour suivre votre commande sur www.ccbme.sn : 1) Connectez-vous à votre compte 2) Allez dans la section 'Mes commandes' 3) Trouvez votre commande et cliquez sur 'Détails' 4) Vous y trouverez le statut actuel et le numéro de suivi 5) Utilisez ce numéro sur le site du transporteur pour un suivi détaillé. Si vous avez des questions, n'hésitez pas à contacter notre service client.",
    keywords: ["suivi", "suivre", "commande", "colis", "statut"],
  },
  {
    question: "Quelle est votre politique de retour ?",
    answer:
      "Notre politique de retour sur www.ccbme.sn est la suivante : 1) Vous avez 14 jours à compter de la réception pour retourner un produit 2) Le produit doit être dans son état d'origine, non utilisé et dans son emballage d'origine 3) Contactez-nous pour initier un retour 4) Les frais de retour sont à votre charge, sauf en cas de produit défectueux 5) Une fois le retour reçu et vérifié, nous procéderons au remboursement ou à l'échange selon votre préférence.",
    keywords: ["retour", "remboursement", "échange", "insatisfait", "défectueux"],
  },
  {
    question: "Comment puis-je contacter le service client ?",
    answer:
      "Pour contacter le service client de www.ccbme.sn : 1) Email : support@ccbme.sn 2) Téléphone : +221 XX XXX XXXX (du lundi au vendredi, 9h-18h) 3) Chat en direct sur notre site 4) Formulaire de contact sur www.ccbme.sn/contact 5) Adresse : [Votre adresse physique]. Nous nous efforçons de répondre à toutes les demandes dans un délai de 24 heures ouvrables.",
    keywords: ["contact", "service client", "support", "aide", "assistance"],
  },
  {
    question: "Proposez-vous des réductions ou des promotions ?",
    answer:
      "Oui, www.ccbme.sn propose régulièrement des promotions : 1) Inscrivez-vous à notre newsletter pour être informé des offres spéciales 2) Consultez notre page 'Promotions' pour les offres en cours 3) Suivez-nous sur les réseaux sociaux pour des promotions exclusives 4) Profitez de notre programme de fidélité pour des réductions régulières 5) Surveillez les ventes flash et les offres saisonnières sur notre site.",
    keywords: ["réduction", "promotion", "offre", "solde", "remise"],
  },
  {
    question: "Quels sont les frais de livraison ?",
    answer:
      "Les frais de livraison sur www.ccbme.sn sont calculés comme suit : 1) Dakar : 2000 FCFA 2) Autres régions du Sénégal : à partir de 3500 FCFA 3) International : tarifs variables selon le pays et le poids. Bonne nouvelle : la livraison est gratuite pour toute commande supérieure à 50 000 FCFA au Sénégal. Les frais exacts sont calculés automatiquement lors du processus de commande.",
    keywords: ["frais", "livraison", "expédition", "coût", "gratuit"],
  },
  {
    question: "Puis-je modifier ou annuler ma commande ?",
    answer:
      "Pour modifier ou annuler une commande sur www.ccbme.sn : 1) Dans les 2 heures suivant la commande : vous pouvez la modifier ou l'annuler depuis votre compte 2) Après 2 heures : contactez immédiatement notre service client 3) Une fois la commande en préparation, les modifications ou annulations ne sont plus possibles 4) En cas d'annulation acceptée, le remboursement sera effectué sous 3-5 jours ouvrables 5) Pour les modifications, des frais supplémentaires peuvent s'appliquer.",
    keywords: ["modifier", "annuler", "changer", "commande", "annulation"],
  },
  {
    question: "Quels sont les produits disponibles sur votre site ?",
    answer:
      "Sur www.ccbme.sn, nous proposons une large gamme de produits électroniques et électroménagers : 1) Smartphones et tablettes 2) Ordinateurs et accessoires informatiques 3) Téléviseurs et home cinéma 4) Électroménager (réfrigérateurs, lave-linge, etc.) 5) Appareils photo et caméras 6) Audio (casques, enceintes) 7) Consoles de jeux et jeux vidéo 8) Domotique et objets connectés. Consultez nos différentes catégories sur le site pour découvrir tous nos produits.",
    keywords: ["produits", "disponible", "gamme", "catalogue", "catégorie"],
  },
]

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const findAnswer = (query) => {
    const lowercaseQuery = query.toLowerCase()
    for (const item of faqList) {
      if (item.keywords.some((keyword) => lowercaseQuery.includes(keyword))) {
        return item.answer
      }
    }
    return "Désolé, je n'ai pas trouvé de réponse à votre question. Veuillez contacter notre service client à support@ccbme.sn pour une assistance personnalisée."
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      const userMessage = { text: message, sender: "user" }
      setMessages((prev) => [...prev, userMessage])

      // Trouver une réponse automatisée
      const botResponse = findAnswer(message)

      // Simuler un délai de réponse du bot
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }])
      }, 1000)

      setMessage("")
    }
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Message de bienvenue
      setMessages([
        {
          text: "Bonjour ! Comment puis-je vous aider aujourd'hui ? N'hésitez pas à me poser des questions sur nos produits, la livraison, ou tout autre sujet concernant www.ccbme.sn.",
          sender: "bot",
        },
      ])
    }
  }, [isOpen, messages.length])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-bleu-logo hover:bg-bleu-claire text-white rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-80 transition-all duration-300 ease-in-out transform origin-bottom-right">
          <div className="bg-bleu-logo text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat CCBME</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${msg.sender === "user" ? "bg-bleu-logo text-white" : "bg-gray-200 text-gray-800"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tapez votre message..."
                className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-bleu-logo"
              />
              <button
                type="submit"
                className="bg-bleu-logo hover:bg-bleu-claire text-white p-2 rounded-md transition-colors"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbot

