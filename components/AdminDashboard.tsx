
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAppContext } from '../App.jsx';
import { ESTATES } from '../constants.js';
import { apiService } from '../services/apiService.js';
import Spinner from './Spinner.jsx';
import DataTable from './DataTable.jsx';
import Sidebar from './Sidebar.jsx';

const AdminDashboard = () => {
    const { logout } = useAppContext();
    const [locators, setLocators] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingLocator, setIsAddingLocator] = useState(false);
    const [newLocator, setNewLocator] = useState({ estate: ESTATES[0], locatorName: '', address: '', lotArea: '', industryType: '' });
    const [selectedEstate, setSelectedEstate] = useState('ALL');

    const fetchAllData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiService.getLocators();
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
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);
    
    const handleAddLocatorSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await apiService.addLocator(newLocator);
            if(response.status === 'success') {
                setLocators(prev => [...prev, response.data.newLocator]);
                setIsAddingLocator(false);
                setNewLocator({ estate: ESTATES[0], locatorName: '', address: '', lotArea: '', industryType: '' });
            } else {
                setError(response.message || 'Failed to add locator.');
            }
        } catch (err) {
            setError(err.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddContract = useCallback(async (locatorId, contractType, file) => {
        setIsLoading(true);
        try {
            const response = await apiService.uploadContract(locatorId, contractType, file);
            if(response.status === 'success'){
                setLocators(prevLocators => prevLocators.map(loc => {
                    if(loc.LocatorID === locatorId) {
                        return {...loc, contracts: [...loc.contracts, response.data.newContract]}
                    }
                    return loc;
                }));
            } else {
                 setError(response.message || 'Failed to upload contract.');
            }
        } catch(err){
            setError(err.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, []);


    const filteredLocators = useMemo(() => {
        return locators
            .filter(locator => selectedEstate === 'ALL' || locator.Estate === selectedEstate)
            .filter(locator =>
                Object.values(locator).some(value =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
    }, [locators, searchTerm, selectedEstate]);

    return (
        <div className="min-h-screen flex bg-gray-900">
            <Sidebar selectedEstate={selectedEstate} setSelectedEstate={setSelectedEstate} logout={logout} />
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                </header>
                
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                        <button onClick={() => setIsAddingLocator(!isAddingLocator)} className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                            {isAddingLocator ? 'Cancel' : '+ Add Locator'}
                        </button>
                         <input
                            type="text"
                            placeholder="Search table..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full sm:w-auto bg-gray-700 border border-gray-600 text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>
                    
                    {isAddingLocator && (
                        <form onSubmit={handleAddLocatorSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 p-4 bg-gray-700/50 rounded-lg">
                            <select value={newLocator.estate} onChange={e => setNewLocator({...newLocator, estate: e.target.value})} className="bg-gray-700 border border-gray-600 rounded py-2 px-3">
                                {ESTATES.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                            <input type="text" placeholder="Locator Name" value={newLocator.locatorName} onChange={e => setNewLocator({...newLocator, locatorName: e.target.value})} className="bg-gray-700 border border-gray-600 rounded py-2 px-3" required />
                            <input type="text" placeholder="Address" value={newLocator.address} onChange={e => setNewLocator({...newLocator, address: e.target.value})} className="bg-gray-700 border border-gray-600 rounded py-2 px-3" required />
                            <input type="text" placeholder="Lot Area (sqm)" value={newLocator.lotArea} onChange={e => setNewLocator({...newLocator, lotArea: e.target.value})} className="bg-gray-700 border border-gray-600 rounded py-2 px-3" required />
                            <input type="text" placeholder="Industry Type" value={newLocator.industryType} onChange={e => setNewLocator({...newLocator, industryType: e.target.value})} className="bg-gray-700 border border-gray-600 rounded py-2 px-3" required />
                            <button type="submit" disabled={isLoading} className="md:col-span-2 lg:col-span-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 disabled:bg-gray-500">
                                {isLoading ? <Spinner /> : 'Save Locator'}
                            </button>
                        </form>
                    )}

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    {isLoading && !isAddingLocator && locators.length === 0 ? <div className="flex justify-center p-8"><Spinner size="lg" /></div> : <DataTable locators={filteredLocators} isAdmin={true} onAddContract={handleAddContract} />}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;