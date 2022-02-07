import { Router, useRouter } from "next/router";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePatient } from "../../store/slice";
import AddPatientForm from "./add-patient-form";
import UpdatePatientForm from "./update-patient-form";
import { List, Avatar, Button } from "antd";
import Link from "next/link";
import PatientSearch from "./patient-search";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

function PatientList() {
  const router = useRouter();
  const { filteredPatientList, isLoggedIn, userInfo } = useSelector((state) => {
    console.log(state);
    return state.authInfo;
  });

  const dispatch = useDispatch();

  // if(isLoggedIn === false) {
  //   router.replace('/');
  //   return;
  // }

  let [isAddPatient, setIsAddPatient] = useState(false);
  let [updateObj, setUpdatePatientObj] = useState({
    isUpdatePatient: false,
    patientProf: {},
  });

  function handleViewPatientClick(patientId) {
    router.push(`/doctor/${patientId}`);
  }

  function handleDeletePatientClick(patientId) {
    if (confirm("Are you sure?") === false) {
      return;
    }

    const url = "/api/doctor/patient-delete";

    const deleteReqDetailsObj = {
      patientOf: userInfo.id,
      patientId: patientId,
    };

    const reqObj = {
      method: "POST",
      body: JSON.stringify(deleteReqDetailsObj),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, reqObj)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // do something when success
        dispatch(deletePatient({ patientId: patientId }));
      })
      .catch((err) => {
        console.log("Delete patient req failed", err);
      });
  }

  function handleEditPatientClick(patientId) {
    for (let prof of filteredPatientList) {
      if (prof.patientId === patientId) {
        setUpdatePatientObj({
          isUpdatePatient: true,
          patientProf: prof,
        });
        break;
      }
    }
  }

  function handleAddPatientClick() {
    setIsAddPatient(true);
  }

  let renderedHtml = "";

  if (isAddPatient === true) {
    renderedHtml = (
      <AddPatientForm patientOf={userInfo.id} formExitFun={setIsAddPatient} />
    );
  }

  if (updateObj.isUpdatePatient === true) {
    renderedHtml = (
      <UpdatePatientForm
        formExitFun={setUpdatePatientObj}
        patientProfToUpdate={updateObj.patientProf}
      />
    );
  }

  renderedHtml === "" &&
    (renderedHtml = (
      <section>
        <PatientSearch style={{ width: "100%" }}></PatientSearch>
        <List
          style={{ padding: "0.5em" }}
          itemLayout="horizontal"
          dataSource={filteredPatientList}
          renderItem={(patient) => (
            <List.Item key={patient.patientId}>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={
                  <div>
                    <Link
                      href={`/doctor/${patient.patientId}`}
                      style={{ fontSize: "2em" }}
                    >
                      {(
                        patient.patientProfile.fullName.firstName +
                        " " +
                        (patient.patientProfile.fullName.lastName || "")
                      ).trim()}
                    </Link>
                    <Button
                      size="small"
                      style={{ marginLeft: "0.5em", marginRight:"0.5em"}}
                      onClick={() => {
                        handleEditPatientClick(patient.patientId);
                      }}
                      icon={<EditOutlined />}
                      shape="circle"
                      
                    ></Button>
                    <Button
                      style={{ marginLeft: "0.5em", marginRight:"0.5em"}}
                      size="small"
                      onClick={() => {
                        handleDeletePatientClick(patient.patientId);
                      }}
                      icon={<DeleteOutlined />}
                      shape="circle"
                    ></Button>
                  </div>
                }
                description={`City: ${patient.patientProfile.city}, Email: ${patient.patientProfile.email}`}
              />
            </List.Item>
          )}
        />
        <Button
          style={{ margin: "0.5em" }}
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={handleAddPatientClick}
        ></Button>
      </section>
    ));

  return renderedHtml;
}

export default PatientList;
