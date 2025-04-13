import { store } from '../store';
import { logReduxState, logReduxSlice } from './stateLogger';

/**
 * Collection of developer utilities that can be used throughout the app
 * These are safe to call in production code as they will be no-ops in production builds
 */

/**
 * Log the current Redux state to the console
 * @param options Logging options
 */
export const logState = (options?: { 
  prettyPrint?: boolean;
  slice?: string;
  label?: string;
}) => {
  if (!__DEV__) return; // Only log in development
  
  const { prettyPrint = true, slice, label } = options || {};
  
  if (label) {
    console.log(`\n=== ${label} ===`);
  }
  
  if (slice) {
    logReduxSlice(slice);
  } else {
    logReduxState(prettyPrint);
  }
};

/**
 * Log the current Redux auth state 
 */
export const logAuthState = (label?: string) => {
  logState({ slice: 'auth', label: label || 'AUTH STATE' });
};

/**
 * Log the current Redux profile state
 */
export const logProfileState = (label?: string) => {
  logState({ slice: 'profile', label: label || 'PROFILE STATE' });
};

/**
 * Simple wrapper for console.log that only works in development mode
 */
export const devLog = (...args: any[]) => {
  if (!__DEV__) return;
  console.log(...args);
};

// Export a way to access the store directly in development
export const getStore = () => {
  if (!__DEV__) {
    console.warn('getStore() should only be used in development');
  }
  return store;
}; 