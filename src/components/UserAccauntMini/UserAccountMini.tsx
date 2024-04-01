import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import './UserAccountMini.scss';
import logOut from '../../images/outline-log-out.svg';
import { setUser } from '../../redux/slices/user';

const UserAccountMini = () => {
  const { user } = useAppSelector(state => state.user);
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    // avatar: "",
  });
  console.log( typeof user)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(setUser(null));
    localStorage.removeItem('user');
    navigate('/');
  }

  useEffect(() => {
    if (!!user) {
      if (typeof user !== 'string') {
        setValues(user)
      } else {
        setValues(JSON.parse (user));
      }
    }
  }, [user])

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      dispatch(setUser(localStorage.getItem('user')))
    }
  }, [])

  return (
    <div className="miniAccount">
      {user === null ? (
        <div className="miniAccount__content">
          <div className="miniAccount__logIn">
            <span className="miniAccount__login__text">Are you are user?</span>
            <Link
              to="/account"
              className='miniAccount__logIn__link'
            >
                Log in
            </Link>
          </div>

          <div className="miniAccount__register">
            <span className="miniAccount__login__text">Is this you first visit?</span>
            <Link
              className='miniAccount__register__link'
              to="/account"
            >
              Register
            </Link>
          </div>
        </div>
      ) : (
        <div className="miniAccount__signIn">
          <div className="miniAccount__signIn__name">{values.name}, </div>
          <div className="miniAccount__signIn__text">great to have you with us!</div>
          <div
            className="miniAccount__signIn__btn"
            onClick={() => handleLogOut()}
          >
            <img className="miniAccount__signIn__btn__img" src={logOut} alt="" />
            <span className="miniAccount__signIn__btn__text">
              Sign out
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserAccountMini