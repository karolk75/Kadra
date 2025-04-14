import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { selectError as selectAuthError, setError as setAuthError } from '@/store/slices/authSlice';
import { selectChildrenError, setError as setChildrenError } from '@/store/slices/childrenSlice';
import { selectEnrollmentsError, setError as setEnrollmentsError } from '@/store/slices/enrollmentsSlice';
import { AuthError } from '@/types/Auth';

// Define unified error type that can handle different error formats
interface UnifiedError {
  message: string;
  code?: string;
  source?: string;
}

// Define the context interface
interface ErrorContextType {
  error: UnifiedError | null;
  clearError: () => void;
}

// Create the context with default values
const ErrorContext = createContext<ErrorContextType>({
  error: null,
  clearError: () => {},
});

// Helper function to normalize different error formats to a unified structure
const normalizeError = (error: unknown, source: string): UnifiedError | null => {
  if (!error) return null;
  
  // Handle AuthError type
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return {
      message: (error as AuthError).message,
      code: (error as AuthError).code,
      source
    };
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return {
      message: error,
      source
    };
  }
  
  // Fallback for unexpected formats
  return {
    message: typeof error === 'object' ? JSON.stringify(error) : String(error),
    source
  };
};

// Provider component
export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to store the current error
  const [error, setError] = useState<UnifiedError | null>(null);
  const dispatch = useAppDispatch();

  // Get errors from different Redux slices
  const authError = useAppSelector(selectAuthError);
  const childrenError = useAppSelector(selectChildrenError);
  const enrollmentsError = useAppSelector(selectEnrollmentsError);

  // Watch for errors from Redux
  useEffect(() => {
    // Normalize all errors
    const normalizedAuthError = normalizeError(authError, 'auth');
    const normalizedChildrenError = normalizeError(childrenError, 'children');
    const normalizedEnrollmentsError = normalizeError(enrollmentsError, 'enrollments');
    
    // Prioritize errors - you can change this order based on importance
    if (normalizedAuthError) {
      setError(normalizedAuthError);
    } else if (normalizedChildrenError) {
      setError(normalizedChildrenError);
    } else if (normalizedEnrollmentsError) {
      setError(normalizedEnrollmentsError);
    } else {
      setError(null);
    }
  }, [authError, childrenError, enrollmentsError]);

  // Function to clear all errors
  const clearError = () => {
    // Clear error from context state
    setError(null);

    // Clear errors from all Redux slices
    if (authError) {
      dispatch(setAuthError(null));
    }
    
    if (childrenError) {
      dispatch(setChildrenError(null));
    }
    
    if (enrollmentsError) {
      dispatch(setEnrollmentsError(null));
    }
  };

  const value = {
    error,
    clearError,
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
};

// Custom hook to use the error context
export const useError = () => useContext(ErrorContext);

export default ErrorProvider; 