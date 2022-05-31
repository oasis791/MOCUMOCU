package MOCUMOCU.project.customer;

import MOCUMOCU.project.domain.Coupon;
import MOCUMOCU.project.domain.Privacy;
import MOCUMOCU.project.form.CustomerLoginDTO;
import MOCUMOCU.project.form.OwnerLoginDTO;
import MOCUMOCU.project.owner.Owner;
import MOCUMOCU.project.repository.CouponRepository;
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
    }

    @Override
    public List<Coupon> findAllCoupon(Long id) {
        List<Coupon> myCoupons = couponRepository.findByCustomerId(id);
        return  myCoupons;
    }

    @Override
    public void updateLastDate() {

    }

    @Override
    @Transactional(readOnly = true)
    public boolean login(CustomerLoginDTO customerLoginDTO) {

        List<Customer> findCustomer = customerRepository.findByEmail(customerLoginDTO.getCustomerEmail());

        if (findCustomer.isEmpty()) {
            return false;
        } else {
            return findCustomer.get(0).getPrivacy().getPassword().equals(customerLoginDTO.getCustomerPassword());
        }
    }

}
