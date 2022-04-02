import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <div>
      <PopupWithForm
        modalType={"edit"}
        modalTitle={"Edit Profile"}
        modalButtonText={"Save"}
        closeButtons={props.closeButtons}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          value={name}
          onChange={handleNameChange}
          id="name-input"
          className="modal__form-item modal__form-item_type_name"
          type="text"
          name="name"
          placeholder="Name"
          required
          minLength="2"
          maxLength="40"
        />
        <span id="name-input-error" className="modal__error" />
        <input
          value={description}
          onChange={handleDescriptionChange}
          id="about-input"
          className="modal__form-item modal__form-item_type_about"
          type="text"
          name="about"
          placeholder="About Me"
          required
          minLength="2"
          maxLength="200"
        />
        <span id="about-input-error" className="modal__error" />
      </PopupWithForm>
    </div>
  );
}

export default EditProfilePopup;
