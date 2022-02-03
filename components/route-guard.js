import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import store from "../store/store";
import { loadStateFromSessionStorage } from "../store/persistent-storage";

// import { userService } from "services";

export { RouteGuard };

function RouteGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    console.log("Route Guard:useEffect");
    loadStateFromSessionStorage();
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/login"];
    const path = url.split("?")[0];
    let authInfo = store.getState().authInfo;

    console.log('path');
    console.log(path);

    if (authInfo.isLoggedIn === false && !publicPaths.includes(path)) {
      console.log("Route Guard: Need to login");
      console.log(router);
      setAuthorized(false);
      router.push({
        pathname: "/login",
        // query: { returnUrl: router.asPath }
      });
    } else {
      if (authInfo.userInfo.role === "D") {
        // router.push('/doctor/patient-list');
        if (path.startsWith("/patient")) {
          alert("you are trying to see patient page. Please login as patient");
          // alert and redirect to patient login
        } else if (path.startsWith("/doctor")) {
          setAuthorized(true);
        } else {
          // doctor 404 page
          if(path.startsWith("/login")) {
            router.push('/doctor/patient-list');
          } else {
            router.push('/doctor/404');
          }
         
        }
      } else if (authInfo.userInfo.role === "P") {
        // router.push('/patient/profile');
        if (path.startsWith("/doctor")) {
          alert(
            "you are trying to visit a page you are not autherized to. Please login as a doctor to view this page."
          );
        } else if (path.startsWith("/patient")) {
          setAuthorized(true);
        }else {
            // patient 404 page
            
            if(path.startsWith("/login")) {
                router.push('/patient/profile');
              } else {
                router.push('/patient/404');
              }
        }
      }
      // DM
      else {
        //   console.log('Exception');
        setAuthorized(true);
      }
    }
  }

  return authorized && children;
}
