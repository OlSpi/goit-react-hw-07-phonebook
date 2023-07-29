import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsAsync } from 'redux/contactsSlice';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContactsAsync());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <div className={css.section}>
        <h2 className={css.title}>Phonebook</h2>
        <ContactForm />
      </div>

      <div className={css.section}>
        <h2 className={css.title}>Contacts</h2>
        {isLoading ? <p>Loading...</p> : null}
        {error ? <p>Error: {error}</p> : null}
        <Filter />
        <ContactList />
      </div>
    </div>
  );
};
