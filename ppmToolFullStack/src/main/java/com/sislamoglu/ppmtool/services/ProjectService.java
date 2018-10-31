package com.sislamoglu.ppmtool.services;

import com.sislamoglu.ppmtool.domain.Backlog;
import com.sislamoglu.ppmtool.domain.Project;
import com.sislamoglu.ppmtool.exceptions.ProjectIDException;
import com.sislamoglu.ppmtool.repositories.BacklogRepository;
import com.sislamoglu.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project){
        try{
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            // Create Part
            if(project.getId() == null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }
            // Update Part
            else{
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }
            return projectRepository.save(project);
        }catch (Exception ex){
            throw new ProjectIDException("Project ID '" +
                    project.getProjectIdentifier() + "' already exists.");
        }

    }

    public Project findProjectByIdentifier(String projectId){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project==null){
            throw new ProjectIDException("Project ID '" + projectId + "' does not exist.");
        }
        return project;
    }

    public Iterable<Project> findAllProjects(){
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project == null){
            throw new ProjectIDException("Cannot delete project with id '" + projectId
                    + "', because it does not exist.");
        }
        projectRepository.delete(project);
    }


}
