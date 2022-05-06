package MOCUMOCU.project.service;

import MOCUMOCU.project.domain.Market;
import MOCUMOCU.project.domain.Owner;
import MOCUMOCU.project.domain.Privacy;
import MOCUMOCU.project.repository.MarketRepository;
import MOCUMOCU.project.repository.OwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class OwnerService {

    private final OwnerRepository ownerRepository;
    private final MarketRepository marketRepository;

    public Long join(Owner owner) {
        ownerRepository.save(owner);
        return owner.getId();
    }

    public void withdrawal(Long id) {
        ownerRepository.remove(id);
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
