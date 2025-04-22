import React, { createContext, useContext, ReactNode } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "amplify/data/resource";

// Create the client
const dataClient = generateClient<Schema>();

// Context type
interface DataContextType {
  client: ReturnType<typeof generateClient<Schema>>;
}

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider props
interface DataProviderProps {
  children: ReactNode;
}

// Provider component
export function DataProvider({ children }: DataProviderProps) {
  const value = {
    client: dataClient,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// Hook for using the data client
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
