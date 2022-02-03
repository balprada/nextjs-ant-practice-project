import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store/store";
import Logout from "../components/logout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { RouteGuard } from "../components/route-guard";
import LayoutWrapper from "../components/layout/layout";
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // useEffect(() => {
  //   console.log("window.performance");
  //   console.log(window.performance);
  //   // if (window.performance.navigation.type === 1) {
  //   //   loadStateFromSessionStorage();
  //   // }
  //   const handleRouteChange = (url, { shallow }) => {
  //     console.log("handleRouteChange called", url);

  //     const { role } = store.getState().authInfo.userInfo;
  //     if (role !== "D" && url.includes("doctor") === true) {
  //       // redirect to unaut component
  //       router.push("/unauth");
  //       // router.push('/404');
  //     }
  //   };

  //   router.events.on("routeChangeStart", handleRouteChange);

  //   // router.events.on("beforeHistoryChange", () => {
  //   //   console.log("beforeHistoryChange called");
  //   // });

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChange);
  //   };
  // }, []);

  return (
    <Provider store={store} style={{height: "100%", width: "100%"}}>
      <LayoutWrapper style={{height: "100%", width: "100%"}}>
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
      </LayoutWrapper>
    </Provider>
  );
}

export default MyApp;
