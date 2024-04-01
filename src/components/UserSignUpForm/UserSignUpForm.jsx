import React, { useEffect, useState } from 'react';
import './UserSignUpForm.scss';
import trackWay from '../../images/trackWay.svg';
import discount from '../../images/discount.svg';
import access from '../../images/access.svg';
import user, { fetchUser, loginUser, setUser } from '../../redux/slices/user';
import { useAppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setUser2 } from '../../redux/slices/user2';


const UserSignUpForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const [values2, setValues2] = useState({
    email: "",
    password: "",
  })

  const [idInput, setIdInput] = useState(0);
  const [focussed, setFocused] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const dispatch = useAppDispatch();

  console.log(idInput)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).every(val => val);
    if (!isNotEmpty) {
      setFocused(true)
    }

    // axios.post('http://localhost:8080/register', values)
    //   .then(({data}) => {
    //     dispatch(setUser2({
    //       token: data.accessToken,
    //       ...data.user
    //     }))

    dispatch(fetchUser(values));

        localStorage.setItem('user', JSON.stringify({ ...values }))

        navigate('/')
      }
  


  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      dispatch(setUser(localStorage.getItem('user')))
    }
  }, [])

  const handleSubmit2 = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values2).every(val => val);
    if (!isNotEmpty) {
      setFocused(true)
    }
    // axios.post('http://localhost:8080/login', values2)
    //   .then(({data}) => {
    //     dispatch(setUser2({
    //       token: data.accessToken,
    //       ...data.user
    //     }))

        
      
    dispatch(loginUser(values2))
   
    // localStorage.setItem('user', JSON.stringify({
    //   ...user
    //  }))
      navigate('/')
  }

  const onChangeInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    console.log(values)
  };
  const onChangeInputLogin = (e) => {
    setValues2({ ...values2, [e.target.name]: e.target.value })
    console.log(values)
  };

  const onToogleId = (e) => {
    setIdInput(+e.target.id);
  }

  const onFocusInput = (e) => {
    setFocused(true);
  }
  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      // placeholder: 'Email',
      label: 'Email',
      errormessage: 'Please enter valid characters only',
      required: true,
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$",
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      // placeholder: 'Password',
      label: 'password',
      errormessage: 'Please enter valid characters only',
      required: true,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$",
    }
  ]

  const inputsForm = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      label: 'Email',
      errormessage: 'Please enter valid characters only',
      required: true,
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$",
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      label: 'password',
      errormessage: 'Please enter valid characters only',
      required: true,
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$",
    },
    {
      id: 3,
      name: 'name',
      type: 'text',
      label: 'name',
      errormessage: 'Please enter valid characters only',
      required: true,
      pattern: "[A-Za-z ]{1,32}",
    },
    {
      id: 4,
      name: 'avatar',
      type: 'avatar',
      label: 'avatar',
      errormessage: 'Please enter valid characters only',
      required: true,
      // pattern: "[A-Za-z ]{1,32}",
    },

  ]

  return (
    <div className='userSignUp'>
      <div className={!!openForm ? "userSignUp__leftSide userSignUp__leftSide--form" : "userSignUp__leftSide"}>
        <div className="userSignUp__form">
          <h2 className="userSignUp__title">Are you a user?</h2>
          {!!openForm ? (
            <div className="userSignUp__form__goIn">
              <button
                className='signUp__form__btn'
                onClick={() => setOpenForm(!openForm)}
              >
                Sign in
              </button>
            </div>
          ) : (
            <form
              action=""
              className="signUp__form"
              onSubmit={handleSubmit2}
            >
              {inputs.map(item => (
                <div className='signUp__form__inputWrap' key={item.id}>
                  <input {...item}
                    onChange={onChangeInputLogin}
                    onClick={onToogleId}
                    className='signUp__form__input'
                    onBlur={onFocusInput}
                    focused={focussed.toString()}
                  />
                  <label className={item.id === idInput || !!values2[item.name] ? 'signUp__form__label signUp__form__labelClicked' : 'signUp__form__label'}>{item.label}</label>
                  <span className="signUp__form__errorMessage">{item.errormessage}</span>
                </div>
              ))}
              <button className='signUp__form__btn'>Sign in</button>
              <button className='signUp__form__btnForgot'>I forgot my password</button>
            </form>
          )}

        </div>
      </div>


      <div className={!!openForm ?
        "userSignUp__rightSide userSignUp__rightSide--form"
        : "userSignUp__rightSide"}
      >
        <div className="userSignUp__rightSide__wrap">
          <h2 className="userSignUp__rightSide__title">Is this you first visit?</h2>
          <button
            className={!!openForm ? '' : 'userSignUp__rightSide__btn'}
            onClick={() => setOpenForm(!openForm)}
          >
            Make account
          </button>

          {!!openForm ? (
            <form
              action=""
              className="signUp__form"
              onSubmit={handleSubmit}
            >
              {inputsForm.map(item => (
                <div className='signUp__form__inputWrap' key={item.id}>
                  <input {...item}
                    onChange={onChangeInput}
                    onClick={onToogleId}
                    className='signUp__form__input'
                    onBlur={onFocusInput}
                    focused={focussed.toString()}
                  />
                  <label className={item.id === idInput || !!values[item.name] ? 'signUp__form__label signUp__form__labelClicked' : 'signUp__form__label'}>{item.label}</label>
                  <span className="signUp__form__errorMessage">{item.errormessage}</span>
                </div>
              ))}
              <button className='signUp__form__btn'>Create account</button>
              <button className='signUp__form__btnForgot'>I forgot my password</button>
            </form>
          ) : (
            <div className="userSignUp__rightSide__gain">
              <h3 className="userSignUp__rightSide__gain__title">
                You'll gain
              </h3>
              <ul className="userSignUp__rightSide__gain__list">
                <li className="userSignUp__rightSide__gain__list__item">
                  <img src={discount} alt="" />
                  <p>10% discount for newsletter sign up</p>
                </li>
                <li className="userSignUp__rightSide__gain__list__item">
                  <img src={access} alt="" />
                  <p>Convenient way to track your order</p>
                </li>
                <li className="userSignUp__rightSide__gain__list__item">
                  <img src={trackWay} alt="" />
                  <p>Easy access to order history</p>
                </li>
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default UserSignUpForm