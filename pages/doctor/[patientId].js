import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PatientProfile from "../../components/doctor/patient-profile";
import { handleUnauthUser } from "../../lib/util";

function PatientProfilePage() {
    const router = useRouter();
    const userInfo = useSelector((state) => state.authInfo.userInfo);

    // let rStr = handleUnauthUser(userInfo, router)
    // if(rStr !== '') {
    //   // unauth user
    //   return rStr;
    // }

    const patientId = router.query.patientId;

    return <PatientProfile patientId={patientId}></PatientProfile>
}

export default PatientProfilePage;