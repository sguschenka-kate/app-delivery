import { useContext, useState } from 'react';
import Input from 'react-phone-number-input/input';
import { Link } from 'react-router-dom';
import { fetchService } from '../../api/fetchService';
import { CustomInput } from '../../components/CustomInput';
import { StoreContext } from '../../store';
import * as types from '../../store/actions';
import './style.scss';

function AuthPage() {
  const { dispatch } = useContext(StoreContext);
  const [data, setData] = useState({
    phone: '',
    password: ''
  });

  const handleLogin = async (data) => {
    const dataUser = await fetchService.verifyUser(data);
    if(dataUser)
    console.log(dataUser);
    dispatch({
      type: types.HANDLE_USER,
      payload: dataUser,
    })
  }

  return (
    <div className="auth">
      <img src="./img/loader-man.png" alt="logo" className="auth__logo" />
      <div className="auth__form">
        <Input
          className="search__input auth__input"
          placeholder="+380 50 250 5050"
          value={data.phone}
          onInput={(e) => setData({ ...data, phone: e.target.value })}
          onChange={(e) => { }}
        />
        <CustomInput
          type="password"
          className="auth__input margin-top"
          value={data.password}
          onInput={(e) => setData({ ...data, password: e.target.value })}
          placeholder="*******"
          required
        />

        <button type="button"
         onClick={() => handleLogin(data)} className="btn-primary auth__btn margin-top">
          Enter
        </button>
      </div>

    </div>
  )
}

export {
  AuthPage
}