package MOCUMOCU.project.serviceImpl;

import MOCUMOCU.project.domain.Reward;
import MOCUMOCU.project.repository.RewardRepository;
import MOCUMOCU.project.service.RewardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RewardServiceImpl implements RewardService {

    private final RewardRepository rewardRepository;

    @Override
    public Long addReward(Reward reward) {
        rewardRepository.save(reward);
        return reward.getId();
    }

    @Override
    public void removeReward(Long id) {
        Reward findReward = rewardRepository.findOne(id);
        rewardRepository.remove(findReward);
    }

    @Override
    public void updateReward(Reward reward) {
        Reward updateReward = rewardRepository.findOne(reward.getId());
        updateReward.setRewardContent(reward.getRewardContent());
        updateReward.setNeedAmount(reward.getNeedAmount());
    }
}
