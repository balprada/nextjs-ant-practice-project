import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PatientList from "../../components/doctor/patient-list";
import PatientSearch from "../../components/doctor/patient-search";
import store from '../../store/store';
import {handleUnauthUser} from '../../lib/util';


function PatientListPage() {

  console.log('PatientListPage: loaded: state');
  console.log(store.getState());

  const userInfo = useSelector((state) => state.authInfo.userInfo);
  const router = useRouter(); 

  // let rStr = handleUnauthUser(userInfo, router);
  //   if(rStr !== '') {
  //   // unauth user
  //   return rStr;
  // }

  function handleHomeClick() {
    router.push('/patient/profile');
  }

  return (
    <div>
      <PatientList />;
    </div>
  );
}

export default PatientListPage;
