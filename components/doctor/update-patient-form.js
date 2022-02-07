import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePatient } from "../../store/slice";
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
  validationRulesMap,
  isValidAntDForm,
} from "../../lib/validate";
import { Input, Form, Button } from "antd";

function UpdatePatientForm(props) {
  const { patientOf, patientId, patientProfile } = props.patientProfToUpdate;

  const [form] = Form.useForm();

  const formValidationRules = validationRulesMap();

  const dispatch = useDispatch();

  function handleSaveClick() {
    console.log(form.getFieldsError());
    if(isValidAntDForm(form.getFieldsError()) === false) {
      console.log('Having errors');
      console.log(form.getFieldsError());
      return;
    }
    const url = "/api/doctor/patient-update";

    const inputValues = form.getFieldsValue(true);
    const profileInfo = {
      ...inputValues,
      // break fullName into firstName and lastName
      fullName: setFNameLName(inputValues.fullName),
    };

    const patientProfReqObj = {
      patientOf: patientOf,
      patientId: patientId,
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
        // patientProfReqObj.patientId = data.patientId;

        dispatch(updatePatient({ patientProfile: patientProfReqObj }));

        // router.replace("/patient-list");
        props.formExitFun({
          isUpdatePatient: false,
          patientProf: {},
        });
      })
      .catch((err) => {
        console.log("Update Patient Profile Failed: ", err);
      });
  }

  function handleCancelClick() {
    // router.replace("/patient-list");
    props.formExitFun({
      isUpdatePatient: false,
      patientProf: {},
    });
  }

  return (
    <section>
      <h1>Patient Profile Form</h1>
      <Form
        initialValues={{
          ...patientProfile,
          fullName:
            patientProfile.fullName.firstName +
            " " +
            (patientProfile.fullName.lastName || ""),
        }}
        name="Update User Form"
        form={form}
      >
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

export default UpdatePatientForm;
