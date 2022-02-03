import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setFNameLName } from "../../lib/util";
import {
  validateDiagnosis,
  validateEmail,
  validateFullName,
  validatePassword,
  validatePhoneNo,
  validatePincode,
  validatePresMedicine,
  getErrObj,
  validatePatientProfile,
  isValid,
} from "../../lib/validate";
import { addPatient } from "../../store/slice";

function AddPatientForm(props) {
  const dispatch = useDispatch();

  let [formObj, setFormObj] = useState({
    inputObj: {
      email: "",
      password: "",
      fullName: {},
      phone: "",
      diagnosis: "",
      prescribedMedication: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
    errObj: {
      email: "",
      password: "",
      fullName: "",
      phone: "",
      diagnosis: "",
      prescribedMedication: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  function handleSaveClick() {
    const url = "/api/doctor/patient-add";
    const profileInfo = {
      email: formObj.inputObj.email,
      password: formObj.inputObj.password,
      fullName: formObj.inputObj.fullName,
      phone: formObj.inputObj.phone,
      diagnosis: formObj.inputObj.diagnosis,
      prescribedMedication: formObj.inputObj.prescribedMedication,
      address: formObj.inputObj.address,
      city: formObj.inputObj.city,
      state: formObj.inputObj.state,
      country: formObj.inputObj.country,
      pincode: formObj.inputObj.pincode,
    };

    validatePatientProfile(profileInfo);

    if (isValid() === false) {
      formObj.inputObj = profileInfo;

      formObj.errObj = getErrObj();

      console.log(formObj.errObj);

      setFormObj({ ...formObj });
      return;
    }

    // break fullName into firstName and lastName
    profileInfo.fullName = setFNameLName(profileInfo.fullName);

    const patientProfReqObj = {
      patientOf: props.patientOf,
      patientId: "",
      patientProfile: profileInfo,
    };

    const reqObj = {
      method: "POST",
      body: JSON.stringify(patientProfReqObj),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, reqObj)
      .then((response) => response.json())
      .then((data) => {
        // do something with response
        patientProfReqObj.patientId = data.patientId;

        dispatch(addPatient({ patientProfile: patientProfReqObj }));

        // router.replace("/patient-list");
        props.formExitFun(false);
      })
      .catch((err) => {
        console.log("Add Patient Profile Failed: ", err);
      });
  }
  function handleCancelClick() {
    // router.replace("/patient-list");
    props.formExitFun(false);
  }

  function handleOnChange(event) {
    // console.log(event);
    let fieldName = event.target.name;
    let fieldValue = event.target.value;

    switch (fieldName) {
      case "email":
        validateEmail(fieldValue);
        formObj.errObj = getErrObj();
        break;
      case "password":
        validatePassword(fieldValue);
        formObj.errObj = getErrObj();
        break;
      case "fullName":
        validateFullName(fieldValue);
        formObj.errObj = getErrObj();
        fieldValue = setFNameLName(fieldValue);
        break;
      case "phone":
        validatePhoneNo(fieldValue);
        formObj.errObj = getErrObj();
        break;
      case "diagnosis":
        validateDiagnosis(fieldValue);
        formObj.errObj = getErrObj();
        break;
      case "prescribedMedication":
        validatePresMedicine(fieldValue);
        formObj.errObj = getErrObj();
        break;
      case "pincode":
        validatePincode(fieldValue);
        formObj.errObj = getErrObj();
        break;

      default: // do nothing
    }

    formObj.inputObj[fieldName] = fieldValue;

    console.log(formObj.errObj);

    setFormObj({ ...formObj });
  }

  return (
    <section>
      <h1>Patient Profile Form</h1>
      <div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            required
            value={formObj.inputObj.email}
            onChange={handleOnChange}
          />
          <p>{formObj.errObj.email}</p>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            required
            value={formObj.inputObj.password || "healthCare"}
            onChange={handleOnChange}
          />
          <p>{formObj.errObj.password}</p>
        </div>
        <div>
          <label htmlFor="fullName">Full Name: </label>
          <input
            type="text"
            name="fullName"
            required
            value={(
              (formObj.inputObj.fullName.firstName || "") +
              " " +
              (formObj.inputObj.fullName.lastName || "")
            ).trim()}
            onChange={handleOnChange}
          />
          <p>{formObj.errObj.fullName}</p>
        </div>
        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            name="phone"
            required
            value={formObj.inputObj.phone}
            onChange={handleOnChange}
          />
          <p>{formObj.errObj.phone}</p>
        </div>
        <div>
          <label htmlFor="diagnosis">Diagnosis: </label>
          <input
            type="text"
            name="diagnosis"
            required
            value={formObj.inputObj.diagnosis}
            onChange={handleOnChange}
          />
          <p>{formObj.errObj.diagnosis}</p>
        </div>
        <div>
          <label htmlFor="prescribedMedication">Prescribed Medication: </label>
          <input
            type="text"
            name="prescribedMedication"
            required
            value={formObj.inputObj.prescribedMedication}
            onChange={handleOnChange}
          />
          <p>{formObj.errObj.prescribedMedication}</p>
        </div>
        <div>
          <label htmlFor="address">Address: </label>
          <input type="text" name="address" onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="city">City: </label>
          <input type="text" name="city" onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="state">State: </label>
          <input type="text" name="state" onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="country">Country: </label>
          <input type="text" name="country" onChange={handleOnChange} />
        </div>
        <div>
          <label htmlFor="pincode">Pincode: </label>
          <input
            type="text"
            name="pincode"
            required
            value={formObj.inputObj.pincode}
            onChange={handleOnChange}
          />
          <p>{formObj.errObj.pincode}</p>
        </div>
        <div>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    </section>
  );
}

export default AddPatientForm;
