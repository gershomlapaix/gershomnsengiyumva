import React from "react";
import useToken from "../Hooks/UseToken";

export default function Home() {
  const {logout } = useToken();
  return (
    <div className="App">
      <div className="header">
        <div className="header__logo-box">
          <img
            src="https://cdn.dribbble.com/users/6225232/screenshots/15138375/media/90a48df2fc5ddef462542aafd1f9041c.jpg?compress=1&resize=400x300"
            alt="Logo"
            className="header__logo"
          />
        </div>

        <div className="header__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">Electricity</span>
            <span className="heading-primary--sub">
              We provide you good services
            </span>
          </h1>

          <a href="/transactions" className="btn btn--white btn--animated">
            Go Buy
          </a>
        </div>
        
        <div className="btn btn--logout">
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
