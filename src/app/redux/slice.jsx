import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  call_register_user,
  call_add_friend,
  call_user_login,
  call_get_friends,
  call_archive_or_restore,
  call_delete_friend,
  call_friend_update,
} from "../api/endpoint";

import Cookies from "js-cookie";

const initialState = {
  userAPIData: [],
  registerUser: [],
  friendList: [],
  loggedInUser: null,
  currentUserFriends: [],
};

export const fetchApiRegisterUser = createAsyncThunk(
  "fetchApiRegisterUser",
  async (payload, thunkApi) => {
    const result = await call_register_user(payload, thunkApi);
    return result.data;
  }
);

export const fetchApiLoginUser = createAsyncThunk(
  "fetchApiLoginUser",
  async (payload, thunkApi) => {
    const result = await call_user_login(payload, thunkApi);
    return result.data;
  }
);

export const fetchApiFriendList = createAsyncThunk(
  "adduserSlice/fetchApiFriendList",
  async (payload, thunkApi) => {
    const result = await call_add_friend(payload, thunkApi);
    return result.data;
  }
);

export const fetchApiGetFriend = createAsyncThunk(
  "adduserSlice/fetchApiGetFriend",
  async (payload, thunkApi) => {
    const result = await call_get_friends(payload, thunkApi);
    return result.data;
  }
);

export const fetchApiArchivedOrRestoreFriend = createAsyncThunk(
  "adduserSlice/fetchApiArchivedOrRestoreFriend",
  async (payload, thunkApi) => {
    const result = await call_archive_or_restore(payload, thunkApi);
    return result.data;
  }
);

export const fetchApiDeleteFriend = createAsyncThunk(
  "adduserSlice/fetchApiDeleteFriend",
  async (payload, thunkApi) => {
    console.log(payload);
    const result = await call_delete_friend(payload, thunkApi);
    console.log(result);
    return result.data;
  }
);

export const fetchApiUpdateFriend = createAsyncThunk(
  "adduserSlice/fetchApiUpdateFriend",
  async (payload, thunkApi) => {
    console.log(payload)
    const result = await call_friend_update(payload, thunkApi);
    return result.data;
  }
);

const Slice = createSlice({
  name: "adduserSlice",
  initialState,
  reducers: {
    logOutUser: (state, action) => {
      state.loggedInUser = {};
      Cookies.remove("login");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchApiLoginUser.fulfilled, (state, action) => {
      state.loggedInUser = action.payload.data;
      Cookies.set("login", state.loggedInUser.token);
      console.log("fetchApiLoginUser fulfilled...", state.loggedInUser);
    });

    builder.addCase(fetchApiGetFriend.fulfilled, (state, action) => {
      console.log(action)
      state.currentUserFriends = [...action.payload.data.friends];
      console.log("fetchApiLoginUser fulfilled...", state.currentUserFriends);
    });
  },
});

export const { logOutUser } = Slice.actions;
export default Slice.reducer;
