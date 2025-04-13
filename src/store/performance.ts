import { Middleware } from 'redux';
import { RootState } from './index';

// Performance monitoring middleware to track Redux operations
export const performanceMiddleware: Middleware<{}, RootState> = store => next => action => {
  // Only measure in development
  if (!__DEV__) {
    return next(action);
  }
  
  const actionType = (action as any)?.type;
  const startTime = performance.now();
  
  // Execute the action
  const result = next(action);
  
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  // Log slow operations (more than 16ms which causes frame drops)
  if (duration > 16) {
    console.warn(`Slow Redux action: ${actionType} took ${duration.toFixed(2)}ms`);
  }
  
  return result;
};

// Utility function to measure performance of async operations
export const measurePerformance = async <T>(
  name: string, 
  operation: () => Promise<T>
): Promise<T> => {
  // Only measure in development
  if (!__DEV__) {
    return operation();
  }
  
  const startTime = performance.now();
  
  try {
    const result = await operation();
    const endTime = performance.now();
    console.log(`${name} completed in ${(endTime - startTime).toFixed(2)}ms`);
    return result;
  } catch (error) {
    const endTime = performance.now();
    console.error(`${name} failed after ${(endTime - startTime).toFixed(2)}ms`, error);
    throw error;
  }
};

// Helper for optimizing selectors (memoization)
export const createSelector = <T, R>(
  selector: (state: RootState) => T,
  projector: (selected: T) => R,
  equalityFn: (prev: T, next: T) => boolean = (a, b) => a === b
): (state: RootState) => R => {
  let lastSelected: T | undefined;
  let lastResult: R | undefined;
  
  return (state: RootState) => {
    const selected = selector(state);
    
    if (lastSelected === undefined || !equalityFn(lastSelected, selected)) {
      lastResult = projector(selected);
      lastSelected = selected;
    }
    
    return lastResult as R;
  };
}; 