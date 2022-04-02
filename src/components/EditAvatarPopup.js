import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <div>
      <PopupWithForm
        isOpen={props.isOpen}
        moldalType={"avatar"}
        modalTitle={"Change profile picture"}
        modalButtonText={"Change"}
        closeButtons={props.closeButtons}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          ref={avatarRef}
          id="link-input-avatar"
          className="modal__form-item modal__form-item_type_image-link"
          type="url"
          name="avatar"
          placeholder="Image link"
          required
        />
        <span id="link-input-avatar-error" className="modal__error" />
      </PopupWithForm>
    </div>
  );
}

export default EditAvatarPopup;
