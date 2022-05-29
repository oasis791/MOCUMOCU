package MOCUMOCU.project.owner;

import MOCUMOCU.project.domain.Market;
import MOCUMOCU.project.form.OwnerLoginDTO;
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

    @Override
    public Long join(Owner owner) {
        ownerRepository.save(owner);
        return owner.getId();
    }

    @Override
    public void withdrawal(Long id) {
        Owner findOwner = ownerRepository.findOne(id);
        ownerRepository.remove(findOwner);
    }

    @Override
    public void updatePrivacy(Long id, Privacy privacy) {
        Owner findOwner = ownerRepository.findOne(id);
        findOwner.setPrivacy(privacy);
        ownerRepository.update(findOwner);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Market> findAllMarket(Long id) {
        return marketRepository.findByOwnerId(id);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean login(OwnerLoginDTO ownerLoginDTO) {
        Owner findOwner = ownerRepository.findByEmail(ownerLoginDTO.getOwnerEmail());
        if (findOwner != null) {
            return findOwner.getPrivacy().getPassword().equals(ownerLoginDTO.getOwnerPassword());
        } else {
            return false;
        }
    }
}
