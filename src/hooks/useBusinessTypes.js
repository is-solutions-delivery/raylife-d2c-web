import { useEffect, useState } from "react";
import { MockService } from "../services/mock";

export const useBusinessTypes = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    loadBusinessTypes();
  }, []);

  const loadBusinessTypes = async (search = "") => {
    try {
      const response = await MockService.getBusinessTypes(search);
      setData(response);
    } catch (error) {
      console.warn(error);
      setError(error);
    }
  };

  return {
    businessTypes: data || [],
    isLoading: !data && !error,
    isError: error,
    reload: loadBusinessTypes,
  };
};
