import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";

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
