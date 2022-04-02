function PopupWithForm(props) {
  return (
    <div
      className={`modal modal_type_${props.moldalType} ${
        props.isOpen && "modal_open"
      }`}
    >
      <div className={`modal__box modal__box_type_${props.moldalType}`}>
        <button
          className={`modal__close-button modal__close-button_type_${props.moldalType} button`}
          type="button"
          style={{ backgroundImage: `url(${props.closeButtons})` }}
          onClick={props.onClose}
        />
        <form
          className={`modal__form modal__form_type_${props.moldalType}`}
          name={`profile-form_type_${props.moldalType}`}
          onSubmit={props.onSubmit}
        >
          <h2 className={`modal__text modal__text_type_${props.moldalType}`}>
            {props.modalTitle}
          </h2>
          {props.children}
          <button
            className={`button modal__save-button modal__save-button_type_${props.moldalType}`}
            type="submit"
          >
            {props.modalButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
