package MOCUMOCU.project.coupon.service;

import MOCUMOCU.project.coupon.dto.SaveStampWithDayDTO;
import MOCUMOCU.project.coupon.entity.Coupon;
import MOCUMOCU.project.coupon.repository.CouponRepository;
import MOCUMOCU.project.couponlog.entity.CouponLog;
import MOCUMOCU.project.couponlog.repository.CouponLogRepository;
import MOCUMOCU.project.customer.repository.CustomerRepository;
import MOCUMOCU.project.coupon.dto.CouponInfoDTO;
import MOCUMOCU.project.customizeCustomer.entity.CustomizeCustomer;
import MOCUMOCU.project.customizeCustomer.repository.CustomizeCustomerRepository;
import MOCUMOCU.project.reward.form.RewardInfoDTO;
import MOCUMOCU.project.coupon.dto.SaveStampDTO;
import MOCUMOCU.project.coupon.dto.UseStampDTO;
import MOCUMOCU.project.market.repository.MarketRepository;
import MOCUMOCU.project.reward.entity.Reward;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

	private final CouponRepository couponRepository;
	private final MarketRepository marketRepository;
	private final CustomerRepository customerRepository;
	private final CouponLogRepository couponLogRepository;
	private final CustomizeCustomerRepository customizeCustomerRepository;

	@Override
	public boolean useStamp(UseStampDTO useStampDTO) {
		Optional<Coupon> optionalCoupon = couponRepository.findById(useStampDTO.getCouponId());
		CouponLog newCouponLog = new CouponLog();

		Coupon findCoupon =
			optionalCoupon.orElseThrow(() ->
				new RuntimeException("Coupon Doesn't exist"));

		if (findCoupon.getAmountStamp() - useStampDTO.getCouponRequire() >= 0) {
			findCoupon.setAmountStamp(findCoupon.getAmountStamp() - useStampDTO.getCouponRequire());
			newCouponLog.setLog(findCoupon, -useStampDTO.getCouponRequire());
			couponLogRepository.save(newCouponLog);
			return true;
		}
		return false;
	}

	@Override
	public void earnStamp(SaveStampDTO saveStampDTO) {
		Optional<Coupon> optionalCoupon = couponRepository.findByCustomerIdAndMarketId(
			saveStampDTO.getCustomerId(), saveStampDTO.getMarketId());
		CouponLog newCouponLog = new CouponLog();

		if (optionalCoupon.isEmpty()) {
			Coupon newCoupon = new Coupon();

			newCoupon.setCoupon(customerRepository.findOne(saveStampDTO.getCustomerId()),
				marketRepository.findOne(saveStampDTO.getMarketId()), saveStampDTO.getAmount());

			couponLogRepository.save(newCouponLog);
			newCouponLog.setLog(newCoupon, saveStampDTO.getAmount());
			newCoupon.setCouponLog(newCouponLog);
			couponRepository.save(newCoupon);
		} else {
			Coupon findCoupon = optionalCoupon.get();
			findCoupon.setAmountStamp(findCoupon.getAmountStamp() + saveStampDTO.getAmount());
			newCouponLog.setLog(findCoupon, saveStampDTO.getAmount());
			findCoupon.setCouponLog(newCouponLog);
			couponLogRepository.save(newCouponLog);
		}
	}

	@Override
	@Transactional(readOnly = true)
	public List<CouponInfoDTO> findAllCoupon(Long customerId) {
		Optional<List<Coupon>> optionalCoupon = couponRepository.findByCustomerId(customerId);

		List<Coupon> myCoupons = optionalCoupon.orElseThrow(() ->
			new RuntimeException("Coupon Doesn't exist"));

		List<CouponInfoDTO> couponInfoDTOList = new ArrayList<>();

		for (Coupon myCoupon : myCoupons) {
			CouponInfoDTO couponInfoDTO = new CouponInfoDTO();

			couponInfoDTO.setCouponId(myCoupon.getId());
			couponInfoDTO.setMarketName(myCoupon.getMarket().getMarketName());
			couponInfoDTO.setStampAmount(myCoupon.getAmountStamp());
			couponInfoDTO.setBoardUrl(myCoupon.getBoardUrl());
			couponInfoDTO.setStampUrl(myCoupon.getStampUrl());

			couponInfoDTOList.add(couponInfoDTO);
		}

		return couponInfoDTOList;
	}

	@Override
	@Transactional(readOnly = true)
	public List<RewardInfoDTO> findAllReward(Long id) {
		Optional<Coupon> optionalCoupon = couponRepository.findById(id);
		Coupon coupon = optionalCoupon.orElseThrow(() ->
			new RuntimeException("Coupon Doesn't Exist"));

		List<Reward> rewards = coupon.getRewards();
		List<RewardInfoDTO> rewardInfoDTOList = new ArrayList<>();

		for (Reward reward : rewards) {
			rewardInfoDTOList.add(new RewardInfoDTO(reward.getNeedAmount(), reward.getRewardContent()));
		}

		return rewardInfoDTOList;
	}

	@Override
	public void setCustomizeImage(Long couponId, Long customizeCustomerId, String type) {

		Optional<Coupon> optionalCoupon = couponRepository.findById(couponId);

		Coupon findCoupon = optionalCoupon.orElseThrow(() ->
			new RuntimeException("Coupon Doesn't Exist"));

		if (customizeCustomerId == -1) {
			if (type.equals("stamp")) {
				findCoupon.setStampUrl(null);
			} else if (type.equals("board")) {
				findCoupon.setBoardUrl(null);
			}
		} else {

			CustomizeCustomer findCustomizeCustomer = customizeCustomerRepository.findOne(customizeCustomerId);

			if (type.equals("stamp")) {
				findCoupon.setStampUrl(findCustomizeCustomer.getCustomize().getSmallImageUrl());
			} else if (type.equals("board")) {
				findCoupon.setBoardUrl(findCustomizeCustomer.getCustomize().getBigImageUrl());
			}
		}
	}

	@Override
	public void earnStampSetDayTogether(SaveStampWithDayDTO saveStampWithDayDTO) {

		Optional<Coupon> optionalCoupon = couponRepository
			.findByCustomerIdAndMarketId(saveStampWithDayDTO.getCustomerId(), saveStampWithDayDTO.getMarketId());
		CouponLog newCouponLog = new CouponLog();

		if (optionalCoupon.isEmpty()) {
			Coupon newCoupon = new Coupon();

			newCoupon.setCoupon(customerRepository.findOne(saveStampWithDayDTO.getCustomerId()),
				marketRepository.findOne(saveStampWithDayDTO.getMarketId()), saveStampWithDayDTO.getAmount());

			couponRepository.save(newCoupon);

			newCouponLog.setLogWithTime(newCoupon, saveStampWithDayDTO.getAmount(), saveStampWithDayDTO.getYear(),
				saveStampWithDayDTO.getMonth(), saveStampWithDayDTO.getDay(), saveStampWithDayDTO.getHour(),
				saveStampWithDayDTO.getMinute());
		} else {
			Coupon findCoupon = optionalCoupon.get();
			findCoupon.setAmountStamp(findCoupon.getAmountStamp() + saveStampWithDayDTO.getAmount());
			newCouponLog.setLogWithTime(findCoupon, saveStampWithDayDTO.getAmount(), saveStampWithDayDTO.getYear(),
				saveStampWithDayDTO.getMonth(), saveStampWithDayDTO.getDay(), saveStampWithDayDTO.getHour(),
				saveStampWithDayDTO.getMinute());
		}

		couponLogRepository.save(newCouponLog);
	}
}