import { connect } from 'react-redux'
import ProfilePage from '../pages/ProfilePage';

const mapStateToProps = state => {
  return {
    // name: state.login[0] ? state.login[0].name: "",
    // email: state.login[1] ? state.login[1].email : "",
    // password: state.login[2] ? state.login[2].password : "",
    // bio: state.login[3] ? state.login[3].bio : "",
    // gender: state.login[4] ? state.login[4].gender : "",
    // genderWanted: state.login[5] ? state.login[5].genderWanted : "",
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage)

export default ProfileContainer