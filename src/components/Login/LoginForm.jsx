import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './LoginForm.module.css';

const LoginForm = (props) => {
  const { isAuthed } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    props.onLogin(data, { current: isAuthed });
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>
      <div className={styles.inputBlock}>
        <input
          className={styles.input}
          placeholder="Login"
          {...register('email', {
            required: 'This field is required!',
            minLength: {
              value: 2,
              message: 'Min length is two!',
            },
            pattern: {
              value:
                /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
              message: 'Please enter a valid E-mail!',
            },
          })}
        />
        {errors.email && (
          <p className={styles.warning}>{errors.email.message}</p>
        )}
      </div>
      <div className={styles.inputBlock}>
        <input
          className={styles.input}
          placeholder="Password"
          {...register('password', {
            required: 'This field is required!',
          })}
        />
        {errors.password && (
          <p className={styles.warning}>{errors.password.message}</p>
        )}
      </div>

      <input className={styles.button} type="submit" />
    </form>
  );
};

export default LoginForm;
