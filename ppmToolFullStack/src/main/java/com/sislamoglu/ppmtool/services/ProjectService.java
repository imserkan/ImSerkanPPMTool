package com.sislamoglu.ppmtool.services;

import com.sislamoglu.ppmtool.domain.Project;
import com.sislamoglu.ppmtool.exceptions.ProjectIDException;
import com.sislamoglu.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project){
        try{
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        }catch (Exception ex){
            throw new ProjectIDException("Project ID '" +
                    project.getProjectIdentifier() + "' already exists.");
        }

    }
}
