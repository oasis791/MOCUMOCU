package MOCUMOCU.project.coupon.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import MOCUMOCU.project.coupon.dto.CouponInfoDTO;
import MOCUMOCU.project.coupon.dto.SaveStampDTO;
import MOCUMOCU.project.coupon.dto.UseStampDTO;
import MOCUMOCU.project.coupon.entity.Coupon;
import MOCUMOCU.project.couponlog.repository.CouponLogRepository;
import MOCUMOCU.project.coupon.repository.CouponRepository;
import MOCUMOCU.project.customer.entity.Customer;
import MOCUMOCU.project.customer.repository.CustomerRepository;
import MOCUMOCU.project.customizeCustomer.repository.CustomizeCustomerRepository;
import MOCUMOCU.project.market.entity.Market;
import MOCUMOCU.project.market.repository.MarketRepository;
import MOCUMOCU.project.reward.entity.Reward;
import MOCUMOCU.project.reward.form.RewardInfoDTO;

@ExtendWith(MockitoExtension.class)
public class CouponServiceTest {

	@Mock
	private CouponRepository couponRepository;

	@Mock
	private MarketRepository marketRepository;

	@Mock
	private CustomerRepository customerRepository;

	@Mock
	private CouponLogRepository couponLogRepository;

	@Mock
	private CustomizeCustomerRepository customizeCustomerRepository;

	@InjectMocks
	private CouponServiceImpl couponService;

	@Test
	@DisplayName("존재하는 쿠폰 사용하기")
	void testUseStamp() {
		// given 
		UseStampDTO useStampDTO = new UseStampDTO();
		useStampDTO.setCouponId(1L);
		useStampDTO.setCouponRequire(3);

		Coupon coupon = new Coupon();
		coupon.setAmountStamp(5);

		when(couponRepository.findById(1L)).thenReturn(Optional.of(coupon));

		// when
		boolean result = couponService.useStamp(useStampDTO);

		// then
		assertEquals(true, result);
		assertEquals(2, coupon.getAmountStamp());
	}

	@Test
	@DisplayName("존재하지 않는 쿠폰 사용하기")
	void testNotExistCouponUseStamp() {

		UseStampDTO useStampDTO = new UseStampDTO();
		useStampDTO.setCouponId(1L);
		useStampDTO.setCouponRequire(3);

		assertThrows(RuntimeException.class,
			() -> couponService.useStamp(useStampDTO));
	}


	@Test
	@DisplayName("존재하는 쿠폰에서, 스탬프 적립하기")
	void testNotExistCouponEarnStamp() {
		// given
		SaveStampDTO saveStampDTO = new SaveStampDTO();
		saveStampDTO.setCustomerId(1L);
		saveStampDTO.setMarketId(2L);
		saveStampDTO.setAmount(3);

		Coupon coupon = new Coupon();
		coupon.setAmountStamp(3);

		when(couponRepository.findByCustomerIdAndMarketId(1L, 2L)).thenReturn(Optional.of(coupon));

		// when
		couponService.earnStamp(saveStampDTO);

		// then
		assertEquals(coupon.getAmountStamp(), 6);
	}

	@Test
	@DisplayName("회원이 가지고 있는 모든 쿠폰 찾기")
	void testFindAllCoupon() {
		// given
		Long customerId = 1L;

		Customer customer = new Customer();
		customer.setId(customerId);
		Market market = new Market();
		market.setMarketName("Test Market");

		List<Coupon> coupons = new ArrayList<>();
		Coupon coupon = new Coupon();
		coupon.setId(1L);
		coupon.setAmountStamp(5);
		coupon.setCustomer(customer);
		coupon.setBoardUrl("xxx");
		coupon.setStampUrl("xxx");
		coupon.setMarket(market);
		coupons.add(coupon);

		when(couponRepository.findByCustomerId(customerId)).thenReturn(Optional.of(coupons));

		// when
		List<CouponInfoDTO> couponInfoDTOList = couponService.findAllCoupon(customerId);

		// then
		assertEquals(1, couponInfoDTOList.size());
		assertEquals(1L, couponInfoDTOList.get(0).getCouponId());
		assertEquals(5, couponInfoDTOList.get(0).getStampAmount());
	}

	@Test
	@DisplayName("존재하는 쿠폰의 모든 리워드 찾기")
	void testFindAllReward() {
		// given
		Long couponId = 1L;

		Coupon coupon = new Coupon();

		Reward reward1 = new Reward();
		reward1.setNeedAmount(10);
		reward1.setRewardContent("Americano");
		Reward reward2 = new Reward();
		reward2.setNeedAmount(20);
		reward2.setRewardContent("Latte");

		coupon.getRewards().add(reward1);
		coupon.getRewards().add(reward2);

		when(couponRepository.findById(couponId)).thenReturn(Optional.of(coupon));

		// when
		List<RewardInfoDTO> rewardInfoDTOList = couponService.findAllReward(couponId);

		// then
		assertEquals(2, rewardInfoDTOList.size());
		assertEquals(10, rewardInfoDTOList.get(0).getNeedAmount());
		assertEquals("Americano", rewardInfoDTOList.get(0).getRewardContent());
		assertEquals(20, rewardInfoDTOList.get(1).getNeedAmount());
		assertEquals("Latte", rewardInfoDTOList.get(1).getRewardContent());
	}
}
