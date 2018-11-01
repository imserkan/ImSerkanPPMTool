package com.sislamoglu.ppmtool.web;

import com.sislamoglu.ppmtool.domain.Project;
import com.sislamoglu.ppmtool.domain.ProjectTask;
import com.sislamoglu.ppmtool.exceptions.ProjectNotFoundException;
import com.sislamoglu.ppmtool.repositories.ProjectRepository;
import com.sislamoglu.ppmtool.services.MapValidationErrorService;
import com.sislamoglu.ppmtool.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.ws.Response;
import java.util.List;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private ProjectRepository projectRepository;

    @RequestMapping(method = RequestMethod.POST, value = "/{backlogId}")
    public ResponseEntity<?> createNewProjectTask(@Valid @RequestBody ProjectTask projectTask,
                                                  BindingResult bindingResult, @PathVariable("backlogId") String backlogId){

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(bindingResult);
        if(errorMap != null){
            return errorMap;
        }
        ProjectTask projectTask1 = projectTaskService.addProjectTask(backlogId, projectTask);
        return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{backlogId}")
    public ResponseEntity<Iterable<ProjectTask>> getProjectTasks(@PathVariable("backlogId") String backlogId){
        return new ResponseEntity<>(projectTaskService.findBacklogById(backlogId), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{backlogId}/{ptSeq}")
    public ResponseEntity<?> getProjectTask(@PathVariable("backlogId") String backlogId,
                                            @PathVariable("ptSeq") String projectTaskSequence){
        ProjectTask projectTask = projectTaskService.findPTByProjectSequence(backlogId, projectTaskSequence);
        return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
    }
}
