import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Fulllayout from "./layouts/fulllayout.jsx";
import Signup from "./Auth/Signup";
import Login2 from "./Auth/Login2";
import { configureStore } from "./redux/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import CustomerLogin from "./Auth/CustomerLogin.js";
import ForgotPassword from "./Auth/ForgotPassword.js";
import UpdatePassword from "./Auth/UpdatePassword.js";

const { persistor, store } = configureStore();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HashRouter>
            <Switch>
              <Route exact path="/login" name="Login" component={Login2} />
              <Route
                exact
                path="/clogin"
                name="CustomerLogin"
                component={CustomerLogin}
              />
              <Route
                exact
                path="/forgot-password"
                name="ForgotPassword"
                component={ForgotPassword}
              />
              <Route
                exact
                path="/update-password"
                name="UpdatePassword"
                component={UpdatePassword}
              />

              <Route
                exact={true}
                path="/signup"
                name="Signup"
                component={Signup}
              />
              <Route path="/" name="Home" component={Fulllayout} />
            </Switch>
          </HashRouter>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
