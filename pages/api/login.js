import { getExistingPatientsProfiles, getExistingUsers } from "../../lib/backend-util";

async function handler(req, res) {
  // console.log(req);
  handleLoginNSendResponse(req, res);
}

function handleLoginNSendResponse(req, res) {
  const { userEmail, userPassword } = req.body;

  console.log(userEmail, userPassword);
  let isFound = false;
  for (let user of getExistingUsers()) {
    if (userEmail === user.emailId && userPassword === user.password) {
      isFound = true;
      // if (userEmail !== "" && userPassword !== "") {
      // return success response with all patients list
      if (user.role === "D") {
        handleForDoctorRole(user, res);
      } else if (user.role === "P") {
        handleForPatientRole(user, res);
      } else {
        res.status(401).json({ err: "Email or Password invalid" });
      }

      break;
    }
  }

  if(isFound === false) {
    res.status(401).json({ err: "Email or Password invalid" });
  }
}

function handleForDoctorRole(user, res) {
  const existigPatientProfiles = getExistingPatientsProfiles();

  let responsePatientsProfList = [];

  for (let prof of existigPatientProfiles) {
    if (prof.patientOf === user.id) {
      responsePatientsProfList.push(prof);
    }
  }

  res.status(200).json(
    JSON.stringify({
      patientList: responsePatientsProfList,
      userInfo: { id: user.id, role: user.role },
    })
  );
}

function handleForPatientRole(user, res) {
  console.log('Found');
  const existigPatientProfiles = getExistingPatientsProfiles();

  let isFound = false;
  for (let prof of existigPatientProfiles) {
    if (prof.patientId === user.id) {
      console.log('Found');
      isFound = true;
      res.status(200).json(
        JSON.stringify({
          patientProfile: prof,
          userInfo: { id: user.id, role: user.role },
        })
      );
      break;
    }
  }

  if(isFound === false) {
    res.status(401).json(
      JSON.stringify({
        "message": "Invalid Email or Password"
      })
    );
  }

}

export default handler;
