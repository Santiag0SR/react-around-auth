import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setTitle("");
    setLink("");
  }, [props.isOpen]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit({
      name: title,
      link,
    });
  }

  return (
    <div>
      <PopupWithForm
        isOpen={props.isOpen}
        moldalType={"add"}
        modalTitle={"New Place"}
        modalButtonText={"Create"}
        closeButtons={props.closeButtons}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          value={title}
          onChange={handleTitleChange}
          id="title-input"
          className="modal__form-item modal__form-item_type_title"
          type="text"
          name="title"
          placeholder="Title"
          required
          minLength="1"
          maxLength="40"
        />
        <span id="title-input-error" className="modal__error" />
        <input
          value={link}
          onChange={handleLinkChange}
          id="link-input"
          className="modal__form-item modal__form-item_type_image-link"
          type="url"
          name="link"
          placeholder="Image link"
          required
        />
        <span id="link-input-error" className="modal__error" />
      </PopupWithForm>
    </div>
  );
}

export default AddPlacePopup;
