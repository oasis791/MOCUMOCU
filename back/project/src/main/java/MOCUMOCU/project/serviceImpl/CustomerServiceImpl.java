package MOCUMOCU.project.serviceImpl;

import MOCUMOCU.project.domain.Coupon;
import MOCUMOCU.project.domain.Customer;
import MOCUMOCU.project.domain.Privacy;
import MOCUMOCU.project.repository.CouponRepository;
import MOCUMOCU.project.repository.CustomerRepository;
import MOCUMOCU.project.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CouponRepository couponRepository;

    @Override
    public Long join(Customer customer) {
        customerRepository.save(customer);
        return customer.getId();
    }

    @Override
    public void withdrawal(Long id) {
        Customer findCustomer = customerRepository.findOne(id);
        customerRepository.remove(findCustomer);
    }

    @Override
    public void updatePrivacy(Long id, Privacy privacy) {
        Customer findCustomer = customerRepository.findOne(id);
        findCustomer.setPrivacy(privacy);
        customerRepository.update(findCustomer);
    }

    @Override
    public List<Coupon> findAllCoupon(Long id) {
        List<Coupon> myCoupons = couponRepository.findByCustomerId(id);
        return  myCoupons;
    }

    @Override
    public void updateLastDate() {

    }
}
