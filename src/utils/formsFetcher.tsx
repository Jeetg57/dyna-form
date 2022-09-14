import useSWR from "swr";
import api from "./api";

const fetcher = (url) => api.get(url).then((res) => res.data);

export const useForms = () => {
  const { data, error } = useSWR("/form", fetcher);

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useFormWithId = (id: string) => {
  const { data, error } = useSWR(`/form/${id}`, fetcher);

  return {
    form: data,
    isLoading: !error && !data,
    isError: error,
  };
};
