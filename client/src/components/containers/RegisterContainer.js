import { connect } from 'react-redux'
import { updateName, updateEmail, updatePassword, updateBio, updateGender, updateGenderWanted } from '../../actions/LoginActions'
import RegisterPage from '../pages/RegisterPage';

const mapStateToProps = state => {
    return {       
    }
}

const mapDispatchToProps = dispatch => {
  return {
    updateName: name => {
        dispatch(updateName(name))
    },
    updateEmail: email => {
        dispatch(updateEmail(email))
    },
    updatePassword: password => {
        dispatch(updatePassword(password))
    },
    updateBio: bio => {
        dispatch(updateBio(bio))
    },
    updateGender: gender => {
        dispatch(updateGender(gender))
    },
    updateGenderWanted: genderWanted => {
        dispatch(updateGenderWanted(genderWanted))
    },
  }
}

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage)

export default RegisterContainer