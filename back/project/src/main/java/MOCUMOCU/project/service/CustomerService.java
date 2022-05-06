package MOCUMOCU.project.service;

import MOCUMOCU.project.domain.Coupon;
import MOCUMOCU.project.domain.Customer;
import MOCUMOCU.project.domain.Privacy;
import MOCUMOCU.project.repository.CouponRepository;
import MOCUMOCU.project.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CouponRepository couponRepository;


    public Long join(Customer customer) {
        customerRepository.save(customer);
        return customer.getId();
    }

    public void withdrawal(Long id) {
        customerRepository.remove(id);
    }

    public void updatePrivacy(Long id, Privacy privacy) {

        Customer findCustomer = customerRepository.findOne(id);
        findCustomer.setPrivacy(privacy);
        customerRepository.update(findCustomer);
    }

    @Transactional(readOnly = true)
    public List<Coupon> findAllCoupon(Long id) {
        List<Coupon> myCoupons = couponRepository.findByCustomerId(id);
        return  myCoupons;
    }

    public void updateLastDate() {

    }
}
