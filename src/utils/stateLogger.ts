import { store } from '../store';

/**
 * Logs the entire Redux state to the console
 * @param prettyPrint Whether to format the output with indentation
 */
export const logReduxState = (prettyPrint = true) => {
  const state = store.getState();
  
  if (prettyPrint) {
    console.log('=== REDUX STATE ===');
    console.log(JSON.stringify(state, null, 2));
    console.log('==================');
  } else {
    console.log('Redux State:', state);
  }
  
  return state;
};

/**
 * Logs a specific slice of the Redux state
 * @param sliceName The name of the slice to log
 */
export const logReduxSlice = (sliceName: string) => {
  const state = store.getState();
  
  if (sliceName in state) {
    console.log(`=== REDUX SLICE: ${sliceName} ===`);
    console.log(JSON.stringify(state[sliceName as keyof typeof state], null, 2));
    console.log('=============================');
  } else {
    console.log(`Slice "${sliceName}" not found in state.`);
    console.log('Available slices:', Object.keys(state));
  }
};

/**
 * Subscribes to the Redux store and logs state changes
 * @returns A function to unsubscribe the listener
 */
export const createReduxStateLogger = () => {
  let previousState = store.getState();
  
  const unsubscribe = store.subscribe(() => {
    const currentState = store.getState();
    
    console.log('=== REDUX STATE CHANGED ===');
    console.log('Previous:', JSON.stringify(previousState, null, 2));
    console.log('Current:', JSON.stringify(currentState, null, 2));
    console.log('=========================');
    
    previousState = currentState;
  });
  
  return unsubscribe;
}; 