import { getExistingPatientsProfiles, getExistingUsers, writeIntoPatientProfilesFile, writeIntoUsersFile } from "../../lib/backend-util";

function handler(req, res) {
    const {patientOf, patientId, newPassword} = req.body;

    const existingPatientProfiles = getExistingPatientsProfiles();

    for(let i = 0; i < existingPatientProfiles.length; i++) {
        const prof = existingPatientProfiles[i];

        if(prof.patientId === patientId) {
            prof.patientProfile.password = newPassword;
            break; 
        }
    }

    const existingUsers = getExistingUsers();
    for(let i = 0; i < existingUsers.length; i++) {
        const user = existingUsers[i];

        if(user.id === patientId) {
            user.password = newPassword;
            break; 
        }
    }

    writeIntoPatientProfilesFile({patientProfiles: existingPatientProfiles});
    writeIntoUsersFile({users: existingUsers});

    res.status(200).json({"patientId": patientId, "message": "Password Updated Successfully"});
}

export default handler