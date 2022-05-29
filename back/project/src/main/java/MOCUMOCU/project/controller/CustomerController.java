package MOCUMOCU.project.controller;

import MOCUMOCU.project.customer.Customer;
import MOCUMOCU.project.customer.CustomerService;
import MOCUMOCU.project.customer.Gender;
import MOCUMOCU.project.domain.Privacy;
import MOCUMOCU.project.form.CustomerLoginDTO;
import MOCUMOCU.project.form.CustomerRegisterDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody CustomerRegisterDTO customerRegisterDTO) {

        Privacy newPrivacy = new Privacy();
        newPrivacy.setEmail(customerRegisterDTO.getCustomerEmail());
        newPrivacy.setName(customerRegisterDTO.getCustomerName());
        newPrivacy.setPassword(customerRegisterDTO.getCustomerPassword());
        newPrivacy.setPhoneNum(customerRegisterDTO.getCustomerPhoneNum());

        Customer newCustomer = new Customer();
        newCustomer.setPrivacy(newPrivacy);

        if (customerRegisterDTO.getCustomerGender().equals("MALE")) {
            newCustomer.setGender(Gender.MALE);
        } else {
            newCustomer.setGender(Gender.FEMALE);
        }
        newCustomer.setBirthDate(customerRegisterDTO.getCustomerBirth());

        customerService.join(newCustomer);

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody CustomerLoginDTO customerLoginDTO) {
        if (customerService.login(customerLoginDTO)) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
