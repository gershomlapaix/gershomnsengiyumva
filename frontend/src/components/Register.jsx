import React, { useState } from "react";
import { registerNewUser } from "../api/transactions";
import "./../styles/transactions.css";

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [errorMessage, setErrorMessage] = useState({ value: "" });
  const [registerResult, setRegisterResult] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "") {
      setErrorMessage((prevState) => ({
        value: "Empty username",
      }));
    } else {
      const registerResult = await registerNewUser(username);
      setRegisterResult(registerResult);
 
      alert(
        `Keep this meter number : ${registerResult.data.newDoc.meterNumber}`
      );
      window.location.pathname = "/";
    }
  };

  return (
    <div className="transaction">
      <form onSubmit={handleSubmit}>
        <h3>Register</h3>

        <label for="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        {errorMessage.value && (
          <p className="text-danger"> {errorMessage.value} </p>
        )}

        <button type="submit" onClick={handleSubmit}>
          <a href="/" className="btn btn-buy">
            Register
          </a>

          {/* {} */}
        </button>
      </form>
      {/* 
      {registerResult.status ? (
        <div className="modal" id="modal-one" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-header">
              <h2>Keep credentials !!</h2>
              <a href="#modal-one" class="btn-close" aria-hidden="true">
                ×
              </a>
            </div>
            <div className="modal-body">
              <p>Username: {registerResult.data.newDoc.username}</p>
              <p>
                Meter number : <b>{registerResult.data.newDoc.meterNumber}</b>
              </p>
            </div>
            <div className="modal-footer">
              {" "}
              <a href="#modal-one" class="btn">
                Ok
              </a>
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
}
