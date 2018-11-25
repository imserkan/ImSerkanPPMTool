import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";

class ProjectBoard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
    this.ready = false;
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getBacklog(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    this.ready = true;
  }

  render() {
    const id = this.props.match.params.id;
    const project_tasks = this.props.backlog.project_tasks;
    const errors = this.props.errors;

    let boardContent;
    const boardAlgorithm = (errors, project_tasks) => {
      if (this.ready) {
        if (project_tasks.length < 1) {
          if (errors.projectNotFound) {
            return (
              <div className="alert alert-danger text-center" role="alert">
                {errors.projectNotFound}
              </div>
            );
          } else if (errors.projectIdentifier) {
            return (
              <div className="alert alert-danger text-center" role="alert">
                {errors.projectIdentifier}
              </div>
            );
          } else {
            return (
              <div className="alert alert-info text-center" role="alert">
                No Project Tasks on this board
              </div>
            );
          }
        } else {
          return <Backlog project_tasks={project_tasks} />;
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

    boardContent = boardAlgorithm(errors, project_tasks);

    return (
      <div className="container">
        <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
          <i className="fas fa-plus-circle"> Create Project Task</i>
        </Link>
        <br />
        <hr />
        {boardContent}
      </div>
    );
  }
}
ProjectBoard.propTypes = {
  backlog: PropTypes.object.isRequired,
  getBacklog: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  backlog: state.backlog,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBacklog }
)(ProjectBoard);
