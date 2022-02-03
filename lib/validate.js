const err = {};

export function validateEmail(value) {
    err.email = '';
    const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (value === undefined || value === '' || pattern.test(value) === false) {
      err.email = "Please enter valid email address.";
    }
}
 
export function validatePassword(value) {
    err.password = '';
    const pattern = new RegExp(/[A-Za-z]{1,}/);

    if(value === undefined || value === '' || value.length < 8 || pattern.test(value) === false) {
        err.password = "Please enter valid Password [Min 8 length, 1 uppercase, 1 lowercase].";
    }
}

export function validateFullName(value) {
    // TODO: how to validate that fullName contains firstName and lastName
    err.fullName = '';
    if(value === undefined || value === '') {
        err.fullName = "Please enter valid Full Name, cannot be empty.";
    }
}

export function validatePhoneNo(value) {
    err.phone = '';
    const pattern = new RegExp(/[0-9]{10}/);

    if(value === undefined || pattern.test(value) === false) {
        err.phone = "Please enter valid Phone Number of 10 digits.";
    }
}

export function validateDiagnosis(value) {
    // TODO: how to validate, what it does mean by 'can be multiple'
    err.diagnosis = '';
    if(value === undefined || value === '') {
        err.diagnosis = "Please enter valid Diagnosis, cannot be empty.";
    }
}

export function validatePresMedicine(value) {
    // TODO: how to validate, what it does mean by 'can be multiple'
    err.prescribedMedication = '';
    if(value === undefined || value === '') {
        err.prescribedMedication = "Please enter valid Prescribed Medication, cannot be empty.";
    }
}

export function validatePincode(value) {
    err.pincode = '';
    const pattern = new RegExp(/[0-9]{6}/);

    if(value === undefined || pattern.test(value) === false) {
        err.pincode = "Please enter valid Pincode of 6 digits.";
    }
}

export function validatePatientProfile(profObj) {
    validateEmail(profObj.email);
    validatePassword(profObj.password);
    validateFullName(profObj.fullName);
    validatePhoneNo(profObj.phone);
    validateDiagnosis(profObj.diagnosis);
    validatePresMedicine(profObj.prescribedMedication);
    validatePincode(profObj.pincode);
}

export function getErrObj() {
    return err;
}

export function isValid() {
    for(let key of Object.keys(err)) {
        if (err[key] !== '') {
            return false;
        }
    }

    return true;
}


