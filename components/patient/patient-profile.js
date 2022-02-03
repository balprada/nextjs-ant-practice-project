import { Router, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getErrObj, isValid, validatePassword } from "../../lib/validate";
import { loadStateFromSessionStorage } from "../../store/persistent-storage";
import {
  updatePatientPassword,
  getStateFromSession,
  resetState,
} from "../../store/slice";
import store from "../../store/store";

function PatientProfile() {
  const newPasswordRef = useRef();
  const containerRef = useRef();

  const router = useRouter();

  const dispatch = useDispatch();

  console.log("PatientProfile: state on component load");
  console.log(store.getState());

  // loadStateFromSessionStorage();
  // store.dispatch(
  //   getStateFromSession({ state: JSON.parse(sessionStorage.getItem("state")) })
  // );

  // if (window.performance.navigation.type === 1) {

  // }

  // useEffect(() => {
  //   console.log('PatientProfile: useEffect: called');
  //   loadStateFromSessionStorage();
  //   setValues();
  // }, []);

  let patientProfileObj = useSelector((state) => {
    console.log("PatientProfile: state");
    console.log(state);
    if (state.authInfo.isLoggedIn === true) {
      return state.authInfo.patientProfile;
    } else {
      // dispatch/(resetState());
      return state.authInfo.patientProfile;
    }
  });

  // useEffect(() => {
  //   console.log("Login: useEffect called");
  //   loadStateFromSessionStorage();
  //   let authInfo = store.getState().authInfo;

  //   if (authInfo.isLoggedIn === true) {
  //     console.log("Login: Already logged in");
  //     // return <p>Already logged in</p>
  //     if (authInfo.userInfo.role === "D") {
  //       // router.push('/doctor/patient-list');
  //     } else if (authInfo.userInfo.role === "P") {
  //       // router.push('/patient/profile');
  //     }
  //     patientProfileObj = authInfo.patientProfile;
  //   } else {
  //     console.log("Login: Need to login");
  //     router.push("/login");
  //   }
  // }, []);

  //   let [patientProfileObj,] = useState((state) => {
  //     console.log('PatientProfile: state');
  //     console.log(state);
  //     patientProfileObj = state.authInfo.patientProfile;
  // });

  let [isUpdatePassword, setIsUpdatePassword] = useState(false);

  let [formObj, setFormObj] = useState({
    inputObj: { password: "" },
    errorObj: {},
  });

  console.log(patientProfileObj);

  // const router = useRouter();
  function setValues() {
    // let [formObj, setFormObj] = useState({
    //   inputObj: {
    //     password: patientProfileObj.patientProfile.password,
    //     //   password: state.authInfo.patientProfile.patientProfile.password,
    //   },
    //   errObj: {
    //     password: "",
    //   },
    // });
    setFormObj({
      inputObj: {
        password: patientProfileObj.patientProfile.password,
        //   password: state.authInfo.patientProfile.patientProfile.password,
      },
      errObj: {
        password: "",
      },
    });
  }

  function handleChangePasswordClick() {
    // router.replace('/doctor/patient-list');
    setIsUpdatePassword(true);
  }

  function handleSavePasswordClick() {
    const newPassword = newPasswordRef.current.value;

    validatePassword(newPassword);

    if (isValid() === false) {
      formObj.inputObj.password = newPassword;
      formObj.errObj = getErrObj();

      setFormObj({ ...formObj });
      return;
    }

    // update password
    const url = "/api/patient-update-password";

    const changePasswordObj = {
      patientOf: patientProfileObj.patientOf,
      patientId: patientProfileObj.patientId,
      newPassword: newPassword,
    };

    const reqObj = {
      method: "POST",
      body: JSON.stringify(changePasswordObj),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, reqObj)
      .then((response) => response.json())
      .then((data) => {
        // do something on success
        dispatch(updatePatientPassword({ password: newPassword }));
        setIsUpdatePassword(false);
      })
      .catch((err) => {
        console.log("Update password Failed", err);
      });
  }

  function handleCancelChangePasswordClick() {
    setIsUpdatePassword(false);
  }

  return (
    <div ref={containerRef}>
      <h1>
        {(
          patientProfileObj.patientProfile.fullName.firstName +
          " " +
          (patientProfileObj.patientProfile.fullName.lastName || "")
        ).trim()}
      </h1>
      <div>
        <p>Email Id: {patientProfileObj.patientProfile.email}</p>
        <div>
          <span>Password: {patientProfileObj.patientProfile.password} </span>
          {isUpdatePassword === false && (
            <button id="changePasswordBtn" onClick={handleChangePasswordClick}>
              Change Password
            </button>
          )}
        </div>
        {isUpdatePassword === true && (
          <div id="changePasswordContainer">
            <input
              type="text"
              placeholder="New Password"
              defaultValue={formObj.inputObj.password}
              ref={newPasswordRef}
            />
            <button onClick={handleSavePasswordClick}>Save</button>
            <button onClick={handleCancelChangePasswordClick}>Cancle</button>
            <p>{formObj.errObj.password}</p>
          </div>
        )}
        <p>Phone: {patientProfileObj.patientProfile.phone}</p>
        <p>Diagnosis: {patientProfileObj.patientProfile.diagnosis}</p>
        <p>
          Prescribed Medication:{" "}
          {patientProfileObj.patientProfile.prescribedMedication}
        </p>
      </div>

      <div>
        <p>Address: {patientProfileObj.patientProfile.address}</p>
        <p>City: {patientProfileObj.patientProfile.city}</p>
        <p>State: {patientProfileObj.patientProfile.state}</p>
        <p>Country: {patientProfileObj.patientProfile.country}</p>
        <p>Pincode: {patientProfileObj.patientProfile.pincode}</p>
      </div>
      {/* <h1>This is Profile</h1> */}
    </div>
  );
}

export default PatientProfile;
