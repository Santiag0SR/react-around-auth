import closeButton from "../images/Close_button.svg";
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import InfoTooltipPopup from "./InfoTooltipPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { register } from "../utils/auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [status, setStatus] = React.useState(true);

  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true);
  };

  useEffect(() => {
    api
      .getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => console.error(`Problem fetching cards cards: ${err}`));
  }, []);

  useEffect(() => {
    api
      .getProfile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.error(`Problem fetching profile data: ${err}`));
  }, []);

  function handleAddPlaceSubmit(card) {
    api
      .createCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Problem adding new card: ${err}`));
  }

  const handleRegistrationSubmit = (email, password) => {
    register(email, password)
      .then((res) => {
        if (res.data._id) {
          console.log("res OK");
          setStatus("success");
          navigate("/singin");
        } else {
          console.log("Something went wrong.");
          setStatus("failed");
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus("failed");
      })
      .finally(() => {
        setTooltipOpen(true);
      });
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .likeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        );
      })
      .catch((err) => console.error(`Problem liking card: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card));
      })
      .catch((err) => console.error(`Problem deleting card: ${err}`));
  }

  function handleUpdateUser(userData) {
    api
      .changeProfileInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Problem updating user: ${err}`));
  }

  function handleUpdateAvatar(userData) {
    api
      .changeProfileAvatar(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(`Problem updating avatar: ${err}`));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setTooltipOpen(false);
  }

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Routes>
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route
              exact
              path="/"
              element={
                <Main
                  onEditAvatarClick={handleEditAvatarClick}
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
          </Route>
          <Route
            path="/singin"
            element={<Login handleLogin={handleLogin} />}
          ></Route>
          <Route
            path="/singup"
            element={
              <Register handleRegistrationSubmit={handleRegistrationSubmit} />
            }
          ></Route>
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/singin" replace />
              )
            }
          />
        </Routes>
        <Footer />
        <PopupWithForm
          moldalType={"delete"}
          modalTitle={"Are you sure?"}
          modalButtonText={"Yes"}
          closeButtons={closeButton}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          closeButtons={closeButton}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          closeButtons={closeButton}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          closeButtons={closeButton}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <ImagePopup
          closeButtons={closeButton}
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltipPopup
          isOpen={isTooltipOpen}
          closeButtons={closeButton}
          status={status}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
