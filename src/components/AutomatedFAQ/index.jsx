import { useState } from "react"

// Liste des questions et réponses fréquentes
const faqList = [
    {
        question: "Comment puis-je passer une commande ?",
        answer:
            "Pour passer une commande, naviguez sur notre site, sélectionnez les produits désirés, ajoutez-les au panier, puis suivez les étapes de paiement. Assurez-vous d'être connecté à votre compte pour finaliser la commande.",
        keywords: ["commande", "commander", "acheter", "achat", "panier"],
    },
    {
        question: "Quels sont les modes de paiement acceptés ?",
        answer:
            "Nous acceptons les paiements par carte bancaire (Visa, Mastercard), PayPal, et les virements bancaires. Pour plus de détails, consultez notre page de paiement lors de la finalisation de votre commande.",
        keywords: ["paiement", "payer", "carte", "virement", "PayPal"],
    },
    {
        question: "Quels sont les délais de livraison ?",
        answer:
            "Les délais de livraison varient selon votre localisation. En général, comptez 3 à 5 jours ouvrables pour les livraisons en Sénégal, et 7 à 14 jours pour les livraisons internationales. Vous recevrez un email de confirmation avec le numéro de suivi une fois votre colis expédié.",
        keywords: ["livraison", "délai", "expédition", "colis", "suivi"],
    },
    {
        question: "Comment puis-je suivre ma commande ?",
        answer:
            "Vous pouvez suivre votre commande en vous connectant à votre compte sur notre site. Dans la section 'Mes commandes', vous trouverez le statut et le numéro de suivi de votre colis. Vous pouvez également utiliser ce numéro sur le site de notre transporteur pour un suivi détaillé.",
        keywords: ["suivi", "suivre", "commande", "colis", "statut"],
    },
    {
        question: "Quelle est votre politique de retour ?",
        answer:
            "Nous offrons une politique de retour de 30 jours pour tous nos produits. Si vous n'êtes pas satisfait de votre achat, vous pouvez nous le retourner dans son état d'origine pour un remboursement ou un échange. Les frais de retour sont à la charge du client, sauf en cas de produit défectueux.",
        keywords: ["retour", "remboursement", "échange", "insatisfait", "défectueux"],
    },
    {
        question: "Comment puis-je contacter le service client ?",
        answer:
            "Vous pouvez contacter notre service client par email à support@ccbme.sn, par téléphone au +221 XX XXX XXXX du lundi au vendredi de 9h à 18h, ou via le formulaire de contact sur notre site. Nous nous efforçons de répondre à toutes les demandes dans un délai de 24 heures ouvrables.",
        keywords: ["contact", "service client", "support", "aide", "assistance"],
    },
    {
        question: "Proposez-vous des réductions ou des promotions ?",
        answer:
            "Oui, nous proposons régulièrement des promotions et des réductions. Inscrivez-vous à notre newsletter pour être informé de nos offres spéciales. Vous pouvez également consulter notre page 'Promotions' pour voir les offres en cours.",
        keywords: ["réduction", "promotion", "offre", "solde", "remise"],
    },
    {
        question: "Quels sont les frais de livraison ?",
        answer:
            "Les frais de livraison varient en fonction du poids de votre commande et de votre localisation. Ils sont calculés automatiquement lors du processus de commande. Nous offrons la livraison gratuite pour toute commande supérieure à 50 000 FCFA au Sénégal.",
        keywords: ["frais", "livraison", "expédition", "coût", "gratuit"],
    },
    {
        question: "Puis-je modifier ou annuler ma commande ?",
        answer:
            "Vous pouvez modifier ou annuler votre commande dans les 2 heures suivant sa passation. Au-delà, contactez rapidement notre service client. Une fois que la commande est en cours de préparation, il n'est plus possible de la modifier ou de l'annuler.",
        keywords: ["modifier", "annuler", "changer", "commande", "annulation"],
    },
    {
        question: "Quels sont les produits disponibles sur votre site ?",
        answer:
            "Nous proposons une large gamme de produits électroniques, informatiques et électroménagers. Vous trouverez des smartphones, ordinateurs, téléviseurs, appareils photo, et bien d'autres. Consultez nos différentes catégories sur le site pour découvrir tous nos produits.",
        keywords: ["produits", "disponible", "gamme", "catalogue", "catégorie"],
    },
]

const AutomatedFAQ = () => {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    const handleQuestionSubmit = (e) => {
        e.preventDefault()
        const automatedAnswer = findAnswer(question)
        setAnswer(automatedAnswer)
    }

    const findAnswer = (query) => {
        const lowercaseQuery = query.toLowerCase()
        for (const item of faqList) {
            if (item.keywords.some((keyword) => lowercaseQuery.includes(keyword))) {
                return item.answer
            }
        }
        return "Désolé, je n'ai pas trouvé de réponse à votre question. Veuillez contacter notre service client pour une assistance personnalisée."
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">FAQ Automatisée</h2>
            <form onSubmit={handleQuestionSubmit} className="mb-4">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Posez votre question ici"
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Obtenir une réponse
                </button>
            </form>
            {answer && (
                <div className="bg-gray-100 p-4 rounded">
                    <h3 className="font-bold mb-2">Réponse :</h3>
                    <p>{answer}</p>
                </div>
            )}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Questions fréquentes :</h3>
                <ul className="list-disc pl-5">
                    {faqList.map((item, index) => (
                        <li key={index} className="mb-2">
                            <button
                                onClick={() => {
                                    setQuestion(item.question)
                                    setAnswer(item.answer)
                                }}
                                className="text-blue-500 hover:underline"
                            >
                                {item.question}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AutomatedFAQ

