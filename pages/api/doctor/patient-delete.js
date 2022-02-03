import {
  getExistingPatientsProfiles,
  writeIntoPatientProfilesFile,
  getExistingUsers,
  writeIntoUsersFile
} from "../../../lib/backend-util";

function handler(req, res) {
  const { patientOf, patientId } = req.body;

  const existingPatientProfiles = getExistingPatientsProfiles();

//   console.log(existingPatientProfiles);

  for (let i = 0; i < existingPatientProfiles.length; i++) {
    let profile = existingPatientProfiles[i];
    // console.log(profile.patientId, patientId, typeof(profile.patientId), typeof(patientId));
    if (profile.patientId === patientId) {

      existingPatientProfiles.splice(i, 1);
      console.log('deleted patient from existingPatientProfiles');

      break;
    }
  }

  const existingUsers = getExistingUsers();

  for (let i = 0; i < existingUsers.length; i++) {
    let patient = existingUsers[i];
    // console.log(patient.id, patientId, typeof(patient.id), typeof(patientId));
    if (patient.id === patientId) {
      existingUsers.splice(i, 1);
      console.log('deleted patient from existingPatients');

      break;
    }
  }

  // wirte-back into file
  writeIntoPatientProfilesFile({
    patientProfiles: existingPatientProfiles,
  });

  writeIntoUsersFile({
    users: existingUsers,
  });

  res.status(200).json({"message": "Delete Patient Successfully"});
}

export default handler;
