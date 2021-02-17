import { useContext, useState } from "react";
import { StoreContext } from '../../store';
// import { fetchService } from "../../api/fetchService";
import { CustomInput } from '../../components/CustomInput';
import { ButtonPrimary } from '../../components/ButtonPrimary';

import './style.scss';

function UserPage() {
  const [editing, setEditing] = useState(false);

  const { state } = useContext(StoreContext);

  const handleChanges = (e) => {


  }


  // const fetchUser = async () => {
  //   const user = await fetchService.getUser();
  //   console.log(user)
  // }

  // useEffect(() => {
  //   fetchUser()
  // }, [])

  return (
    <form className="user">

      {state.user.first_name && !editing &&
        <div className="user__name">
          <span className="user__name-label">First Name:</span>
          <span className="user__name-first-name">{state.user.first_name}</span>
          <ButtonPrimary
            onClick={() => setEditing(true)}
            className="user__name-button">Edit</ButtonPrimary>
        </div>
      }

      {state.user.first_name && editing &&
        <div className="user__name">
          <CustomInput
            className="user__name-input"
            placeholder="Enter your first name"
          />
          <ButtonPrimary
            className="user__name-button"
            onClick={(e) => handleChanges(e)}
          >Accept</ButtonPrimary>
        </div>
      }

      {!state.user.first_name &&
        <div className="user__name">
          <CustomInput
            className="user__name-input"
            placeholder="Enter your first name"
          />
          <ButtonPrimary
            className="user__name-button"
            onClick={(e) => handleChanges(e)}
          >Accept</ButtonPrimary>
        </div>
      }

    </form >
  )
}

export {
  UserPage
}