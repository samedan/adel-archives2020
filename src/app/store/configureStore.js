import { createStore, applyMiddleware } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
import { verifyAuth } from "../../features/auth/authActions";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
});

export function configureStore() {
  const store = createStore(
    rootReducer(history),
    composeWithDevTools(applyMiddleware(thunk))
  );

  store.dispatch(verifyAuth());

  return store;

  // return createStore(rootReducer, devToolsEnhancer());
}
