import fs from "fs";
import path from "path";

const patientProfilesFileName = "patient-profiles.json";
const usersFileName = "users.json";
let patientId = 6;

export function getExistingPatientsProfiles() {
  // console.log('filepath: ', path.join(getBaseDirPath(), patientProfilesFileName));
  const data = fs.readFileSync(
    path.join(getBaseDirPath(), patientProfilesFileName),
    {
      encoding: "utf8",
    }
  );

  return JSON.parse(data).patientProfiles;
}

export function getBaseDirPath() {
  return `${path.join(process.cwd(), "data")}`;
}

export function writeIntoPatientProfilesFile(data) {
  writeIntoFile(patientProfilesFileName, data);
}

export function writeIntoUsersFile(data) {
  writeIntoFile(usersFileName, data);
}

export function writeIntoFile(fileName, data) {
  const filePath = path.join(getBaseDirPath(), fileName);
  fs.writeFileSync(filePath, JSON.stringify(data));
}

export function getPatientId() {
  patientId = patientId + 1;
  return 'p' + patientId;
}

export function getExistingUsers() {
  const data = fs.readFileSync(path.join(getBaseDirPath(), usersFileName), {
    encoding: "utf8",
  });

  return JSON.parse(data).users;
}

