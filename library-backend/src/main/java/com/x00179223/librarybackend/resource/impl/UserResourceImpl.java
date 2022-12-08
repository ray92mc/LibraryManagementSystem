package com.x00179223.librarybackend.resource.impl;

import com.x00179223.librarybackend.config.JwtTokenProvider;
import com.x00179223.librarybackend.model.User;
import com.x00179223.librarybackend.repository.UserRepository;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserResourceImpl {

    private static Logger log = LoggerFactory.getLogger(UserResourceImpl.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/authenticate", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<String> authenticate(@RequestBody User user){
        log.info("UserResourceImpl : authenticate");
        JSONObject jsonObject = new JSONObject();

        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            if(authentication.isAuthenticated()){
                String email = user.getEmail();
                jsonObject.put("name", authentication.getName());
                jsonObject.put("authorities", authentication.getAuthorities());
                jsonObject.put("token", tokenProvider.createToken(email, userRepository.findByEmail(email).getRole()));
                return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
            }
        } catch (JSONException e) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException ex) {
                ex.printStackTrace();
            }
            return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
        return null;
    }

}
