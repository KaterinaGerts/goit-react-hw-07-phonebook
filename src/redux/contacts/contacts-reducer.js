import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {  changeFilter } from './contacts-actions';
import { CheckedContactName } from 'utils/CheckedContactName';
import {fetchAllContacts, addContact, deleteContact} from 'redux/contacts/contacts-operations';

const item = createReducer([], {
  [fetchAllContacts.fulfilled]: (_, {payload}) =>  payload,
  // [fetchAllContacts.pending]: () =>  payload,
  [addContact.fulfilled]: (state, { payload }) => CheckedContactName(state, payload),
  [deleteContact.fulfilled]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const error = createReducer(null, {
  [fetchAllContacts.rejected]: (_, {payload}) => payload.message,
  [addContact.rejected]:(_, {payload}) => payload.message,
  [deleteContact.rejected]:(_, {payload}) => payload.message,
})

const contactsReducer = combineReducers({
  item,
  filter,
  error,
});


export default contactsReducer;
