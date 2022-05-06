package MOCUMOCU.project.service;

import MOCUMOCU.project.domain.Coupon;
import MOCUMOCU.project.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;

    private void useStamp(Long id, int num) {
        Coupon findCoupon = couponRepository.findOne(id);
        findCoupon.setAmount(findCoupon.getAmount() - num);
        couponRepository.updateCoupon(findCoupon);
    }

    private void earnStamp(Long id, int num) {
        Coupon findCoupon = couponRepository.findOne(id);
        findCoupon.setAmount(findCoupon.getAmount() + num);
        couponRepository.updateCoupon(findCoupon);
    }

    private void remove(Long id){
        couponRepository.remove(id);
    }

    private void changeBoard(Long id) {

    }

    private void changeStamp(Long id) {

    }

}
