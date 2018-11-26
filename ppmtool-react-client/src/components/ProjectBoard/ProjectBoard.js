import React, { Component } from "react";
import { Link } from "react-router-dom";
import Backlog from "./Backlog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getBacklog } from "../../actions/backlogActions";
import Loading from "../Layout/Loading";

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
        return <Loading />;
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
