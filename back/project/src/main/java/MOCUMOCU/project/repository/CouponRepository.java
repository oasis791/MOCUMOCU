package MOCUMOCU.project.repository;

import MOCUMOCU.project.domain.Coupon;
import MOCUMOCU.project.domain.Customer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CouponRepository {

    private final EntityManager em;

    public void save(Coupon coupon) {
        em.persist(coupon);
    }

    public Coupon findOne(Long id) {
        Coupon findCoupon = em.find(Coupon.class, id);

        return findCoupon;
    }

    public void updateCoupon(Coupon coupon) {
        em.persist(coupon);
    }

    public List<Coupon> findByCustomerId(Long customerId) {
        return em.createQuery("select c from Coupon c where c.customer.id = : customerId", Coupon.class)
                .setParameter("customerId", customerId)
                .getResultList();
    }


    public void remove(Coupon coupon) {
        em.remove(coupon);
    }
}
