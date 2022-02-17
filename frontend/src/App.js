import "./index.css";
function App() {
  return (
    <div className="App">
      <div className="header">
        <div class="header__logo-box">
          <img src="https://cdn.dribbble.com/users/6225232/screenshots/15138375/media/90a48df2fc5ddef462542aafd1f9041c.jpg?compress=1&resize=400x300" alt="Logo" class="header__logo" />
        </div>

        <div class="header__text-box">
          <h1 class="heading-primary">
            <span class="heading-primary--main">Electricity</span>
            <span class="heading-primary--sub">We provide you good services</span>
          </h1>

          <a href="#" class="btn btn--white btn--animated">
            Get started
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
