import axios from 'axios';
import {setUserProfile} from '../slices/userSlice';
import API_ENDPOINTS from '../../api/api';

export const fetchUserProfile = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;

    const response = await axios.get(`${API_ENDPOINTS.Profile}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setUserProfile(response.data.data));
  } catch (error) {
    console.error('Gagal mengambil data profil:', error);
  }
};
