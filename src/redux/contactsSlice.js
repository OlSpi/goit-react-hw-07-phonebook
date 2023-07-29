import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact as apiAddContact,
  deleteContact as apiDeleteContact,
} from './api';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchContactsAsync = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
    const data = await fetchContacts();
    return data;
  }
);

export const addContactAsync = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    const data = await apiAddContact(contact);
    return data;
  }
);

export const deleteContactAsync = createAsyncThunk(
  'contacts/deleteContact',
  async id => {
    await apiDeleteContact(id);
    return id;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContactsAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContactsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContactAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addContactAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteContactAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContactAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContactAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default contactsSlice.reducer;
