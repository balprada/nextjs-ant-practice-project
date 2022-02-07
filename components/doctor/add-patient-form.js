import { useDispatch } from "react-redux";
import { setFNameLName } from "../../lib/util";
import {isValidAntDForm, validationRulesMap,
} from "../../lib/validate";
import { addPatient } from "../../store/slice";
import { Input, Form, Button } from "antd";

function AddPatientForm(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  let inputObj = {
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
  };

  const formValidationRules = validationRulesMap();

  function handleSaveClick() {
    // console.log("form");
    // console.log(form.getFieldsValue(true));
    if(isValidAntDForm(form.getFieldsError()) === false) {
      console.log('Having errors');
      console.log(form.getFieldsError());
      return;
    }
    const url = "/api/doctor/patient-add";
    const inputValues = form.getFieldsValue(true);
    const profileInfo = {
      ...inputValues,
      // break fullName into firstName and lastName
      fullName: setFNameLName(inputValues.fullName)
    };

    // No need to do validation, automatically done by Ant Design Form
    // validatePatientProfile(profileInfo);

    // if (isValid() === false) {
    //   return;
    // }

    
    // profileInfo.fullName = setFNameLName(profileInfo.fullName);

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

  return (
    <section>
      <h1>Patient Profile Form</h1>
      <Form initialValues={inputObj} name="Add User Form" form={form}>
        <Form.Item label="Email" name="email" rules={formValidationRules.email}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={formValidationRules.password}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={formValidationRules.fullName}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone No"
          name="phone"
          rules={formValidationRules.phone}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Diagnosis"
          name="diagnosis"
          rules={formValidationRules.diagnosis}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Prescribed Medication"
          name="prescribedMedication"
          rules={formValidationRules.prescribedMedication}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input />
        </Form.Item>
        <Form.Item label="State" name="state">
          <Input />
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Input />
        </Form.Item>
        <Form.Item
          label="Pincode"
          name="pincode"
          rules={formValidationRules.pincode}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleSaveClick}>
            Submit
          </Button>
          <Button type="primary" onClick={handleCancelClick}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default AddPatientForm;
