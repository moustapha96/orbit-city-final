/* eslint-disable react/prop-types */
import { useState } from 'react'

const InstallmentPaymentInput = ({
    maxAmount,
    minAmount,
    onAmountChange
}) => {
    const [amount, setAmount] = useState(minAmount)

    const handleAmountChange = (value) => {
        const newAmount = Math.min(Math.max(value, minAmount), maxAmount)
        setAmount(newAmount)
        onAmountChange(newAmount)
    }

    return (
        <div className="w-full space-y-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Montant à payer</label>
            <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                </span>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                    className="pl-10 pr-4 py-2 w-full text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
            <input
                type="range"
                min={minAmount}
                max={maxAmount}
                step={100}
                value={amount}
                onChange={(e) => handleAmountChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 w-full">
                <span>Min: {minAmount} FCFA</span>
                <span>Max: {maxAmount} FCFA</span>
            </div>
            <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => onAmountChange(amount)}
            >
                Payer {amount} FCFA
            </button>
        </div>
    )
}

export default InstallmentPaymentInput