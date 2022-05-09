import { createContext, useContext } from "react";

export const ApiContext = createContext({
  fetchCompanies: () => fetch("http://localhost:3210/companies"),
});

export const useApiContext = () => useContext(ApiContext);
