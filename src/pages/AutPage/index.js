import { useContext, useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';

import { fetchService } from '../../api/fetchService';
import { StoreContext } from '../../store';
import * as types from '../../store/actions';
import { CustomInput } from '../../components/CustomInput';
import { ButtonPrimary } from '../../components/ButtonPrimary';

import './style.scss';
import 'react-phone-input-2/lib/style.css';


function AuthPage({ history }) {
  const { state, dispatch } = useContext(StoreContext);
  const [data, setData] = useState({
    phone: '',
    password: '',
  });

  const handleLogin = async data => {
    const dataUser = await fetchService.verifyUser(data);
    dispatch({
      type: types.LOGIN_USER,
      payload: dataUser,
    })

    history.push("/")
  }

  // const redirectToCategoriesPage = () => 

  const handleSumbit = (e) => {
    handleLogin(data);
    e.preventDefault()
  }

  useEffect(() => {
    if (state.token) {
      history.push("/")
    }
  }, [history, state.token])

  return (
    <div className="auth">
      <img src="./img/loader-man.png" alt="logo" className="auth__logo" />
      <form onSubmit={(e) => handleSumbit(e)} className="auth__form">
        <PhoneInput
          country={'ua'}
          inputClass="auth__input--phone"
          buttonClass="auth__input--phone-button"
          dropdownClass="auth__input--phone-dropdown"
          placeholder="+380 50 250 5050"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e })}
        />
        <CustomInput
          type="password"
          className="auth__input margin-top"
          value={data.password}
          onInput={(e) => setData({ ...data, password: e.target.value })}
          placeholder="*******"
        />

        <ButtonPrimary
          type="submit"
          onSubmit={(e) => handleSumbit(e)}
          className="auth__btn margin-top">
          Enter
        </ButtonPrimary>
      </form>

    </div>
  )
}

export {
  AuthPage
}