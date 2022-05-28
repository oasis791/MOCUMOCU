package MOCUMOCU.project.controller;

import MOCUMOCU.project.domain.Privacy;
import MOCUMOCU.project.form.OwnerDTO;
import MOCUMOCU.project.owner.Owner;
import MOCUMOCU.project.owner.OwnerService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/owner")
public class OwnerController {

    private OwnerService ownerService;

    @PostMapping("/signup")
    public HttpStatus signup(OwnerDTO ownerDTO) {
        Privacy newPrivacy = new Privacy();
        newPrivacy.setEmail(ownerDTO.getOwnerEmail());
        newPrivacy.setName(ownerDTO.getOwnerName());
        newPrivacy.setPassword(ownerDTO.getOwnerPassword());
        newPrivacy.setPhoneNum(ownerDTO.getOwnerPhoneNum());

        Owner newOwner = new Owner();
        newOwner.setPrivacy(newPrivacy);

        ownerService.join(newOwner);

        return HttpStatus.OK;
    }
}
