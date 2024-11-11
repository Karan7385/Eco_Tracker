import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Action from './Action';

const ImpactSummary = ({ trackedActions, totalCO2Reduction, removeAction, clearActions }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const treesPlanted = (totalCO2Reduction / 10).toFixed(1);
    const impactColor = totalCO2Reduction < 0.5 ? 'text-red-600' : totalCO2Reduction < 1 ? 'text-orange-600' : 'text-green-600';

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleClearActions = () => {
        clearActions();
        closeModal();
        if (trackedActions.length === 0) {
            toast('No actions to clear!', {
                icon: '⚠️',
                style: {
                    background: '#f8d7da',
                    color: '#721c24',
                },
            });
        }
    };

    return (
        <>
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Impact Summary</h2>
                <div className={`text-2xl font-semibold mb-6 ${impactColor}`}>
                    You've saved the equivalent of {treesPlanted} trees planted!
                </div>
                {trackedActions.length > 0 ? (
                    <ul className="space-y-4">
                        {trackedActions.map((action) => (
                            <Action
                                key={action.id}
                                action={action}
                                removeAction={removeAction}
                            />
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">No actions tracked yet.</p>
                )}
                <div className="mt-4 flex justify-center space-x-4">
                    <button
                        onClick={openModal}
                        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
                    >
                        Clear All
                    </button>
                    <div className="text-xl font-semibold text-gray-700">
                        Total CO2 Reduction: {totalCO2Reduction.toFixed(2)} kg
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div
                    id="popup-modal"
                    tabIndex={-1}
                    className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 text-center">
                            <svg
                                className="mx-auto mb-4 text-gray-400 w-12 h-12"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500">
                                Are you sure you want to delete all tracked actions?
                            </h3>
                            <button
                                onClick={handleClearActions}
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                onClick={closeModal}
                                type="button"
                                className="py-2.5 px-5 mt-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImpactSummary;