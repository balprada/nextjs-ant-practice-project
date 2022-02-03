import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectPatientProfileByPid } from "../../store/slice";

function PatientProfile(props) {
  const router = useRouter();

  let patientId = props.patientId;

  let patientProfileObj = useSelector((state) =>
    selectPatientProfileByPid(state, patientId)
  );

  // console.log(patientProfileObj);

  function handleBackClick() {
    router.back();
  }
  return (
    <div>
      <h1>
        {(
          patientProfileObj.patientProfile.fullName.firstName +
          " " +
          (patientProfileObj.patientProfile.fullName.lastName || "")
        ).trim()}
      </h1>
      <p>Email Id: {patientProfileObj.patientProfile.emailId}</p>
      <p>Password: {patientProfileObj.patientProfile.password}</p>
      <p>Phone: {patientProfileObj.patientProfile.phone}</p>
      <p>Diagnosis: {patientProfileObj.patientProfile.diagnosis}</p>
      <p>
        Prescribed Medication:{" "}
        {patientProfileObj.patientProfile.prescribedMedication}
      </p>
      <p>Address: {patientProfileObj.patientProfile.address}</p>
      <p>City: {patientProfileObj.patientProfile.city}</p>
      <p>State: {patientProfileObj.patientProfile.state}</p>
      <p>Country: {patientProfileObj.patientProfile.country}</p>
      <p>Pincode: {patientProfileObj.patientProfile.pincode}</p>
      <div>
        <button onClick={handleBackClick}>Back</button>
      </div>
      {/* <h1>This is Profile</h1> */}
    </div>
  );
}

export default PatientProfile;
