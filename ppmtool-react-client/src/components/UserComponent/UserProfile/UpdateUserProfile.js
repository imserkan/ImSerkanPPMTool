import React, { Component } from "react";
import { getUser, updateUser } from "../../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loading from "../../Layout/Loading";

class UpdateUserProfile extends Component {
  constructor() {
    super();
    this.ready = false;
    this.state = {
      id: "",
      username: "",
      fullname: "",
      password: "",
      department: "",
      hire_date: "",
      birth_date: "",
      gender: "",
      address: "",
      phoneNumber: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const {
      id,
      username,
      fullname,
      password,
      department,
      hire_date,
      birth_date,
      gender,
      address,
      phoneNumber
    } = nextProps.profileUser;
    this.setState({
      id,
      username,
      fullname,
      password,
      department,
      hire_date,
      birth_date,
      gender,
      address,
      phoneNumber
    });
    this.ready = true;
  }
  componentDidMount() {
    const username = this.props.match.params.username;
    this.props.getUser(username);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const username = this.props.match.params.username;
    const updateProfile = {
      id: this.state.id,
      username: this.state.username,
      fullname: this.state.fullname,
      password: this.state.password,
      department: this.state.department,
      hire_date: this.state.hire_date,
      birth_date: this.state.birth_date,
      gender: this.state.gender,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber
    };
    this.props.updateUser(updateProfile, username, this.props.history);
  }

  render() {
    console.log(this.props.profileUser);
    console.log(this.props.user);
    const BoardAlgorithm = () => {
      if (this.ready) {
        return (
          <div>
            <div className="project">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 m-auto">
                    <h5 className="display-4 text-center text-white">
                      Update Profile Information
                    </h5>
                    <hr />
                    <form onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Username"
                          name="username"
                          value={this.state.username}
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Full-Name"
                          name="fullname"
                          value={this.state.fullname}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          className="form-control form-control-lg"
                          placeholder="Department"
                          name="department"
                          value={this.state.department}
                          onChange={this.onChange}
                        />
                      </div>
                      <h6 className="text-white" align="right">
                        Hire Date:
                      </h6>
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          name="hire_date"
                          value={this.state.hire_date}
                          onChange={this.onChange}
                        />
                      </div>
                      <h6 className="text-white" align="right">
                        Birth Date:
                      </h6>
                      <div className="form-group">
                        <input
                          type="date"
                          className="form-control form-control-lg"
                          name="birth_date"
                          value={this.state.birth_date}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <select
                          className="form-control form-control-lg"
                          name="gender"
                          value={this.state.gender}
                          onChange={this.onChange}
                        >
                          <option value={0}>Select gender</option>
                          <option value={"Male"}>Male</option>
                          <option value={"Female"}>Female</option>
                          <option value={"Other"}>Other</option>
                        </select>
                      </div>
                      <h6 className="text-white" align="right">
                        Address:
                      </h6>
                      <div className="form-group">
                        <textarea
                          type="textarea"
                          className="form-control form-control-lg"
                          name="address"
                          value={this.state.address}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group">
                        <h6 className="text-white" align="right">
                          Phone Number:
                        </h6>
                        <input
                          type="number"
                          className="form-control form-control-lg"
                          name="phoneNumber"
                          value={this.state.phoneNumber}
                          onChange={this.onChange}
                        />
                      </div>
                      <h6 className="text-white" align="left">
                        New Password
                      </h6>
                      <div className="row">
                        <input
                          type="password"
                          className="form-control form-control-lg col-md-6"
                          placeholder="Password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                        />
                        <input
                          type="submit"
                          className="btn btn-primary btn-block col-md-6"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return <Loading />;
      }
    };
    let boardContent = BoardAlgorithm();
    return <div className="container">{boardContent}</div>;
  }
}
UpdateUserProfile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profileUser: state.profile.profileUser,
  user: state.security.user,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getUser, updateUser }
)(UpdateUserProfile);
