package MOCUMOCU.project.coupon.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import MOCUMOCU.project.coupon.entity.Coupon;

public interface CouponRepository extends JpaRepository<Coupon, Long> {

	@Query(value = "SELECT c FROM Coupon c WHERE c.customer.id = :customerId AND c.market.id = :marketId")
	Optional<Coupon> findByCustomerIdAndMarketId(@Param("customerId") Long customerId, @Param("marketId") Long marketId);

	@Query(value = "SELECT c FROM Coupon c JOIN FETCH c.market WHERE c.customer.id = :customerId")
	Optional<List<Coupon>> findByCustomerId(@Param("customerId") Long customerId);
}
