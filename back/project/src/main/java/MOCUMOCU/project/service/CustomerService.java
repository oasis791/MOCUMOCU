package MOCUMOCU.project.service;

import MOCUMOCU.project.domain.Coupon;
import MOCUMOCU.project.domain.Customer;
import MOCUMOCU.project.domain.Privacy;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CustomerService {

    Long join(Customer customer);

    void withdrawal(Long id);

    void updatePrivacy(Long id, Privacy privacy);

    List<Coupon> findAllCoupon(Long id);

    void updateLastDate();
}
