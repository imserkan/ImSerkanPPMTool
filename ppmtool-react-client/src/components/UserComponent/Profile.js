import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Profile extends Component {
  constructor() {
    super();
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
  }
  render() {
    const user = this.props.user;
    return (
      <div className="container bg-white">
        <div className="row" align="center">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xs-offset-0 col-sm-offset-0 col-md-offset-3 col-lg-offset-3 toppad">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">{user.fullname}</h3>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3 col-lg-3 col-md-offset-3 col-lg-offset-3">
                      <img
                        alt="User Pic"
                        src="https://pbs.twimg.com/profile_images/912038361090715650/EXvapkJe_400x400.jpg"
                        className="img-circle img-responsive"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-9 col-lg-9">
                  <table className="table table-user-information">
                    <tbody>
                      <tr>
                        <td>Deparment:</td>
                        <td>{user.department}</td>
                      </tr>
                      <tr>
                        <td>Hire Date:</td>
                        <td>{user.hire_date}</td>
                      </tr>
                      <tr>
                        <td>Date Of Birth:</td>
                        <td>{user.birth_date}</td>
                      </tr>
                      <tr>
                        <td>Gender:</td>
                        <td>{user.gender}</td>
                      </tr>
                      <tr>
                        <td>Home Address:</td>
                        <td>{user.address}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>{user.username}</td>
                      </tr>
                      <tr>
                        <td>Phone Number:</td>
                        <td>{user.phoneNumber}</td>
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
                    className="btn btn-sm btn-danger"
                  >
                    Linked-In
                    <i className="glyphicon glyphicon-remove col-md-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.security.user,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getUser }
)(Profile);
