import css from './ContactsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactAsync } from 'redux/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter.filter);

  const filteredContacts = contacts.filter(
    contact =>
      contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={css.list}>
      {filteredContacts.map(contact => (
        <li className={css.listItem} key={contact.id}>
          <span className={css.name}>{contact.name}:</span>
          <span className={css.number}>{contact.number}</span>
          <button
            className={css.deleteButton}
            onClick={() => dispatch(deleteContactAsync(contact.id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
