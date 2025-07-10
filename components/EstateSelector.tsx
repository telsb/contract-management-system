
import React from 'react';

const EstateSelector = ({ estates, onSelectEstate }) => {
    return (
        <section className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {estates.map((estate) => (
                    <button
                        key={estate}
                        onClick={() => onSelectEstate(estate)}
                        className="group relative flex items-center justify-center p-8 bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:shadow-red-600/30 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        <span className="relative z-10 text-xl font-bold text-gray-300 group-hover:text-white">
                            {estate}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default EstateSelector;