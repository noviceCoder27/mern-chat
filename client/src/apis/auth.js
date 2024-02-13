import axios from 'axios';
import { toast } from 'react-hot-toast';
const base_url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const API = (token) =>
  axios.create({
    baseURL: base_url,
    headers: { Authorization: token },
  });
export const loginUser = async (body) => {
  try {
    return await axios.post(`${base_url}/auth/login`, body);
  } catch (error) {
    console.log('error in loginuser api');
  }
};

export const registerUser = async (body) => {
  try {
    return await axios.post(`${base_url}/auth/register`, body);
  } catch (error) {
    console.log('error in register api');
  }
};
export const validUser = async () => {
  try {
    const token = localStorage.getItem('userToken');

    const { data } = await API(token).get(`/auth/valid`, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    console.log('error in valid user api');
  }
};
export const searchUsers = async (id) => {
  try {
    const token = localStorage.getItem('userToken');

    return await API(token).get(`/api/user?search=${id}`);
  } catch (error) {
    console.log('error in search users api');
  }
};
export const updateUser = async (id, body) => {
  try {
    const token = localStorage.getItem('userToken');

    const { data } = await API(token).patch(`/api/users/update/${id}`, body);
    return data;
  } catch (error) {
    console.log('error in update user api');
    toast.error('Something Went Wrong.try Again!');
  }
};
export const checkValid = async () => {
  const data = await validUser();
  if (!data?.user) {
    window.location.href = '/login';
  } else {
    window.location.href = '/chats';
  }
};
