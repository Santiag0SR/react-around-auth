import React from "react";
import editButton from "../images/edit_profile_button.svg";
import addButton from "../images/Add_button.svg";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <img
              src={currentUser.avatar}
              className="profile__avatar"
              alt={currentUser.name}
            />
            <button
              className="button profile__avatar-button"
              onClick={onEditAvatarClick}
              type="button"
              style={{ backgroundImage: `url(${editButton})` }}
            />
          </div>
          <div className="profile__text-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="button profile__edit-button"
              type="button"
              style={{ backgroundImage: `url(${editButton})` }}
              onClick={onEditProfileClick}
            />
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="button profile__add-button"
          type="button"
          style={{ backgroundImage: `url(${addButton})` }}
          onClick={onAddPlaceClick}
        />
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
