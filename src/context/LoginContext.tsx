import React, { createContext, useReducer, useContext, ReactNode } from 'react';

interface State {
  input: string;
  inputError: string;
  formValid: boolean;
}

const initialState: State = {
  input: '',
  inputError: '',
  formValid: false,
};

type Action =
  | { type: 'SET_INPUT'; payload: string }
  | { type: 'SET_INPUT_ERROR'; payload: string }
  | { type: 'SET_FORM_VALID'; payload: boolean };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, input: action.payload };
    case 'SET_INPUT_ERROR':
      return { ...state, inputError: action.payload };
    case 'SET_FORM_VALID':
      return { ...state, formValid: action.payload };
    default:
      return state;
  }
};

interface LoginContextProps extends State {
  validateInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const useLogin = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};

interface LoginProviderProps {
  children: ReactNode;
}

export const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const validateInput = (input: string) => {
    const mobileRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!mobileRegex.test(input) && !emailRegex.test(input)) {
      dispatch({ type: 'SET_INPUT_ERROR', payload: 'Please enter a valid 10-digit mobile number or email address' });
      dispatch({ type: 'SET_FORM_VALID', payload: false });
    } else {
      dispatch({ type: 'SET_INPUT_ERROR', payload: '' });
      dispatch({ type: 'SET_FORM_VALID', payload: true });
    }
    dispatch({ type: 'SET_INPUT', payload: input });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.formValid) {
      alert('All good');
      dispatch({ type: 'SET_INPUT', payload: '' });
    }
  };

  return (
    <LoginContext.Provider
      value={{
        ...state,
        validateInput,
        handleSubmit,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};