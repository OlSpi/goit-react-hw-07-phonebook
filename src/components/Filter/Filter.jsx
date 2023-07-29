import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.filter);

  const handleChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search...."
      value={filter}
      onChange={handleChange}
    />
  );
};
