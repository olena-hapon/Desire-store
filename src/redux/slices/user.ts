import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../Types/User";

export const fetchUser = createAsyncThunk('user, fetchUser', async(payload) => {
  const response = await axios.post(`https://api.escuelajs.co/api/v1/users/`, payload);
  return response.data;
});

export const loginUser = createAsyncThunk('users, loginUser', async(payload) => {
  const res = await axios.post(`https://api.escuelajs.co/api/v1/auth/login`, payload);
  const login = await axios.get(`https://api.escuelajs.co/api/v1/auth/profile`, {
    headers: {
      "Authorization": `Bearer ${res.data.access_token}`
    }
  });
  console.log(login.data)

  localStorage.setItem('user', JSON.stringify({
    ...login.data
   }))

  return login.data;
});

export const updateUser = createAsyncThunk('users, updateUser', async(payload:any, thunkAPI) => {
  const resp = await axios.put(`https://api.escuelajs.co/api/v1/users/${payload.id}`, payload);

  return resp.data;
});





// type InitialState = {
//   user: User | undefined,
//   status: string,
//   formType: string,
//   showForm: boolean,
// }

const initialState = {
  user: null,
  status: 'loading',
  formType: '',
  showForm: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },

    setUser(state, action) {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action: { payload }) => {
      state.status = 'loading';
      state.user= action.payload;
    });

    builder.addCase(fetchUser.fulfilled, (state, action: { payload }) => {
      state.status = 'succes';
      state.user= action.payload;
    });

    builder.addCase(fetchUser.rejected, (state, action: { payload }) => {
      state.status = 'error';
      state.user = action.payload;
    });

    builder.addCase(loginUser.fulfilled, (state, action: { payload }) => {
      state.status = 'succes';
      state.user= action.payload;
    });

    builder.addCase(updateUser.fulfilled, (state, action: { payload }) => {
      state.status = 'succes';
      state.user= action.payload;
    });
  },
})

export const { toggleForm, setUser } = userSlice.actions;

export default userSlice.reducer;