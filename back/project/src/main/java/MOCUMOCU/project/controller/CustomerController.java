package MOCUMOCU.project.controller;

import MOCUMOCU.project.customer.Customer;
import MOCUMOCU.project.customer.CustomerService;
import MOCUMOCU.project.customer.Gender;
import MOCUMOCU.project.domain.Privacy;
import MOCUMOCU.project.form.CustomerLoginDTO;
import MOCUMOCU.project.form.CustomerRegisterDTO;
import MOCUMOCU.project.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;
    private final CouponService couponService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signup(@RequestBody CustomerRegisterDTO customerRegisterDTO) {

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

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody CustomerLoginDTO customerLoginDTO, Model model) {
        if (customerService.login(customerLoginDTO)) {
            model.addAttribute(customerService.findCustomerByEmail(customerLoginDTO.getCustomerEmail()));
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{customerIdTest}/coupon")
    public ResponseEntity<Void> enterMain(@RequestParam Long customerIdTest, Model model) {
        model.addAttribute(customerService.findAllCoupon(customerIdTest));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/reward-list")
    public ResponseEntity<Void> showRewards(@RequestParam Long couponId, Model model) {
        model.addAttribute(couponService.findAllReward(couponId));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
