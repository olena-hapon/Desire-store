import React, { useEffect, useState } from 'react';
import './UserPage.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { setUser, updateUser } from '../../redux/slices/user';
// import { updateUser } from '../../redux/slices/user';

const UserPage = () => {
  const user = useAppSelector(state => state.user.user);
  console.log(user);
  const dispatch = useAppDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  })

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every(val => val);
    if (!isNotEmpty) {
      // setFocused(true)
    }

    dispatch(updateUser(values));
    localStorage.setItem('user', JSON.stringify({ ...values }))

    navigate('/')
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

  // useEffect(() => {
  //   if (!user) return;

  //   setValues(user);
  // }, [user]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleLogOut = () => {
    dispatch(setUser(null));
    localStorage.removeItem('user');
    navigate('/');
  }

  // useEffect(() => {
  //   if (localStorage.getItem('user') !== null) {
  //     dispatch(setUser2(localStorage.getItem('user')))
  //   }
  // }, [])

  return (
    <div className='userPage'>
      <div className="userPage__wrapper">
        <h3 className="userPage__title">My data</h3>
        <form className="userPage__form" onSubmit={handleSubmit}>
          <div className="userPage__inputWrap">
          
                <label htmlFor="" className="userPage__label">
                  Email
                  <span>*</span>
                </label>
                <div className="userPage__input-field">
                  <input
                    name="email"
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    className="userPage__input"
                    onChange={handleChange}
                    value={values.email}
                    required
                  />
                </div>
                <label htmlFor="" className="userPage__label">
                  Name
                  <span>*</span>
                </label>
                <div className="userPage__input-field">
                  <input
                    name="name"
                    type="name"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    className="userPage__input"
                    onChange={handleChange}
                    value={values.name}
                    required
                  />
                </div>
                <label htmlFor="" className="userPage__label">
                  Password
                  <span>*</span>
                </label>
                <div className="userPage__input-field">
                  <input
                    name="password"
                    type="password"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    className="userPage__input"
                    onChange={handleChange}
                    value={values.password}
                    required
                  />
                </div>

                <label htmlFor="" className="userPage__label">
                  Avatar
                  <span>*</span>
                </label>
                <div className="userPage__input-field">
                  <input
                    name="avatar"
                    type="avtar"
                    className="userPage__input"
                    onChange={handleChange}
                    value={values.avatar}
                    required
                  />
                </div>
          
          </div>
          <button className="userPage__btn">
            <span>Save changes</span>
          </button>
          <button
            className="userPage__logout"
            onClick={() => handleLogOut()}
          >
            <span>Sign out</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserPage