package com.sislamoglu.ppmtool.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository {



    @Override
    default Iterable findAllById(Iterable iterable) {
        return null;
    }
}
