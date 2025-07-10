import { APPS_SCRIPT_URL } from '../constants.js';

const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = (reader.result as string).split(',')[1];
            resolve(result);
        };
        reader.onerror = error => reject(error);
    });
};

const callAppsScript = async (action, payload) => {
    if (APPS_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        throw new Error("API URL is not configured. Please update APPS_SCRIPT_URL in constants.js.");
    }

    const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, payload }),
        redirect: 'follow',
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
};

export const apiService = {
    createAccount: (email, password) => {
        return callAppsScript('create_account', { email, password });
    },

    login: (email, password, estate) => {
        return callAppsScript('login', { email, password, estate });
    },

    adminLogin: (email, password) => {
        return callAppsScript('admin_login', { email, password });
    },
    
    getLocators: (estate?) => {
        return callAppsScript('get_locators', { estate });
    },

    addLocator: (locatorData) => {
        return callAppsScript('add_locator', locatorData);
    },
    
    uploadContract: async (locatorId, contractType, file) => {
        const base64 = await fileToBase64(file);
        const fileData = {
            base64,
            name: file.name,
            type: file.type
        };
        return callAppsScript('add_contract', { locatorId, contractType, fileData });
    },
};