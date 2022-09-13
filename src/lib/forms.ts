import api from "../utils/api";

export const getForms = async () => {
  const forms = await api.get("/form/formids");
  if (forms.data) {
    return forms.data;
  } else {
    return null;
  }
};

export const getForm = async (id: string) => {
  const response = await api.get(`/form/${id}`);
  if (response.data) return response.data;
  return null;
};
