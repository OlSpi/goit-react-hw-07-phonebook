import axios from 'axios';

const API_BASE_URL = 'https://64c009050d8e251fd111dc32.mockapi.io';

export const fetchContacts = async () => {
  const response = await axios.get(`${API_BASE_URL}/contacts`);
  return response.data;
};

export const addContact = async contact => {
  const response = await axios.post(`${API_BASE_URL}/contacts`, contact);
  return response.data;
};

export const deleteContact = async id => {
  await axios.delete(`${API_BASE_URL}/contacts/${id}`);
};
