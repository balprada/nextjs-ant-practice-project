import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./slice";

export default configureStore({
  reducer: {
    authInfo: patientReducer,
  },
});

// function initStore() {
//   store = 
// }

// export function initStoreWithPreloadedState(state) {
//   store = configureStore({
//     reducer: {
//       authInfo: patientReducer,
//     },
//     preloadedState: state,
//   });
// }

// export default store;
