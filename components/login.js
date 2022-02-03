import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loadStateFromSessionStorage } from "../store/persistent-storage";
import {
  setPatients,
  setUserInfo,
  setPatientProfile,
  setStateInSession,
} from "../store/slice";
import store from "../store/store";
import { Form, Input, Button, Checkbox } from "antd";

function Login() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const [loginError, setLoginError] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    console.log("Login: useEffect called");

    loadStateFromSessionStorage();

    let authInfo = store.getState().authInfo;

    if (authInfo.isLoggedIn === true) {
      console.log("Login: Already logged in");
      // return <p>Already logged in</p>
      if (authInfo.userInfo.role === "D") {
        router.push("/doctor/patient-list");
      } else if (authInfo.userInfo.role === "P") {
        router.push("/patient/profile");
      }
    } else {
      console.log("Login: Need to login");
    }
  }, []);
  // loadStateFromSessionStorage();

  function handleLoginClick(event) {
    event.preventDefault();

    console.log(form);
    let email = form.getFieldValue('username');
    let password = form.getFieldValue('password');
    // let password = passwordRef.current.value;

    // if(form.getFieldsError('username') !== '') {
    //   console.log('Invalid Field');
    // }
    // form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
    //   } else {
    //     console.log('Invalid Field');
    //   }
    // });
    if(!email || !password) {
      return;
    }

    console.log(email, password);

    let loginDetails = {
      userEmail: email,
      userPassword: password,
    };

    let reqObj = {
      method: "POST",
      body: JSON.stringify(loginDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("/api/login", reqObj)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.err !== undefined) {
          setLoginError(data.err);
          // throw new Error(data.err);
        } else {
          setLoginError("");
          handleLoginSuccess(data);
        }
      })
      .catch((err) => {
        console.log("Login Unsuccessful: ", err);
        setLoginError(
          "Login Unsuccessful: Either username or password is invalid"
        );
      });
  }

  function handleLoginSuccess(data) {
    if (data.userInfo.role === "D") {
      dispatch(setPatients({ patientList: data.patientList }));
      dispatch(setUserInfo({ userInfo: data.userInfo }));
      dispatch(setStateInSession());
      router.replace("/doctor/patient-list");
    } else if (data.userInfo.role === "P") {
      dispatch(setPatientProfile({ patientProfile: data.patientProfile }));
      dispatch(setUserInfo({ userInfo: data.userInfo }));
      dispatch(setStateInSession());
      router.replace("/patient/profile");
    }
  }

  function handleLoginFailure() {}

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form
          form={form}
          name="Login"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input type="text" ref={emailRef} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password ref={passwordRef} />
          </Form.Item>

          {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}
          <div>
            <p style={{ color: "red", fontSize: "100%", textAlign: "center" }}>{loginError}</p>
          </div>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleLoginClick}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
