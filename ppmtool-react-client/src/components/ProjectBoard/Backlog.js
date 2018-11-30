import React, { Component } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
  render() {
    const project_task_prop = this.props.project_tasks;
    const tasks = project_task_prop.map(project_task => (
      <ProjectTask key={project_task.id} project_task={project_task} />
    ));
    let toDoItems = [];
    let inProgressItems = [];
    let doneItems = [];
    let incompleteItems = [];

    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].props.project_task.status === "TO_DO") {
        toDoItems.push(tasks[i]);
      } else if (tasks[i].props.project_task.status === "IN_PROGRESS") {
        inProgressItems.push(tasks[i]);
      } else if (tasks[i].props.project_task.status === "DONE") {
        doneItems.push(tasks[i]);
      } else if (tasks[i].props.project_task.status === "INCOMPLETE") {
        incompleteItems.push(tasks[i]);
      }
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="card text-center mb-2">
              <div className="card-header bg-warning text-white">
                <h3>To-Do</h3>
              </div>
            </div>
            {toDoItems}
          </div>

          <div className="col-md-3">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In-Progress</h3>
              </div>
            </div>
            {inProgressItems}
          </div>
          <div className="col-md-3">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Complete</h3>
              </div>
            </div>
            {doneItems}
          </div>
          <div className="col-md-3">
            <div className="card text-center mb-2">
              <div className="card-header bg-danger text-white">
                <h3>In-Complete</h3>
              </div>
            </div>
            {incompleteItems}
          </div>
        </div>
      </div>
    );
  }
}
export default Backlog;
