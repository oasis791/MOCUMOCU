package MOCUMOCU.project.service;

import MOCUMOCU.project.domain.Market;
import MOCUMOCU.project.domain.Reward;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MarketService {

    Long addMarket(Market market);

    void removeMarket(Long id);

    void updateMarket(Market market);

    List<Reward> findAllReward(Long id);
}
