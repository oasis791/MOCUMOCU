package MOCUMOCU.project.service;

import MOCUMOCU.project.domain.Reward;
import MOCUMOCU.project.repository.RewardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class RewardService {

    private final RewardRepository rewardRepository;

    public Long addReward(Reward reward) {
        rewardRepository.save(reward);
        return reward.getId();
    }

    public void removeReward(Long id) {
        rewardRepository.remove(id);
    }

    public void updateReward(Reward reward) {
        rewardRepository.update(reward);
    }
}
