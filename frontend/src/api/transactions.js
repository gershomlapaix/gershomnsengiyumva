async function getIn(credentials) {
  return fetch("http://localhost:8000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const getToken = () => {
  return JSON.parse(localStorage.getItem("tokenObj"));
};

async function transaction(amount) {
  return fetch("http://localhost:8000/api/v1/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      meterNumber: getToken().data.user.meterNumber,
      transactionAmount: amount,
    }),
  }).then((data) => data.json());
}

async function registerNewUser(username) {
  return fetch("http://localhost:8000/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username }),
  }).then((data) => data.json());
}

export { transaction, getIn, registerNewUser };
