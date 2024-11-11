import React, { useState, useEffect } from 'react';
import ActionList from './components/ActionList';
import ImpactSummary from './components/ImpactSummary';
import { Toaster, toast } from 'react-hot-toast';

const App = () => {
  const showToast = () => toast.success("Your action has been added!!");
  const showDeleteToast = () => toast.success('Your current action is deleted successfully!!');

  const [ecoActions, setEcoActions] = useState([]);
  const [trackedActions, setTrackedActions] = useState(() => {
    const savedActions = localStorage.getItem('trackedActions');
    return savedActions ? JSON.parse(savedActions) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('/assets/ecoAction.json')
      .then((response) => response.json())
      .then((data) => setEcoActions(data))
      .catch((error) => console.error('Error loading eco actions:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('trackedActions', JSON.stringify(trackedActions));
  }, [trackedActions]);

  const addAction = (action) => {
    const existingAction = trackedActions.find((a) => a.id === action.id);
    if (existingAction) {
      setTrackedActions(trackedActions.map((a) =>
        a.id === action.id ? { ...a, count: a.count + 1 } : a
      ));
      showToast();
    } else {
      setTrackedActions([...trackedActions, { ...action, count: 1 }]);
      showToast();
    }
  };

  const removeAction = (id) => {
    setTrackedActions(trackedActions.filter((action) => action.id !== id));
    showDeleteToast();
  };

  const clearActions = () => setTrackedActions([]);

  const totalCO2Reduction = trackedActions.reduce((total, action) => total + (action.co2Reduction * action.count), 0);

  const filteredActions = ecoActions.filter(action =>
    action.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPageActions = filteredActions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredActions.length / itemsPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8 px-4">
        <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-4xl font-bold text-center text-green-600 mb-8">Eco-Friendly Tracker</h1>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white p-6 rounded-lg shadow-md">
              <input
                type="text"
                placeholder="Search eco actions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <thead className="bg-green-100">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Action</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">CO2 Reduction</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageActions.map(action => (
                      <tr key={action.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2">{action.name}</td>
                        <td className="px-4 py-2">{action.co2Reduction} kg</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => addAction(action)}
                            className="text-green-600 hover:text-green-800 transition duration-200">Add</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-lg">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <ImpactSummary
                trackedActions={trackedActions}
                totalCO2Reduction={totalCO2Reduction}
                removeAction={removeAction}
                clearActions={clearActions}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default App;