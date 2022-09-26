package MOCUMOCU.project.service;

import MOCUMOCU.project.domain.Market;
import MOCUMOCU.project.domain.Reward;
import MOCUMOCU.project.form.MarketAddDTO;
import MOCUMOCU.project.form.RewardOwnerDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MarketService {

    void addMarket(MarketAddDTO marketAddDTO);

    void removeMarket(Long id);

    void updateMarket(Market market);

    List<RewardOwnerDTO> findAllReward(Long id);
}
