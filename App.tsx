import React, { useReducer, useCallback, useRef } from 'react';
import { Estate } from './types.js';
import Header from './components/Header.jsx';
import EstateSelector from './components/EstateSelector.jsx';
import LoginModal from './components/LoginModal.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import { ALL_ESTATES_WITH_ADMIN } from './constants.js';

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  isModalOpen: false,
  modalEstate: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, isLoading: false, user: action.payload, isModalOpen: false, modalEstate: null };
    case 'LOGIN_FAIL':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      return { ...initialState };
    case 'OPEN_MODAL':
      return { ...state, isModalOpen: true, modalEstate: action.payload, error: null };
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false, modalEstate: null, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const AppContext = React.createContext({
  state: initialState,
  dispatch: (action) => {},
  logout: () => {},
});

export const useAppContext = () => React.useContext(AppContext);

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const mainContentRef = useRef(null);

  const handleManageClick = () => {
    mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleLogout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const openModal = (estate) => {
    dispatch({ type: 'OPEN_MODAL', payload: estate });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, logout: handleLogout }}>
      <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
        {state.isModalOpen && state.modalEstate && (
          <LoginModal
            estate={state.modalEstate}
            onClose={closeModal}
          />
        )}
        
        {state.user ? (
          state.user.role === 'admin' ? (
            <AdminDashboard />
          ) : (
            <UserDashboard />
          )
        ) : (
          <>
            <Header onManageClick={handleManageClick} />
            <main ref={mainContentRef} className="py-20 px-4">
              <EstateSelector estates={ALL_ESTATES_WITH_ADMIN} onSelectEstate={openModal} />
            </main>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
};

export default App;