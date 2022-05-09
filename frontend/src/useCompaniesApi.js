import { useEffect, useState } from "react";
import { useApiContext } from "./ApiContext";

const iniState = {
  data: undefined,
  isLoading: false,
  error: null,
};

export const useCompaniesApi = () => {
  const { fetchCompanies } = useApiContext();
  const [state, setState] = useState(iniState);

  useEffect(() => {
    setState((prev) => ({ ...prev, isLoading: true }));

    fetchCompanies()
      .then(async (res) => {
        try {
          const data = await res.json();
          setState((prev) => ({ ...prev, data }));
        } catch (error) {
          setState((prev) => ({ ...prev, error }));
        }
      })
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, isLoading: false })));
    // want to run it only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};
