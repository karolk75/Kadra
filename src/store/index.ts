import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import ExpoSecureStore from "./secureStorage";
import ExpoFileSystemStorage from "./fileSystemStorage";
import authReducer from "./slices/authSlice";
import { performanceMiddleware } from "./performance";
import childrenReducer from "./slices/childrenSlice";
import enrollmentsReducer from "./slices/enrollmentsSlice";
import notificationsReducer from "./slices/notificationsSlice";
export interface StoreState {
  auth: ReturnType<typeof authReducer>;
  // Add other slice types as they are created
}

// Helper function to create persisted reducers with specific storage
const createPersistedReducer = <T extends object>(
  key: string,
  reducer: any,
  isSecure: boolean = false,
  additionalConfig: Partial<PersistConfig<T>> = {},
) => {
  return persistReducer<T>(
    {
      key,
      storage: isSecure ? ExpoSecureStore : ExpoFileSystemStorage,
      // Use a custom keyPrefix for secure storage to avoid the invalid ":" character
      ...(isSecure ? { keyPrefix: "persist_" } : {}),
      // only save every 2 seconds
      throttle: 2000,
      ...additionalConfig,
    },
    reducer,
  );
};

// Create a root reducer with individually persisted slices
const rootReducer = combineReducers({
  // Auth data uses secure storage
  auth: createPersistedReducer<ReturnType<typeof authReducer>>(
    "auth",
    authReducer,
    true,
  ),
  children: createPersistedReducer<ReturnType<typeof childrenReducer>>(
    "children",
    childrenReducer,
    false,
  ),
  enrollments: createPersistedReducer<ReturnType<typeof enrollmentsReducer>>(
    "enrollments",
    enrollmentsReducer,
    false,
  ),
  notifications: createPersistedReducer<
    ReturnType<typeof notificationsReducer>
  >("notifications", notificationsReducer, false),
});

// Define the store without immediate initialization
const configureAppStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        // serializableCheck: {
        //   // Properly handle all redux-persist actions
        //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // },
        serializableCheck: false,
        // Enable immutable state checks only in development
        // immutableCheck: __DEV__ ? { warnAfter: 128 } : false,
      });
      // .concat(performanceMiddleware);
    },
    // Disable devtools in production for better performance
    // devTools: process.env.NODE_ENV !== 'production',
    devTools: false,
  });
};

// Create the store
export const store = configureAppStore();

export const persistor = persistStore(store, {}, () => {
  // Log when persistence is complete, useful for debugging
  console.log("Redux persistence rehydration complete");
});

// Define the persisted root state type
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
