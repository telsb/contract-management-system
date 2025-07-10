
import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../App.jsx';
import { apiService } from '../services/apiService.js';
import Spinner from './Spinner.jsx';
import DataTable from './DataTable.jsx';

const UserDashboard = () => {
    const { state, logout } = useAppContext();
    const [locators, setLocators] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchLocators = async () => {
            if (!state.user?.estate) return;
            setIsLoading(true);
            setError(null);
            try {
                const response = await apiService.getLocators(state.user.estate);
                if (response.status === 'success') {
                    setLocators(response.data);
                } else {
                    setError(response.message || 'Failed to fetch data.');
                }
            } catch (err) {
                setError(err.message || 'An error occurred.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLocators();
    }, [state.user]);

    const filteredLocators = useMemo(() => {
        return locators.filter(locator =>
            Object.values(locator).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [locators, searchTerm]);
    
    const handleConvertToSheets = () => {
        alert("This feature would export the current view to a new Google Sheet.");
    };

    if (isLoading && locators.length === 0) {
        return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
            <header className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Contract Dashboard</h1>
                    <p className="text-red-500 font-semibold">{state.user?.estate}</p>
                </div>
                <button onClick={logout} className="mt-4 sm:mt-0 bg-gray-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Logout
                </button>
            </header>
            
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                    <button onClick={handleConvertToSheets} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                        Convert to Sheets
                    </button>
                     <input
                        type="text"
                        placeholder="Search table..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full sm:w-auto bg-gray-700 border border-gray-600 text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>
                
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <DataTable locators={filteredLocators} isAdmin={false} />
            </div>
        </div>
    );
};

export default UserDashboard;