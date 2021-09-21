import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3004';

export const getAllContacts = async () => {
  const { data } = await axios.get('/contacts');
  return data;
};

export const postNewContact = async newContact => {
  const { data } = await axios.post('/contacts', newContact);
  return data;
};

export const deleteContact = async id => {
  const { data } = await axios.delete(`/contacts/${id}`);
  return data;
};
