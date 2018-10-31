package com.sislamoglu.ppmtool.services;

import com.sislamoglu.ppmtool.domain.Backlog;
import com.sislamoglu.ppmtool.domain.Project;
import com.sislamoglu.ppmtool.domain.ProjectTask;
import com.sislamoglu.ppmtool.repositories.BacklogRepository;
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

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){

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
    }

    public Iterable<ProjectTask> findBacklogById(String projectIdentifier){
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }
}
