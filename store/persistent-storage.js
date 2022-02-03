import store from "./store";
import { getStateFromSession } from "./slice";

// persistant storage for state, so it will not vanish/lost on reload

export function setStateInSessionStorage(state) {
  console.log("setStateInSessionStorage: called");

  console.log(state);
//   let sessionStorage = window.sessionStorage;
  sessionStorage.setItem("state", JSON.stringify(state));

  console.log("setStateInSessionStorage: after item set");
//   console.log(sessionStorage);
}

export function loadStateFromSessionStorage() {
  console.log("loadStateFromSessionStorage: called");

//   console.log(store.getState());
//   console.log(localStorage);
//   console.log(sessionStorage);
//   let sessionStorage = sess;
  store.dispatch(
    getStateFromSession({ state: JSON.parse(sessionStorage.getItem("state")) })
  );

//   console.log("loadStateFromSessionStorage: after update");
  console.log(store.getState());
  //   initStoreWithPreloadedState();
}
