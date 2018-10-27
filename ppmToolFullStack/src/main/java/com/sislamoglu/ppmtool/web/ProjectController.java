package com.sislamoglu.ppmtool.web;

import com.sislamoglu.ppmtool.domain.Project;
import com.sislamoglu.ppmtool.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;

@Controller
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @RequestMapping(method = RequestMethod.POST, value = "/")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return new ResponseEntity<String>("Invalid Project Object", HttpStatus.BAD_REQUEST);
        }
        Project newProject = projectService.saveOrUpdateProject(project);
        return new ResponseEntity<Project>(project, HttpStatus.CREATED);
    }


}
