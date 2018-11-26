import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";
import Loading from "./Layout/Loading";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
    this.ready = false;
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getProjects(id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    this.ready = true;
  }

  render() {
    const projects = this.props.project.projects;
    let boardContent;
    const boardAlgorithm = () => {
      if (this.ready) {
        return (
          <div className="projects">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="display-4 text-center text-white">Projects</h1>
                  <br />
                  <CreateProjectButton />
                  <br />
                  <hr />
                  {projects.map(project => (
                    <ProjectItem key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return <Loading />;
      }
    };
    boardContent = boardAlgorithm();
    return <div className="container"> {boardContent}</div>;
  }
}
Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProjects }
)(Dashboard);
