package MOCUMOCU.project.service;

import MOCUMOCU.project.domain.Reward;
import MOCUMOCU.project.form.RewardAddDTO;

public interface RewardService {

    void addReward(RewardAddDTO rewardAddDTO);

    void removeReward(Long id);

    void updateReward(Reward reward);
}
