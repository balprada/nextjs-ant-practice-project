import { useSelector } from "react-redux";
import Patient404 from "./patient/404";
import Doctor404 from "./doctor/404";
function Page404() {
  const userInfo = useSelector((state) => {
      console.log('Page404: ');
      console.log(state);
      state.authInfo.userInfo
    });

  console.log(userInfo);

  if (userInfo !== undefined && userInfo !== {}) {
    if (userInfo.role === "P") {
      return <Patient404 />;
    } else if (userInfo.role === "D") {
      return <Doctor404 />;
    }
  }

  return <div>Custom 404 page</div>;
}

export default Page404;
