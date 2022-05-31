package MOCUMOCU.project.serviceImpl;

import MOCUMOCU.project.domain.Market;
import MOCUMOCU.project.domain.Reward;
import MOCUMOCU.project.repository.MarketRepository;
import MOCUMOCU.project.repository.RewardRepository;
import MOCUMOCU.project.service.MarketService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MarketServiceImpl implements MarketService {

    private final MarketRepository marketRepository;
    private final RewardRepository rewardRepository;

    @Override
    public Long addMarket(Market market) {
        marketRepository.save(market);
        return market.getId();
    }

    @Override
    public void removeMarket(Long id) {
        Market findMarket = marketRepository.findOne(id);
        marketRepository.remove(findMarket);
    }

    /**
     *
     * 수정 데이터만 수정 할거 정해야함
     */
    @Override
    public void updateMarket(Market market) {
        marketRepository.findOne(market.getId());

    }

    @Override
    @Transactional(readOnly = true)
    public List<Reward> findAllReward(Long id) {
        return rewardRepository.findByMarketId(id);
    }

}
