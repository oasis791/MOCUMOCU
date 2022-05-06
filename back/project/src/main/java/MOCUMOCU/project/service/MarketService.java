package MOCUMOCU.project.service;

import MOCUMOCU.project.domain.Market;
import MOCUMOCU.project.domain.Reward;
import MOCUMOCU.project.repository.MarketRepository;
import MOCUMOCU.project.repository.RewardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MarketService {

    private final MarketRepository marketRepository;
    private final RewardRepository rewardRepository;

    public Long addMarket(Market market) {
        marketRepository.save(market);
        return market.getId();
    }

    public void removeMarket(Long id) {
        marketRepository.remove(id);
    }

    public void updateMarket(Market market) {
        marketRepository.update(market);
    }

    @Transactional(readOnly = true)
    public List<Reward> findAllReward(Long marketId) {
        return rewardRepository.findByMarketId(marketId);
    }
}
