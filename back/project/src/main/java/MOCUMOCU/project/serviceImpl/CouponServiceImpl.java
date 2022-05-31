package MOCUMOCU.project.serviceImpl;

import MOCUMOCU.project.domain.Coupon;
import MOCUMOCU.project.repository.CouponRepository;
import MOCUMOCU.project.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;

    @Override
    public Long addCoupon(Coupon coupon) {
        couponRepository.save(coupon);

        return coupon.getId();
    }

    @Override
    public void useStamp(Long id, int num) {
        Coupon findCoupon = couponRepository.findOne(id);
        findCoupon.setAmount(findCoupon.getAmount() - num);
    }

    @Override
    public void earnStamp(Long id, int num) {
        Coupon findCoupon = couponRepository.findOne(id);
        findCoupon.setAmount(findCoupon.getAmount() + num);
    }

    @Override
    public void removeCoupon(Coupon coupon) {
        couponRepository.remove(coupon);
    }

    @Override
    public void changeBoard(Long id) {

    }

    @Override
    public void changeStamp(Long id) {

    }
}
