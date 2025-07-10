
import React, { useState } from 'react';
import { Estate } from '../types.ts';
import { useAppContext } from '../App.tsx';
import Spinner from './Spinner.tsx';
import { apiService } from '../services/apiService.ts';

const LoginModal = ({ estate, onClose }) => {
  const { state, dispatch } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const isAdminLogin = estate === Estate.ADMIN;

  const handleResponse = (response) => {
      if (response.status === 'success') {
          if (isCreatingAccount) {
              setSuccessMessage(response.data.message);
              setIsCreatingAccount(false);
          } else {
              const user = isAdminLogin 
                  ? { email: response.data.user.email, role: 'admin' }
                  : { email: response.data.user.email, estate: estate };
              dispatch({ type: 'LOGIN_SUCCESS', payload: user });
          }
      } else {
          dispatch({ type: 'LOGIN_FAIL', payload: response.message || "An unknown error occurred." });
          setLocalError(response.message || "An unknown error occurred.");
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    setLocalError(null);
    setSuccessMessage(null);

    try {
        let response;
        if (isCreatingAccount) {
            response = await apiService.createAccount(email, password);
        } else if (isAdminLogin) {
            response = await apiService.adminLogin(email, password);
        } else {
            response = await apiService.login(email, password, estate);
        }
        handleResponse(response);
    } catch (error) {
        const errorMessage = error.message || 'Failed to connect to the server.';
        dispatch({ type: 'LOGIN_FAIL', payload: errorMessage });
        setLocalError(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md relative border border-gray-700">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">&times;</button>
        <h2 className="text-2xl font-bold text-center mb-2 text-white">{isCreatingAccount ? 'Create Account' : `Login to ${estate}`}</h2>
        <div className="h-1 w-20 bg-red-600 mx-auto mb-6"></div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-gray-700 border border-gray-600 text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-gray-700 border border-gray-600 text-white rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"/>
          </div>
          
          {localError && <p className="text-red-500 text-xs italic mb-4">{localError}</p>}
          {successMessage && <p className="text-green-400 text-xs italic mb-4">{successMessage}</p>}

          <button type="submit" disabled={state.isLoading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 disabled:bg-gray-500 flex items-center justify-center">
            {state.isLoading ? <Spinner /> : (isCreatingAccount ? 'Create Account' : 'Login')}
          </button>
        </form>

        {!isAdminLogin && (
          <div className="text-center mt-4">
            <button onClick={() => { setIsCreatingAccount(!isCreatingAccount); setLocalError(null); setSuccessMessage(null); }} className="text-sm text-gray-400 hover:text-red-500 transition">
              {isCreatingAccount ? 'Already have an account? Login' : 'Create an account'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;