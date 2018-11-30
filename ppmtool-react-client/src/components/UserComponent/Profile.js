import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Profile extends Component {
  constructor() {
    super();
    this.ready = false;
    this.state = {
      errors: {}
    };
  }
  componentDidMount() {
    const username = this.props.match.params.username;
    this.props.getUser(username);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    this.ready = true;
  }

  render() {
    const user = this.props.user;
    const profileUser = this.props.profileUser;
    const errors = this.props.errors;
    let editContent;
    let genderContent;
    const genderProfileImage = gender => {
      console.log(gender);
      if (gender === "Female") {
        return (
          <img
            alt="User Pic"
            src="https://img.icons8.com/ios/1600/user-female-circle-filled.png"
            className="img-circle img-responsive"
          />
        );
      } else {
        return (
          <img
            alt="User Pic"
            src="https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-fill-circle-512.png"
            className="img-circle img-responsive"
          />
        );
      }
    };
    const editButton = (user, profileUser) => {
      if (user.username === profileUser.username) {
        return (
          <div className="btn btn-info col-md-2 offset-md-9">
            <Link to={`./${user.username}/edit`} className="text-white">
              Edit Profile Info
            </Link>
          </div>
        );
      }
    };
    editContent = editButton(user, profileUser);
    genderContent = genderProfileImage(profileUser.gender);
    const boardAlgorithm = errors => {
      if (this.ready) {
        if (errors.userNotFound !== undefined) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.userNotFound}
            </div>
          );
        } else {
          return (
            <div className="container bg-white">
              <div className="row" align="center">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad">
                  <div className="panel panel-info">
                    <div className="panel-heading ">
                      <div className="row">
                        <h3 className="panel-title col-md-4 offset-md-4">
                          {profileUser.fullname}
                        </h3>
                      </div>
                    </div>
                    <div className="panel-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-3 col-lg-3 col-md-offset-3 col-lg-offset-3">
                            {genderContent}
                          </div>
                        </div>
                      </div>

                      {editContent}
                      <div className="col-md-9 col-lg-9">
                        <table className="table table-user-information">
                          <tbody>
                            <tr>
                              <td>Deparment:</td>
                              <td>{profileUser.department}</td>
                            </tr>
                            <tr>
                              <td>Hire Date:</td>
                              <td>{profileUser.hire_date}</td>
                            </tr>
                            <tr>
                              <td>Date Of Birth:</td>
                              <td>{profileUser.birth_date}</td>
                            </tr>
                            <tr>
                              <td>Gender:</td>
                              <td>{profileUser.gender}</td>
                            </tr>
                            <tr>
                              <td>Home Address:</td>
                              <td>{profileUser.address}</td>
                            </tr>
                            <tr>
                              <td>Email:</td>
                              <td>{profileUser.username}</td>
                            </tr>
                            <tr>
                              <td>Phone Number:</td>
                              <td>{profileUser.phoneNumber}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="panel-footer">
                      <div className="col-md-12 col-lg-12">
                        <a
                          href="https://github.com/imserkan"
                          data-original-title="Broadcast Message"
                          data-toggle="tooltip"
                          type="button"
                          className="btn btn-sm btn-primary col-md-1 col-lg-1"
                        >
                          GitHub
                          <i className="glyphicon glyphicon-envelope" />
                        </a>
                        <a
                          href="https://twitter.com/IslamogluSerkan"
                          data-original-title="Edit this user"
                          data-toggle="tooltip"
                          type="button"
                          className="btn btn-sm btn-warning col-md-1 col-md-offset-10 "
                        >
                          Twitter
                          <i className="glyphicon glyphicon-edit" />
                        </a>
                        <a
                          href="https://linkedin.com/in/serkan-islamoglu-41a158169/"
                          data-original-title="Remove this user"
                          data-toggle="tooltip"
                          type="button"
                          className="btn btn-sm btn-danger col-md-1 col-md-offset-11"
                        >
                          Linked-In
                          <i className="glyphicon glyphicon-remove" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      } else {
        return (
          <div className="loader loader--style4 col-md-12" title="3">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
            >
              <rect x="0" y="0" width="4" height="7" fill="#333">
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="scale"
                  values="1,1; 1,3; 1,1"
                  begin="0s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </rect>

              <rect x="10" y="0" width="4" height="7" fill="#333">
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="scale"
                  values="1,1; 1,3; 1,1"
                  begin="0.2s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="20" y="0" width="4" height="7" fill="#333">
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="scale"
                  values="1,1; 1,3; 1,1"
                  begin="0.4s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>
          </div>
        );
      }
    };

    let boardContent;
    boardContent = boardAlgorithm(errors);
    return <div className="container">{boardContent}</div>;
  }
}

Profile.propTypes = {
  profileUser: PropTypes.object.isRequired,
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
  { getUser }
)(Profile);
