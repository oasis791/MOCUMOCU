package MOCUMOCU.project.controller;

import MOCUMOCU.project.form.TokenDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenController {

    @PostMapping("/token")
    public ResponseEntity<Void> token(@RequestBody TokenDTO tokenDTO, Model model) {
        model.addAttribute(tokenDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
