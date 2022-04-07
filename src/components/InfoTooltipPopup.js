import successImage from "../images/success.svg";
import failedImage from "../images/failed.svg";

function InfoTooltipPopup(props) {
  return (
    <div
      className={`modal modal_type_infotooltip ${props.isOpen && "modal_open"}`}
    >
      <div className={`modal__box modal__box_type_infotooltip`}>
        {props.status === "success" ? (
          <div className="infotooltip">
            <img
              src={successImage}
              alt="Success icon"
              className="infotooltip__icon"
            ></img>
            <p className="infotooltip__text">
              Success! You have now been registered.
            </p>
          </div>
        ) : (
          <div className="infotooltip">
            <img
              src={failedImage}
              alt="Failed icon"
              className="infotooltip__icon"
            ></img>
            <p className="infotooltip__text">
              Oops, something went wrong! Please try again.
            </p>
          </div>
        )}
        <button
          className={`modal__close-button modal__close-button_type_edit button`}
          type="button"
          style={{ backgroundImage: `url(${props.closeButtons})` }}
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltipPopup;
