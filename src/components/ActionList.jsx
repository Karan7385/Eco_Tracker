import React from 'react';

const ActionList = ({ actions, addAction }) => {

    return (
        <>
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Available Actions</h2>
                <ul className="space-y-4">
                    {actions.map((action) => (
                        <li key={action.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition">
                            <span className="text-lg font-medium text-gray-800">{action.name}</span>
                            <span className="text-sm text-gray-600">{action.co2Reduction} kg CO2 reduction</span>
                            <button
                                onClick={() => addAction(action)}
                                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
                            >
                                Add
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default ActionList;