import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getErrObj, isValid, validatePassword } from "../../lib/validate";
import { updatePatientPassword } from "../../store/slice";
import store from "../../store/store";
import { Card, Typography, Button, Avatar, Input } from "antd";
import {
  ArrowLeftOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";

function PatientProfile() {
  const { Text } = Typography;
  // const newPasswordRef = useRef();

  const dispatch = useDispatch();

  console.log("PatientProfile: state on component load");
  console.log(store.getState());

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

  let [isUpdatePassword, setIsUpdatePassword] = useState(false);

  let [formObj, setFormObj] = useState({
    inputObj: { password: "" },
    errObj: { password: "" },
  });

  console.log(patientProfileObj);

  // const router = useRouter();
  function setValues() {
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
    // const newPassword = newPasswordRef.current.value;

    validatePassword(formObj.inputObj.password);

    if (isValid() === false) {
      // formObj.inputObj.password = newPassword;
      formObj.errObj = getErrObj();

      setFormObj({ ...formObj });
      return;
    }

    // update password
    const url = "/api/patient-update-password";

    const changePasswordObj = {
      patientOf: patientProfileObj.patientOf,
      patientId: patientProfileObj.patientId,
      newPassword: formObj.inputObj.password,
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
        dispatch(updatePatientPassword({ password: formObj.inputObj.password }));
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
    <Card
      title={
        <div>
          <Avatar
            src="https://joeschmoe.io/api/v1/random"
            style={{ marginRight: "1em" }}
          />
          <Text>
            {(
              patientProfileObj.patientProfile.fullName.firstName +
              " " +
              (patientProfileObj.patientProfile.fullName.lastName || "")
            ).trim()}
          </Text>
        </div>
      }
    >
      <Card
        type="inner"
        title="Profile Information"
        // extra={
        //   <Button
        //     type="secondary"
        //     shape="circle"
        //     size="small"
        //     icon={<ArrowLeftOutlined />}
        //     onClick={handleBackClick}
        //   ></Button>
        // }
      >
        {/* <div style={{ display: "flex", width: "100%" }}> */}
        <div className="padding-right padding-top-bottom">
          <Text strong type="secondary">
            Email Id:{" "}
          </Text>
          <Text>{patientProfileObj.patientProfile.email}</Text>
        </div>
        <div className="padding-right padding-top-bottom">
          <Text strong type="secondary">
            Password:{" "}
          </Text>
          <Text className="padding-right">
            {patientProfileObj.patientProfile.password}
          </Text>
          {isUpdatePassword === false && (
            <Button
              size="small"
              type="secondary"
              onClick={handleChangePasswordClick}
            >
              Update Password
            </Button>
          )}
          {isUpdatePassword === true && (
            <div style={{ paddingTop: "0.5em" }}>
              <Input
                type="text"
                placeholder="New Password"
                defaultValue={formObj.inputObj.password}
                // ref={newPasswordRef}
                onChange={(e) => {formObj.inputObj.password = e.target.value}}
                addonAfter={
                  <section>
                    <Button
                      size="small"
                      onClick={handleSavePasswordClick}
                      icon={<CheckOutlined />}
                    ></Button>
                    <Button
                      size="small"
                      onClick={handleCancelChangePasswordClick}
                      icon={<CloseOutlined />}
                    ></Button>
                  </section>
                }
              />
              <p style={{ color: "red" }}>{formObj.errObj.password}</p>
            </div>
          )}
        </div>
        <div className="padding-right padding-top-bottom">
          <Text strong type="secondary">
            Phone:{" "}
          </Text>
          <Text>{patientProfileObj.patientProfile.phone}</Text>
        </div>
        {/* </div> */}
        {/* <div style={{ display: "flex", width: "100%" }}> */}
        <div className="padding-right padding-top-bottom">
          <Text strong type="secondary">
            Diagnosis:{" "}
          </Text>
          <Text>{patientProfileObj.patientProfile.diagnosis}</Text>
        </div>
        {/* </div> */}
        {/* <div style={{ display: "flex", width: "100%" }}> */}
        <div className="padding-right padding-top-bottom">
          <Text strong type="secondary">
            Prescribed Medication:{" "}
          </Text>
          <Text>{patientProfileObj.patientProfile.prescribedMedication}</Text>
        </div>
        {/* </div> */}
        {/* <div style={{ display: "flex", width: "100%" }}> */}
        <div className="padding-right padding-top-bottom">
          <Text strong type="secondary">
            Address:{" "}
          </Text>
          <Text>{patientProfileObj.patientProfile.address}</Text>
        </div>
        {/* </div> */}
        {/* <div style={{ display: "flex", width: "100%" }}> */}
        <div className="padding-right padding-top-bottom">
          <Text strong type="secondary">
            City:{" "}
          </Text>
          <Text>{patientProfileObj.patientProfile.city}</Text>
        </div>
        <div className="padding-right padding-top-bottom">
          <Text strong type="secondary">
            State:{" "}
          </Text>
          <Text>{patientProfileObj.patientProfile.state}</Text>
        </div>
        <div className="padding-right padding-top-bottom">
          <Text strong type="secondary">
            Country:
          </Text>
          <Text>{patientProfileObj.patientProfile.country}</Text>
        </div>
        <div className="padding-right padding-top-bottom">
          <Text strong type="secondary">
            Pincode:{" "}
          </Text>
          <Text>{patientProfileObj.patientProfile.pincode}</Text>
        </div>
        {/* </div> */}
      </Card>
    </Card>
  );
}

export default PatientProfile;
