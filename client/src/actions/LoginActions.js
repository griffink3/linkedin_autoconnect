export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_BIO = 'UPDATE_BIO';
export const UPDATE_GENDER = 'UPDATE_GENDER';
export const UPDATE_GENDERWANTED = 'UPDATE_GENDERWANTED';

/*
 * action creators
 */

export function updateName(name) {
  return { type: UPDATE_NAME, name }
}

export function updateEmail(email) {
  return { type: UPDATE_EMAIL, email }
}

export function updatePassword(password) {
  return { type: UPDATE_PASSWORD, password }
}

export function updateBio(bio) {
    return { type: UPDATE_BIO, bio }
}

export function updateGender(gender) {
  return { type: UPDATE_GENDER, gender }
}

export function updateGenderWanted(genderWanted) {
    return { type: UPDATE_GENDERWANTED, genderWanted }
}
  