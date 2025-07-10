import React, { useState, useRef } from 'react';
import { ContractType } from '../types.js';
import { CONTRACT_TYPES } from '../constants.js';
import FilePdfIcon from './icons/FilePdfIcon.jsx';
import ChevronDownIcon from './icons/ChevronDownIcon.jsx';

const tableHeaders = ["Locator", "Address", "Lot Area (sqm)", "Industry Type", "Contracts"];

const ContractDropdown = ({ contracts }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    if (contracts.length === 0) {
        return <span className="text-gray-500">None</span>;
    }

    return (
        <div className="relative" onMouseLeave={() => setIsOpen(false)}>
            <button onMouseEnter={() => setIsOpen(true)} className="flex items-center gap-2 text-red-500 font-semibold">
                View ({contracts.length})
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute z-20 mt-2 w-64 bg-gray-700 border border-gray-600 rounded-md shadow-lg right-0">
                    <ul className="py-1">
                        {contracts.map((contract, index) => (
                            <li key={index} className="px-4 py-2 hover:bg-gray-600">
                                <a href={contract.fileURL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-300">
                                    <FilePdfIcon className="w-4 h-4 text-red-400" />
                                    <span>{`[${contract.contractType}] ${contract.fileName}`}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const AddContractCell = ({ locatorId, onAddContract }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [contractType, setContractType] = useState(ContractType.LOI);
    const fileInputRef = useRef(null);

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (file && onAddContract) {
            await onAddContract(locatorId, contractType, file);
        }
        setIsUploading(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; 
        }
    };

    return (
        <div className="flex items-center gap-2">
            {!isUploading ? (
                <button onClick={() => setIsUploading(true)} className="text-sm bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 rounded">
                    + Add
                </button>
            ) : (
                <>
                    <select value={contractType} onChange={(e) => setContractType(e.target.value)} className="text-xs bg-gray-600 border border-gray-500 rounded py-1 px-2">
                        {CONTRACT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <button onClick={() => fileInputRef.current?.click()} className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded">
                        Upload
                    </button>
                     <button onClick={() => setIsUploading(false)} className="text-xs text-gray-400 hover:text-white">
                        Cancel
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf" />
                </>
            )}
        </div>
    );
};

const DataTable = ({ locators, isAdmin, onAddContract = null }) => {
    if (locators.length === 0) {
        return <div className="text-center text-gray-400 py-8">No locators found.</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                    <tr>
                        {tableHeaders.map(header => (
                            <th key={header} scope="col" className="px-6 py-3">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {locators.map((locator) => (
                        <tr key={locator.LocatorID} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50">
                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{locator.LocatorName}</td>
                            <td className="px-6 py-4">{locator.Address}</td>
                            <td className="px-6 py-4">{locator.LotArea}</td>
                            <td className="px-6 py-4">{locator.IndustryType}</td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-2">
                                    <ContractDropdown contracts={locator.contracts} />
                                    {isAdmin && <AddContractCell locatorId={locator.LocatorID} onAddContract={onAddContract} />}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;