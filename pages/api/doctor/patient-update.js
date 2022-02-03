import {
  getExistingPatientsProfiles,
  writeIntoPatientProfilesFile,
  getExistingUsers,
  writeIntoUsersFile,
} from "../../../lib/backend-util";

function handler(req, res) {
  const { patientOf, patientId, patientProfile } = req.body;

  const existingPatientProfiles = getExistingPatientsProfiles();

  // const newPatientId = getPatientId();

  // add patient into patient-profiles.json
  const newPatientProfObj = {
    patientOf: patientOf,
    patientId: patientId,
    patientProfile: patientProfile,
  };

  for (let i = 0; i < existingPatientProfiles.length; i++) {
    const pObj = existingPatientProfiles[i];
    if (pObj.patientId === patientId) {
      existingPatientProfiles[i] = newPatientProfObj;
      break;
    }
  }

  // add patient into patients.json as well
  const existingUsers = getExistingUsers();

  const newPatientObj = {
    id: patientId,
    emailId: patientProfile.email,
    password: patientProfile.password,
  };

  for (let i = 0; i < existingUsers.length; i++) {
    const pObj = existingUsers[i];
    if (pObj.patientId === patientId) {
      existingUsers[i] = newPatientObj;
      break;
    }
  }

  writeIntoPatientProfilesFile({
    patientProfiles: existingPatientProfiles,
  });

  writeIntoUsersFile({
    users: existingUsers,
  });

  res
    .status(200)
    .json({ patientId: patientId, message: "Patient Updated Successfully" });
}

export default handler;
