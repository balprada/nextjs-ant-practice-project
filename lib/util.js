export function setFNameLName(fullName) {
  // modify full name
  const fullNameArr = fullName.split(" ");
  const firstName = fullNameArr[0];
  fullNameArr.splice(0, 1);

  let lastName = "";

  if (fullNameArr.length > 0) {
    lastName = fullNameArr.join(" ");
  }

  return {
    firstName: firstName,
    lastName: lastName,
  };
}

// const basePath = "http://localhost";
const basePath = "/";
const doctorBasePath = "doctor";

const startingUrl = basePath + doctorBasePath;

export function handleUnauthUser(userInfo, router) {
  let currUrl = router.route;
  console.log(router);
  let rStr = "";
  if (currUrl.startsWith(startingUrl) === true) {
    if (userInfo.role === undefined) {
      // user not logged in, redirect to login-page
      router.replace("/login");
    } else if (userInfo.role !== "D") {
      // unauth user show unauth text
      return (
        <div>
          <p>You are not autorized to access this page</p>
          <div>{/* <button onClick={handleHomeClick}>Home</button> */}</div>
        </div>
      );
      // <Patient404 />
    }
  } else {
    router.replace("/login");
  }

  return rStr;
}
