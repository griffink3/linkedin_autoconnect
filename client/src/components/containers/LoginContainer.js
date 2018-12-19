import { connect } from 'react-redux'
import { updateName, updateEmail, updatePassword, updateBio, updateGender, updateGenderWanted } from '../../actions/LoginActions'
import LoginPage from '../pages/LoginPage';

const mapStateToProps = state => {
    return {       
    }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default LoginContainer