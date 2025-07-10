
import React from 'react';

const Header = ({ onManageClick }) => {
    return (
        <header className="h-screen flex flex-col items-center justify-center bg-gray-900 text-center p-4 relative">
            <div className="absolute inset-0 bg-grid-gray-700/20 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
            <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                    Welcome to Aboitiz InfraCapital
                </h1>
                <h2 className="text-4xl md:text-6xl font-extrabold text-red-600 tracking-tight mt-2">
                    Contract Management System
                </h2>
                <button
                    onClick={onManageClick}
                    className="mt-12 text-lg font-semibold text-gray-300 border-b-2 border-transparent hover:text-white hover:border-red-600 transition-all duration-300"
                >
                    Manage Contracts
                </button>
            </div>
        </header>
    );
};

export default Header;