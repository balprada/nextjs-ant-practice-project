import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loadStateFromSessionStorage } from "../store/persistent-storage";
import { resetState } from "../store/slice";
import store from "../store/store";
import { Button} from "antd";

function Logout() {
  const isLoggedIn = useSelector((state) => {
    return state.authInfo.isLoggedIn;
  });
  const dispatch = useDispatch();

  const router = useRouter();

  async function handleLogoutClick() {
    // window.location.replace("http://localhost:3000/login");

    dispatch(resetState());
    console.log("Logout: state reset");
    console.log(store.getState());

    // DM: just a fix, to call router-guard useEffect
    router.reload();

    // loadStateFromSessionStorage();
    router.push("/login");
  }

  // return isLoggedIn === true ? (
  //   <div>
  //     <button onClick={handleLogoutClick}>Logout</button>
  //   </div>
  // ) : (
  //   <div></div>
  // );
  return (
    <Button type="primary" onClick={handleLogoutClick}>
      Logout
    </Button>
  );
}

export default Logout;
