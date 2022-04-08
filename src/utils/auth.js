export const BASE_URL = "https://register.nomoreparties.co";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        const err = new Error("One of the fields was filled in incorrectly ");
        err.statusCode = 400;
        throw err;
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      if (err.statusCode === 400) {
        console.log(err.message);
      } else {
        console.log(err);
      }
    });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("email", email);
        return data;
      }
    })
    .catch((err) => {
      if (err.message === "400") {
        console.log("One or more of the fields were not provided");
      } else if (err.message === "401") {
        console.log("the user with the specified email was not found");
      } else console.log(err);
    });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      if (data.ok) {
        return data.json();
      } else {
        const err = new Error("One of the fields was filled in incorrectly ");
        err.statusCode = 400;
        throw err;
      }
    })
    .catch((err) => {
      if (err.message === "400") {
        console.log("Token not provided or provided in the wrong format");
      } else if (err.message === "401") {
        console.log("The provided token is invalid ");
      } else console.log(err);
    });
};
