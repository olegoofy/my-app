import React from 'react';
import { NavLink } from 'react-router-dom';
import Profile from '../Profile/Profile';
import styles from './Users.module.css';

const Users = (props) => {
  return (
    <div>
      {props.countOfPages.map((num, idx) => (
        <span
          key={idx}
          className={props.selectedPage === num ? styles.selectedPage : ''}
          onClick={() => props.onPageChanged(num)}
        >
          {num}
        </span>
      ))}
      {props.usersData.map((item, key) => (
        <div key={key}>
          <div key={key}>{item.name}</div>
          <NavLink to={'./../profile/' + item.id} element={<Profile />}>
            <img
              className={styles.avatar}
              src={
                item.photos.large
                  ? item.photos.large
                  : 'https://icon-library.com/images/users-icon-png/users-icon-png-6.jpg'
              }
              alt="There is an avatar"
            />
          </NavLink>
          <span>
            <p>{item.status}</p>
          </span>
          <div>
            {item.followed ? (
              <button
                onClick={() => {
                  props.onFollowChange(item.id);
                }}
              >
                FOLLOWED
              </button>
            ) : (
              <button
                onClick={() => {
                  props.onFollowChange(item.id);
                }}
              >
                UNFOLLOWED
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
