import React, { useState } from "react";
import { getIn } from "../api/transactions";
import "./../styles/transactions.css";

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [meterNumber, setMeterNumber] = useState();
  const [errorMessage, setErrorMessage] = useState({ value: "" });
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || meterNumber === "") {
      setErrorMessage((prevState) => ({
        value: "Empty username/meter number",
      }));
      setIsDisabled(true);
    } else {
      const token = await getIn({
        username,
        meterNumber,
      });

      window.location.pathname = "/home";
      setToken(token.token);
      localStorage.setItem("tokenObj", JSON.stringify(token));
      setIsDisabled(false);
    }
  };

  return (
    <div className="transaction">
      <form onSubmit={handleSubmit}>
        <h3>Get in</h3>

        <label for="username">Username</label>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label for="password">Meter number</label>
        <input
          type="password"
          placeholder="Meter"
          id="meter"
          onChange={(e) => setMeterNumber(e.target.value)}
        />

        <div className="btns">
          <button type="submit" id="Buy">
            Go
          </button>

          <div className="register">
            {"Not Register?  "}
            <a href="/register">Register</a>
          </div>
        </div>
      </form>
    </div>
  );
}
