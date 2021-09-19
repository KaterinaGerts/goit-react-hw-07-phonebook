import { Formik, Form, Field, ErrorMessage  } from 'formik';
import * as Yup from 'yup';
import "yup-phone";
import s from './ContactForm.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/contacts-operations';
import Button from 'components/Button';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Too short name!')
    .max(50, 'Too long name!')
    .required('required field'),
  number: Yup.string()
    .phone('Put the number, start +7**********')
    .required('Required'),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  
  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const { name, number } = values;
        dispatch(addContact({ name, number }));
        resetForm();
      }}
    >
      <Form className={s.form}>
        <label htmlFor="name" className={s.label}>
          Name{' '}
        </label>
        <Field
          className={s.input}
          type="text"
          name="name"
          placeholder="Name"
        />
        <ErrorMessage name="name"/>
        <label htmlFor="number" className={s.label}>
          Number{' '}
        </label>
        <Field
          className={s.input}
          type="tel"
          name="number"
          placeholder="+7********"
        />
        <ErrorMessage name="number" />
        <Button/>
      </Form>
    </Formik>
  );
};

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),
  ),
};

export default ContactForm;
