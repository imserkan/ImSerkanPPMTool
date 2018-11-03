package com.sislamoglu.ppmtool.services;

import com.sislamoglu.ppmtool.domain.Backlog;
import com.sislamoglu.ppmtool.domain.Project;
import com.sislamoglu.ppmtool.domain.ProjectTask;
import com.sislamoglu.ppmtool.exceptions.ProjectIDException;
import com.sislamoglu.ppmtool.exceptions.ProjectNotFoundException;
import com.sislamoglu.ppmtool.repositories.BacklogRepository;
import com.sislamoglu.ppmtool.repositories.ProjectRepository;
import com.sislamoglu.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    ProjectRepository projectRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){
        try{
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
            projectTask.setBacklog(backlog);
            Integer backlogSequence = backlog.getPTSequence();
            backlogSequence++;
            backlog.setPTSequence(backlogSequence);
            projectTask.setProjectSequence(projectIdentifier+"-"+backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            if(projectTask.getPriority() == null || projectTask.getPriority() == 0){
                projectTask.setPriority(3);
            }
            if(projectTask.getStatus() == null || projectTask.getStatus().equals("")){
                projectTask.setStatus("TO-DO");
            }
            return projectTaskRepository.save(projectTask);
        }catch (Exception ex){
            throw new ProjectNotFoundException("Project not found");
        }
    }

    public Iterable<ProjectTask> findBacklogById(String projectIdentifier){
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier);
        if(project==null){
            throw new ProjectNotFoundException("Project with id: '" + projectIdentifier + "' does not exists.");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }

    public ProjectTask findPTByProjectSequence(String backlogId, String sequence){
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlogId);
        if(backlog==null){
            throw new ProjectNotFoundException("Project with id: '" + backlogId + "' does not exists.");
        }
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence);
        if(projectTask==null){
            throw new ProjectNotFoundException("Project Task '" + sequence + "' not found.");
        }

        if(!projectTask.getProjectIdentifier().equals(backlogId)){
            throw new ProjectNotFoundException("Project Task '" + sequence +
                    "' does not exists in the project: '" + backlogId + "'");
        }
        return projectTaskRepository.findByProjectSequence(sequence);
    }

    public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlogId, String sequence){
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlogId);
        if(backlog == null){
            throw new ProjectNotFoundException("Project with id: '" + backlogId + "' does not exists.");
        }
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence);
        if (projectTask == null){
            throw new ProjectNotFoundException("Project Task '" + sequence + "' not found.");
        }
        if(!projectTask.getProjectIdentifier().equals(backlogId)){
            throw new ProjectNotFoundException("Project Task '" + sequence +
                    "' does not exists in the project: '" + backlogId + "'");
        }
        projectTask = updatedTask;
        return projectTaskRepository.save(projectTask);
    }

    public void deleteByProjectSequence(String backlogId, String sequence){
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlogId);
        if(backlog == null){
            throw new ProjectNotFoundException("Project with id: '" + backlogId + "' does not exists.");
        }
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence);
        if (projectTask == null){
            throw new ProjectNotFoundException("Project Task '" + sequence + "' not found.");
        }
        if(!projectTask.getProjectIdentifier().equals(backlogId)){
            throw new ProjectNotFoundException("Project Task '" + sequence +
                    "' does not exists in the project: '" + backlogId + "'");
        }
        projectTaskRepository.delete(projectTask);
    }
}
