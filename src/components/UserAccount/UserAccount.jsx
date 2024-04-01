import React, { useEffect} from 'react'
import UserSignUpForm from '../UserSignUpForm/UserSignUpForm'
import { useAppDispatch, useAppSelector } from '../../redux/store';
import UserPage from '../UserPage/UserPage';
import { toggleForm } from '../../redux/slices/user';

const UserAccount = () => {
  const dispatch = useAppDispatch();
  const showForm = useAppSelector(state => state.user.showForm);
  const user = useAppSelector(state => state.user.user);
  console.log(user);

  // useEffect(() => {
  //   if (!user) {
  //     dispatch(toggleForm(true))
  //     console.log(user === true)
  //   }
  // }, [user])

  return (
    <div className='userAccount'>
      {user === null ? (
      <UserSignUpForm />
      ) : (
        <UserPage />
      )}
    </div>
  )
}

export default UserAccount