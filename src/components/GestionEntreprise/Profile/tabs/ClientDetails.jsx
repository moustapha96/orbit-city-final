/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */

import { ArrowLeft, Mail, Phone, MapPin, Building, Globe, User, Calendar, Shield } from 'lucide-react';

// interface ClientDetailsProps {
//     client: {
//         id: number;
//         name: string;
//         email: string;
//         partner_phone: string;
//         partner_city: string;
//         company_name: string;
//         country_name: string;
//         is_verified: boolean;
//         role: string;
//         created_at?: string; // Add this if you have the creation date
//     };
//     onBack: () => void;
// }

const ClientDetails = ({ client, onBack }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center mb-6">
                <button
                    onClick={onBack}
                    className="mr-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold">Détails du Client</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center">
                        <User className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="font-semibold">Nom:</span>
                        <span className="ml-2">{client.name}</span>
                    </div>
                    <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="font-semibold">Email:</span>
                        <span className="ml-2">{client.email}</span>
                    </div>
                    <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="font-semibold">Téléphone:</span>
                        <span className="ml-2">{client.partner_phone}</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="font-semibold">Ville:</span>
                        <span className="ml-2">{client.partner_city}</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center">
                        <Building className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="font-semibold">Entreprise:</span>
                        <span className="ml-2">{client.company_name}</span>
                    </div>
                    <div className="flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="font-semibold">Pays:</span>
                        <span className="ml-2">{client.country_name}</span>
                    </div>
                    <div className="flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="font-semibold">Statut:</span>
                        <span className={`ml-2 ${client.is_verified ? 'text-green-500' : 'text-red-500'}`}>
                            {client.is_verified ? 'Actif' : 'Non Actif'}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <User className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="font-semibold">Rôle:</span>
                        <span className="ml-2 capitalize">
                            {client.role == "main_user" ? " (Utilisateur Principal)" : "(Utilisateur Secondaire)"}
                        </span>
                    </div>
                    {client.created_at && (
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                            <span className="font-semibold">Date d'inscription:</span>
                            <span className="ml-2">{new Date(client.created_at).toLocaleDateString()}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientDetails;