import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const user = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === user._id;
  const cardDeleteButtonClassName = `button card__delete-button ${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;
  const isLiked = card.likes.some((item) => item._id === user._id);
  const cardLikeButtonClassName = `button card__like-button ${
    isLiked ? "card__like-button_active" : "card__like-button_inactive"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      />
      <img
        className="card__img"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__text-container">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__likes-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          />
          <p className="card__text card__text_likes-number">
            {card.likes.length}
          </p>
        </div>
      </div>
    </article>
  );
}

export default Card;
