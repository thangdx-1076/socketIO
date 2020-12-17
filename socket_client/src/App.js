import React from "react";
import { Provider } from "react-redux";
import configStore from "./redux/configStore/configStore";
import Routes from "./routers/Routes";
const store = configStore();
function App(props) {
  return (
    <Provider store={store}>
      <Routes></Routes>
    </Provider>
  );
}

export default App;
