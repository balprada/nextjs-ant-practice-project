import { createSlice } from "@reduxjs/toolkit";

import { setStateInSessionStorage } from "./persistent-storage";

let initialState = {
  patientList: [],
  isLoggedIn: false,
  userInfo: {},
  filteredPatientList: [],
  patientProfile: {},
};
export const slice = createSlice({
  name: "patients",
  initialState: initialState,
  reducers: {
    addPatient: (state, action) => {
      let iPatientObj = action.payload.patientProfile;

      console.log("patient added");

      let mState = {
        ...state,
        patientList: [...state.patientList, iPatientObj],
        filteredPatientList: [...state.filteredPatientList, iPatientObj],
      };

      // setStateInSessionStorage(mState);

      return mState;
    },
    deletePatient: (state, action) => {
      //   state.value -= 1;

      // let newState = { ...state };
      for (let i = 0; i < state.filteredPatientList.length; i++) {
        const patient = state.filteredPatientList[i];

        if (patient.patientId === action.payload.patientId) {
          state.filteredPatientList.splice(i, 1);
          break;
        }
      }

      for (let i = 0; i < state.patientList.length; i++) {
        const patient = state.patientList[i];

        if (patient.patientId === action.payload.patientId) {
          state.patientList.splice(i, 1);
          break;
        }
      }

      console.log("patient removed");

      // let mState = { ...state };
      setStateInSessionStorage(state);

      return state;
    },
    updatePatient: (state, action) => {
      const profToUpdate = action.payload.patientProfile;

      for (let i = 0; i < state.filteredPatientList.length; i++) {
        const patient = state.filteredPatientList[i];

        if (patient.patientId === profToUpdate.patientId) {
          state.filteredPatientList[i] = profToUpdate;
          break;
        }
      }

      for (let i = 0; i < state.patientList.length; i++) {
        const patient = state.patientList[i];

        if (patient.patientId === profToUpdate.patientId) {
          state.patientList[i] = profToUpdate;
          break;
        }
      }

      // let mState = { ...state };
      setStateInSessionStorage(state);

      return state;
    },
    setPatients: (state, action) => {
      let mState = {
        ...state,
        patientList: action.payload.patientList,
        filteredPatientList: action.payload.patientList,
        isLoggedIn: true,
      };

      // setStateInSessionStorage(mState);

      return mState;
    },
    setPatientProfile: (state, action) => {
      let mState = {
        ...state,
        patientProfile: action.payload.patientProfile,
        isLoggedIn: true,
      };

      // setStateInSessionStorage(mState);

      return mState;
    },
    setUserInfo: (state, action) => {
      let mState = {
        ...state,
        userInfo: action.payload.userInfo,
      };

      // setStateInSessionStorage(mState);

      return mState;
    },
    filterPatientsByName: (state, action) => {
      const searchTerm = action.payload.searchTerm;

      state.filteredPatientList = state.patientList.filter((value, index) => {
        let nameStr = value.patientProfile.fullName;

        let matches = nameStr.toLowerCase().match(searchTerm.toLowerCase());
        if (matches === null) {
          return false;
        }

        return true;
      });

      // let mState = { ...state };
      setStateInSessionStorage(state);

      return state;
    },
    filterPatientsBySymptoms: (state, action) => {
      const searchTerm = action.payload.searchTerm;

      state.filteredPatientList = state.patientList.filter((value, index) => {
        let diaStr = value.patientProfile.diagnosis;

        let matches = diaStr.toLowerCase().match(searchTerm.toLowerCase());
        if (matches === null) {
          return false;
        }

        return true;
      });

      // let mState = { ...state };
      setStateInSessionStorage(state);

      return state;
    },
    filterPatientsByMedicines: (state, action) => {
      const searchTerm = action.payload.searchTerm;

      state.filteredPatientList = state.patientList.filter((value, index) => {
        let presMedStr = value.patientProfile.prescribedMedication;

        let matches = presMedStr.toLowerCase().match(searchTerm.toLowerCase());
        if (matches === null) {
          return false;
        }

        return true;
      });

      // let mState = { ...state };
      setStateInSessionStorage(state);

      return state;
    },
    updatePatientPassword: (state, action) => {
      state.patientProfile.patientProfile.password = action.payload.password;

      // let mState = { ...state };
      setStateInSessionStorage(state);

      return state;
    },
    setStateInSession: (state) => {
      setStateInSessionStorage(state);
    },
    getStateFromSession: (state, action) => {
      return {
        ...state,
        ...action.payload.state,
      };
    },
    resetState: (state) => {
      setStateInSessionStorage(initialState);
      // return initialState;
    }
    
  },
});

export const {
  addPatient,
  deletePatient,
  updatePatient,
  setPatients,
  setUserInfo,
  setPatientProfile,
  filterPatientsByName,
  filterPatientsBySymptoms,
  filterPatientsByMedicines,
  updatePatientPassword,
  setStateInSession,
  getStateFromSession,
  resetState
} = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectC = (state) => state.counter.value;
export const selectPatientProfileByPid = (state, pid) => {
  // console.log(pid, state);
  for (let obj of state.authInfo.patientList) {
    if (obj.patientId === pid) {
      return obj;
    }
  }

  return {};
};

export default slice.reducer;
