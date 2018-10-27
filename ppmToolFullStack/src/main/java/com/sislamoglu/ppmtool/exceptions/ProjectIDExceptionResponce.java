package com.sislamoglu.ppmtool.exceptions;

public class ProjectIDExceptionResponce {

    private String projectIdentifier;

    public ProjectIDExceptionResponce(String projectIdentifier){
        this.projectIdentifier = projectIdentifier;
    }

    public String getProjectIdentifier() {
        return projectIdentifier;
    }

    public void setProjectIdentifier(String projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    }
}
