import {
    UPDATE_NAME,
    UPDATE_EMAIL,
    UPDATE_PASSWORD,
    UPDATE_BIO,
    UPDATE_GENDER,
    UPDATE_GENDERWANTED,
} from '../actions/LoginActions'

function register(state = [], action) {
    switch (action.type) {
        case UPDATE_NAME:
            return [
            ...state,
            {
                name: action.name,
            }
        ]
        case UPDATE_EMAIL:
            return [
                ...state,
                {
                    email: action.email,
                }
            ]
        case UPDATE_PASSWORD:
            return [
                ...state,
                {
                    password: action.password,
                }
            ]
        case UPDATE_BIO:
            return [
                ...state,
                {
                    bio: action.bio,
                }
            ]
        case UPDATE_GENDER:
            return [
                ...state,
                {
                    gender: action.gender,
                }
            ]
        case UPDATE_GENDERWANTED:
            return [
                ...state,
                {
                    genderWanted: action.genderWanted,
                }
            ]
        default:
            return state
    }
  }

  export default register
