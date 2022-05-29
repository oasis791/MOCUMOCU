package MOCUMOCU.project.controller;

import MOCUMOCU.project.domain.Privacy;
import MOCUMOCU.project.form.OwnerLoginDTO;
import MOCUMOCU.project.form.OwnerRegisterDTO;
import MOCUMOCU.project.owner.Owner;
import MOCUMOCU.project.owner.OwnerService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/owner")
public class OwnerController {

    private final OwnerService ownerService;

    public OwnerController(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

    @PostMapping("/signup")
    public HttpStatus signup(@RequestBody OwnerRegisterDTO ownerRegisterDTO) {

        Privacy newPrivacy = new Privacy();
        newPrivacy.setEmail(ownerRegisterDTO.getOwnerEmail());
        newPrivacy.setName(ownerRegisterDTO.getOwnerName());
        newPrivacy.setPassword(ownerRegisterDTO.getOwnerPassword());
        newPrivacy.setPhoneNum(ownerRegisterDTO.getOwnerPhoneNum());

        Owner newOwner = new Owner();
        newOwner.setPrivacy(newPrivacy);

        ownerService.join(newOwner);

        return HttpStatus.OK;
    }

    @PostMapping("/login")
    public HttpStatus login(@RequestBody OwnerLoginDTO ownerLoginDTO) {
        if (ownerService.login(ownerLoginDTO)) {
            return HttpStatus.OK;
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }
}
