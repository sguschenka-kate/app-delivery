import { useContext } from 'react';
import { StoreContext } from '../../../store';
import { CustomInput } from '../../CustomInput';
import { ButtonPrimary } from '../../ButtonPrimary';

import '../style.scss';

function UserForm({ handleEditModeOff, handleName, handleSurname, handleAddress }) {
  const { state } = useContext(StoreContext);

  const handleChanges = (e) => {
    console.log(e);
    handleEditModeOff(e);
    e.preventDefault();
  }

  return (
    <div className="user__container user__container--form">
      <fieldset className="user__field user__field--form">
        <label className="user__field-label" htmlFor='name'>Name:</label>
        <CustomInput
          id='name'
          className="user__field-input"
          placeholder="Enter your name"
          defaultValue={state.user.name}
          onChange={(e) => handleName(e.target.value)}
          required
        />
      </fieldset>

      <fieldset className="user__field user__field--form">
        <label className="user__field-label" htmlFor='surname'>Surname:</label>
        <CustomInput
          id='surname'
          className="user__field-input"
          placeholder="Enter your surname"
          defaultValue={state.user.surname}
          onChange={(e) => handleSurname(e.target.value)}
          required
        />
      </fieldset>

      <fieldset className="user__field user__field--form">
        <label className="user__field-label" htmlFor='address'>Address:</label>
        <CustomInput
          id='address'
          className="user__field-input"
          placeholder="Enter your address"
          defaultValue={state.user.address}
          onChange={(e) => handleAddress(e.target.value)}
          required
        />
      </fieldset>

      <ButtonPrimary
        type='submit'
        className="user__field-button"
        onSubmit={(e) => handleChanges(e)}
      >Accept</ButtonPrimary>
    </div>
  )
}

export {
  UserForm
}