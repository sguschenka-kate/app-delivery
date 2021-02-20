import { useContext, useState } from "react";

import { StoreContext } from '../../store';
import * as types from '../../store/actions';
import { fetchService } from "../../api/fetchService";
import { UserInfo } from '../../components/User/UserInfo';
import { UserForm } from '../../components/User/UserForm';

import './style.scss';

function UserPage() {
  const { state, dispatch } = useContext(StoreContext);

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(state.user.name || '');
  const [surname, setSurname] = useState(state.user.surname || '');
  const [address, setAddress] = useState(state.user.address || '');

  const editUser = async (data) => {
    console.log({ ...data })
    const user = await fetchService.editUser(data);
    console.log(user)
  }

  const handleEditModeOff = (e) => {
    const user = editUser({ name, surname, address });
    dispatch({
      type: types.EDIT_USER,
      payload: {
        user
      }
    });
    setEditing(false);
    e.preventDefault();
  }



  return (
    <form onSubmit={handleEditModeOff} className="user">

      {!editing
        ?
        <UserInfo handleEditModeOn={() => setEditing(true)} />
        :
        <UserForm
          handleEditModeOff={handleEditModeOff}
          handleName={(v) => setName(v)}
          handleSurname={(v) => setSurname(v)}
          handleAddress={(v) => setAddress(v)}
        />
      }

    </form >
  )
}

export {
  UserPage
}