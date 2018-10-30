package com.sislamoglu.ppmtool.web;

import com.sislamoglu.ppmtool.domain.Project;
import com.sislamoglu.ppmtool.services.MapValidationErrorService;
import com.sislamoglu.ppmtool.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

    @Autowired
    ProjectService projectService;
    @Autowired
    MapValidationErrorService mapValidationErrorService;

    @RequestMapping(method = RequestMethod.POST, value = "/")
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult bindingResult){
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(bindingResult);
        if(errorMap!=null){return errorMap;}
        Project newProject = projectService.saveOrUpdateProject(project);
        return new ResponseEntity<Project>(project, HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable("projectId")String projectId){
        Project project = projectService.findProjectByIdentifier(projectId);
        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/")
    public ResponseEntity<Iterable<?>> getProjectById(){
        return new ResponseEntity<Iterable<?>>(projectService.findAllProjects(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{projectId}")
    public ResponseEntity<?> deleteProjectById(@PathVariable("projectId")String projectId){
        projectService.deleteProjectByIdentifier(projectId);
        return new ResponseEntity<String>("Project with Id '" + projectId + "' is deleted", HttpStatus.OK);
    }
}
