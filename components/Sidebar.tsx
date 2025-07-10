
import React from 'react';
import { ESTATES } from '../constants.js';

const Sidebar = ({ selectedEstate, setSelectedEstate, logout }) => {
    const menuItems = ['ALL', ...ESTATES];

    return (
        <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col justify-between">
            <div>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-white">AIC Admin</h2>
                    <div className="h-0.5 w-16 bg-red-600 mt-2"></div>
                </div>
                <nav className="mt-6">
                    <ul>
                        {menuItems.map(estate => (
                            <li key={estate}>
                                <button
                                    onClick={() => setSelectedEstate(estate)}
                                    className={`w-full text-left px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 flex items-center ${selectedEstate === estate ? 'bg-gray-700 text-white border-r-4 border-red-600' : ''}`}
                                >
                                    {estate}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="p-6">
                <button
                    onClick={logout}
                    className="w-full bg-gray-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;