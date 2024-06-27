import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./component/Redux/store/store.js";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
