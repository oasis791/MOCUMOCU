package MOCUMOCU.project.service;

import MOCUMOCU.project.domain.Reward;

public interface RewardService {

    Long addReward(Reward reward);

    void removeReward(Long id);

    void updateReward(Reward reward);
}
