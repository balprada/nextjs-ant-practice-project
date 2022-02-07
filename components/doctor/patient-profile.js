import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectPatientProfileByPid } from "../../store/slice";
import { Card, Typography, Button, Avatar } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import store from "../../store/store";

function PatientProfile(props) {
  const router = useRouter();
  const { Text } = Typography;

  let patientId = props.patientId || router.query;

  console.log(router);
  console.log(store.getState());

  let patientProfileObj = useSelector((state) =>
    selectPatientProfileByPid(state, patientId)
  );

  console.log(patientProfileObj);

  function handleBackClick() {
    router.back();
  }
  return (
    <Card
      title={
        <div>
          <Avatar src="https://joeschmoe.io/api/v1/random" style={{marginRight: "1em"}}/>
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
        extra={
          <Button
            type="secondary"
            shape="circle"
            size="small"
            icon={<ArrowLeftOutlined />}
            onClick={handleBackClick}
          ></Button>
        }
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
          <Text>{patientProfileObj.patientProfile.password}</Text>
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
