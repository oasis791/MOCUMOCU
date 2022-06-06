package MOCUMOCU.project.serviceImpl;

import MOCUMOCU.project.domain.Coupon;
import MOCUMOCU.project.domain.Reward;
import MOCUMOCU.project.form.RewardInfoDTO;
import MOCUMOCU.project.form.SaveStampDTO;
import MOCUMOCU.project.form.UseStampDTO;
import MOCUMOCU.project.repository.CouponRepository;
import MOCUMOCU.project.repository.RewardRepository;
import MOCUMOCU.project.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {

    private final CouponRepository couponRepository;
    private final RewardRepository rewardRepository;

    @Override
    public Long addCoupon(Coupon coupon) {
        couponRepository.save(coupon);

        return coupon.getId();
    }

    @Override
    public void useStamp(UseStampDTO useStampDTO) {
        Coupon findCoupon = couponRepository.findOne(useStampDTO.getCouponId());
        findCoupon.setAmount(findCoupon.getAmount() - useStampDTO.getCouponRequire());
    }

    @Override
    public void earnStamp(SaveStampDTO saveStampDTO) {
        Coupon findCoupon = couponRepository.findByCustomerIdAndMarketId(saveStampDTO.getCustomerId(), saveStampDTO.getMarketId());
        findCoupon.setAmount(findCoupon.getAmount() + saveStampDTO.getAmount());
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

    @Override
    public List<RewardInfoDTO> findAllReward(Long id) {
        Coupon findCoupon = couponRepository.findOne(id);
        List<Reward> rewards = rewardRepository.findByMarketId(findCoupon.getMarket().getId());
        List<RewardInfoDTO> rewardInfoDTOList = new ArrayList<>();

        for (Reward reward : rewards) {
            RewardInfoDTO rewardInfoDTO = new RewardInfoDTO();

            rewardInfoDTO.setRewardContent(reward.getRewardContent());
            rewardInfoDTO.setNeedAmount(reward.getNeedAmount());

            rewardInfoDTOList.add(rewardInfoDTO);
        }

        return rewardInfoDTOList;
    }
}
