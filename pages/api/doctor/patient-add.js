import {
  getExistingPatientsProfiles,
  getPatientId,
  writeIntoPatientProfilesFile,
  getExistingUsers,
  writeIntoUsersFile,
} from "../../../lib/backend-util";

function handler(req, res) {
  const { patientOf, patientProfile } = req.body;

  const existingPatientProfiles = getExistingPatientsProfiles();

  const newPatientId = getPatientId();

  // add patient into patient-profiles.json
  existingPatientProfiles.push({
    patientOf: patientOf,
    patientId: newPatientId,
    patientProfile: patientProfile,
  });

  // add patient into patients.json as well
  const existingUsers = getExistingUsers();
  existingUsers.push({
    id: newPatientId,
    emailId: patientProfile.email,
    password: patientProfile.password,
    role: "P"
  });

  writeIntoPatientProfilesFile({
    patientProfiles: existingPatientProfiles,
  });

  writeIntoUsersFile({
    users: existingUsers,
  });

  res.status(200).json({ "patientId": newPatientId, "message": "Patient Added Successfully" });
}

export default handler;
