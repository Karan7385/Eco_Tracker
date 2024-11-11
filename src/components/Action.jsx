import React from 'react';

const Action = ({ action, removeAction }) => {
  return (
    <li className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition">
      <span className="text-lg font-medium text-gray-800">{action.name}</span>
      <span className="text-sm text-gray-600">{action.count} times - {action.co2Reduction * action.count} kg CO2 reduction</span>
      <button
        onClick={() => removeAction(action.id)}
        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
      >
        Delete
      </button>
    </li>
  );
};

export default Action;