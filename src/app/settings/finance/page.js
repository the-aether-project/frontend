"use client"
import React, { useState } from 'react';
import { FaPaypal, FaWallet, FaArrowUp, FaArrowDown, FaLink, FaUnlink, FaCheck, FaExclamationCircle } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const FinanceSettings = () => {
    const [balance, setBalance] = useState(250.00);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('esewa');
    const [showLoadModal, setShowLoadModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const [paymentAccounts, setPaymentAccounts] = useState({
        esewa: {
            id: '',
            isLinked: false,
            isVerified: false
        },
        paypal: {
            email: '',
            isLinked: false,
            isVerified: false
        }
    });

    const [transactions] = useState([
        { id: 1, date: '2024-03-15', amount: 50, type: 'Load', method: 'Esewa', status: 'Completed' },
        { id: 2, date: '2024-03-14', amount: 30, type: 'Withdraw', method: 'PayPal', status: 'Processing' },
        { id: 3, date: '2024-03-13', amount: 25, type: 'Load', method: 'Esewa', status: 'Completed' },
        { id: 4, date: '2024-03-12', amount: 45, type: 'Payment', method: 'Wallet', status: 'Completed' },
        { id: 5, date: '2024-03-11', amount: 20, type: 'Withdraw', method: 'PayPal', status: 'Completed' },
    ]);

    const handleAccountLink = async (method) => {
        // Here you would implement the actual account linking logic
        // This would typically involve OAuth flow for PayPal
        // And API integration for Esewa
        console.log(`Linking ${method} account`);
    };

    return (
        <div className="min-h-screen rounded-lg overflow-hidden bg-background text-foreground px-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Finance Settings</h2>

            {/* Balance Card */}
            <div className="bg-muted rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                        <FaWallet className="text-2xl text-blue-600" />
                        <div>
                            <p className="text-sm text-muted-foreground">Available Balance</p>
                            <p className="text-3xl font-semibold">${balance.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setShowLoadModal(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FaArrowUp /> Load
                        </button>
                        <button 
                            onClick={() => setShowWithdrawModal(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FaArrowDown /> Withdraw
                        </button>
                    </div>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
                <div className="space-y-4">
                    {/* Esewa Account */}
                    <div className="p-6 rounded-lg border-2 border-input">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <FaWallet className="text-2xl text-green-600" />
                                <div>
                                    <p className="font-medium">Esewa Account</p>
                                    <p className="text-sm text-muted-foreground">For Nepal transactions</p>
                                </div>
                            </div>
                            {paymentAccounts.esewa.isLinked ? (
                                <span className="flex items-center gap-2 text-green-600">
                                    <FaCheck /> Linked
                                </span>
                            ) : (
                                <button
                                    onClick={() => handleAccountLink('esewa')}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                >
                                    <FaLink /> Link Account
                                </button>
                            )}
                        </div>
                        {!paymentAccounts.esewa.isLinked && (
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    placeholder="Enter Esewa ID"
                                    className="w-full rounded-lg border-2 border-input focus:border-blue-500 bg-background px-3 py-2 focus:outline-none transition-colors"
                                    value={paymentAccounts.esewa.id}
                                    onChange={(e) => setPaymentAccounts(prev => ({
                                        ...prev,
                                        esewa: { ...prev.esewa, id: e.target.value }
                                    }))}
                                />
                            </div>
                        )}
                    </div>

                    {/* PayPal Account */}
                    <div className="p-6 rounded-lg border-2 border-input">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <FaPaypal className="text-2xl text-blue-600" />
                                <div>
                                    <p className="font-medium">PayPal Account</p>
                                    <p className="text-sm text-muted-foreground">For international transactions</p>
                                </div>
                            </div>
                            {paymentAccounts.paypal.isLinked ? (
                                <span className="flex items-center gap-2 text-green-600">
                                    <FaCheck /> Linked
                                </span>
                            ) : (
                                <button
                                    onClick={() => handleAccountLink('paypal')}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                >
                                    <FaLink /> Link Account
                                </button>
                            )}
                        </div>
                        {!paymentAccounts.paypal.isLinked && (
                            <div className="space-y-2">
                                <input
                                    type="email"
                                    placeholder="Enter PayPal Email"
                                    className="w-full rounded-lg border-2 border-input focus:border-blue-500 bg-background px-3 py-2 focus:outline-none transition-colors"
                                    value={paymentAccounts.paypal.email}
                                    onChange={(e) => setPaymentAccounts(prev => ({
                                        ...prev,
                                        paypal: { ...prev.paypal, email: e.target.value }
                                    }))}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
                <div className="bg-muted rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-input">
                            <tr>
                                <th className="text-left p-4">Date</th>
                                <th className="text-left p-4">Type</th>
                                <th className="text-left p-4">Method</th>
                                <th className="text-left p-4">Amount</th>
                                <th className="text-left p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.id} className="border-b border-input">
                                    <td className="p-4">{transaction.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-sm ${
                                            transaction.type === 'Load' 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : transaction.type === 'Withdraw'
                                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                        }`}>
                                            {transaction.type}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            {transaction.method === 'Esewa' ? (
                                                <FaWallet className="text-green-600" />
                                            ) : transaction.method === 'PayPal' ? (
                                                <FaPaypal className="text-blue-600" />
                                            ) : (
                                                <FaWallet className="text-gray-600" />
                                            )}
                                            {transaction.method}
                                        </div>
                                    </td>
                                    <td className="p-4">${transaction.amount}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-sm ${
                                            transaction.status === 'Completed' 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                        }`}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* You'll need to implement the Load and Withdraw modals */}
        </div>
    );
};

export default FinanceSettings;