import { accessToken } from "../helpers/common-functions";
import api from "./api";

export const call_get_friends = async (payload, thunkApi) => {
  try {
    const response = await api.get(`/api/get-friends?isArchived=${payload.isArchived}`,accessToken(payload.token) );
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
};

export const call_register_user = async (user, thunkApi) => {
  try {
    const response = await api.post(`/api/signup`, user);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
};

export const call_add_friend = async (friend, thunkApi) => {
  try {
    const response = await api.post(`/api/add-friend`, friend);
    console.log("endpoint", response);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
};

export const call_archive_or_restore = async (payload, thunkApi) => {
  try {
    const response = await api.post(`/api/restore-archived-friend`,payload, accessToken(payload.token))
    console.log("endpoint", response);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
}

export const call_friend_update = async (payload, thunkApi) => {
  try {
    const response = await api.put(`/api/update-friend`,payload.payload, accessToken(payload.token))
    console.log("endpoint", response);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
}

export const call_delete_friend = async (payload, thunkApi) => {
  try {
    console.log("endpoint", payload);
    const response = await api.delete(`/api/delete-friend/${payload.friend_id}`, accessToken(payload.token))
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
}

export const call_user_login = async (user, thunkApi) => {
  try {
    const response = await api.post(`/api/login`, user);
    console.log("endpoint", response);
    return response;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
};
