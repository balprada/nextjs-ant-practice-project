import PatientProfile from "../../components/patient/patient-profile";
import {loadStateFromSessionStorage} from '../../store/persistent-storage';

function PatientProfilePage() {
    console.log('PatientProfilePage getting loaded');
    return <PatientProfile ></PatientProfile>
}

export default PatientProfilePage;