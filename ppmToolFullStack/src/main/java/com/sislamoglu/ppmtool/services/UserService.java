package com.sislamoglu.ppmtool.services;

import com.sislamoglu.ppmtool.domain.User;
import com.sislamoglu.ppmtool.exceptions.UserNotFoundException;
import com.sislamoglu.ppmtool.exceptions.UsernameAlreadyExistsException;
import com.sislamoglu.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User user){
        try{
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setUsername(user.getUsername());
            user.setConfirmPassword("");
            return userRepository.save(user);

        }catch (Exception ex){
            throw new UsernameAlreadyExistsException("Username '"+ user.getUsername()+"' already exists.");
        }
    }
    public User getUser(String username, String realUser){
        System.out.println(username + "'s profile is searched from " + realUser);
        User user = userRepository.findByUsername(username);
        if(user == null){
            System.out.println("Here");
            throw new UserNotFoundException("Profile '" + username + "' is not found.");
        }
        return user;
    }

}
