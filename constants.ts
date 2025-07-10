
import { Estate, ContractType } from './types.js';

// IMPORTANT: Replace this with your deployed Google Apps Script Web App URL
export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxBnZz0udSyPdeONSTtJdcbysbg5lomv95TLuvW_ElWFx_1fe1-dl2E_1FP47xzbLb_3Q/exec';

export const ESTATES = [
    Estate.LIMA,
    Estate.BIZHUB,
    Estate.TARI,
    Estate.MEZ2,
    Estate.WEST_CEBU,
];

export const ALL_ESTATES_WITH_ADMIN = [...ESTATES, Estate.ADMIN];

export const CONTRACT_TYPES = Object.values(ContractType);