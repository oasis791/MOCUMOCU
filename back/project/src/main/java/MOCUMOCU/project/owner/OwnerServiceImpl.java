package MOCUMOCU.project.owner;

import MOCUMOCU.project.domain.Market;
import MOCUMOCU.project.owner.Owner;
import MOCUMOCU.project.domain.Privacy;
import MOCUMOCU.project.repository.MarketRepository;
import MOCUMOCU.project.repository.OwnerRepository;
import MOCUMOCU.project.owner.OwnerService;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
@Component
public class OwnerServiceImpl implements OwnerService {

    private final OwnerRepository ownerRepository;
    private final MarketRepository marketRepository;

    public OwnerServiceImpl(OwnerRepository ownerRepository, MarketRepository marketRepository) {
        this.ownerRepository = ownerRepository;
        this.marketRepository = marketRepository;
    }

    public Long join(Owner owner) {
        ownerRepository.save(owner);
        return owner.getId();
    }

    public void withdrawal(Long id) {
        Owner findOwner = ownerRepository.findOne(id);
        ownerRepository.remove(findOwner);
    }

    public void updatePrivacy(Long id, Privacy privacy) {
        Owner findOwner = ownerRepository.findOne(id);
        findOwner.setPrivacy(privacy);
        ownerRepository.update(findOwner);
    }

    @Transactional(readOnly = true)
    public List<Market> findAllMarket(Long id) {
        return marketRepository.findByOwnerId(id);
    }

}
