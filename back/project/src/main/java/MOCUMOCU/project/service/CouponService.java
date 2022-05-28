package MOCUMOCU.project.service;

import MOCUMOCU.project.domain.Coupon;

public interface CouponService {

    Long addCoupon(Coupon coupon);

    void useStamp(Long id, int num);

    void earnStamp(Long id, int num);

    void removeCoupon(Coupon coupon);

    void changeBoard(Long id);

    void changeStamp(Long id);
}
